// ===== カラーカスタマイズエンジン =====

// SVGテキストキャッシュ（元の色のまま保存）
var svgCache = {};

// カテゴリ → colorState のキー
var CATEGORY_COLOR_SLOT = {
  flonthair: 'hair',
  backhair:  'hair',
  eyebrows:  'eyebrows',
  eye:       'eye',
  upperbody: 'upperClothing',
  lowerbody: 'lowerClothing',
  mouth:     'mouth',
};

// カラースロット → 再描画が必要なカテゴリ一覧
var SLOT_TO_CATEGORIES = {
  skin:          ['face', 'ear', 'nose', 'upperbody', 'lowerbody'],
  hair:          ['flonthair', 'backhair'],
  eyebrows:      ['eyebrows'],
  eye:           ['eye'],
  upperClothing: ['upperbody'],
  lowerClothing: ['lowerbody'],
  mouth:         ['mouth'],
};

// ===== ユーティリティ =====

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rgbToHex(r, g, b) {
  function clamp(v) { return Math.min(255, Math.max(0, Math.round(v))); }
  return '#' + [r, g, b].map(function(v) {
    return clamp(v).toString(16).padStart(2, '0').toUpperCase();
  }).join('');
}

// 肌のシャドウ色を自動計算
// 元のメイン:#FAD6B6(250,214,182) → シャドウ:#F1B588(241,181,136)
function calcSkinShadow(hex) {
  var c = hexToRgb(hex);
  return rgbToHex(
    c.r * (241 / 250),
    c.g * (181 / 214),
    c.b * (136 / 182)
  );
}

// SVGテキスト内のhex色を全置換（大文字小文字不問）
function replaceColor(text, fromHex, toHex) {
  if (!fromHex || !toHex) return text;
  if (fromHex.toUpperCase() === toHex.toUpperCase()) return text;
  var escaped = fromHex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  var re = new RegExp(escaped, 'gi');
  return text.replace(re, toHex);
}

// ===== SVGフェッチ & キャッシュ =====

function fetchSVGCached(filePath) {
  if (svgCache[filePath]) {
    return Promise.resolve(svgCache[filePath]);
  }
  return fetch(filePath)
    .then(function(r) {
      if (!r.ok) throw new Error('Fetch failed: ' + filePath);
      return r.text();
    })
    .then(function(text) {
      svgCache[filePath] = text;
      return text;
    });
}

// ===== 色適用 =====

// カテゴリに応じた色置換をSVGテキストに適用
function applyColors(svgText, category) {
  var text = svgText;

  // 肌色（全カテゴリ共通）
  var skinShadow = calcSkinShadow(colorState.skin);
  text = replaceColor(text, '#FAD6B6', colorState.skin);
  text = replaceColor(text, '#F1B588', skinShadow);

  // カテゴリ固有の色
  var colorSlot = CATEGORY_COLOR_SLOT[category];
  if (colorSlot) {
    var fromColor = categoryTargetColors[category];
    var toColor   = colorState[colorSlot];
    if (fromColor && toColor) {
      text = replaceColor(text, fromColor, toColor);
    }
  }

  return text;
}

// ===== レイヤー描画 =====

// 1レイヤーをフェッチ → 色適用 → img.src 更新
function renderLayerWithColor(category) {
  var filePath = state[category];
  var el = document.getElementById('layer-' + category);

  // none.svg は色処理不要
  if (!filePath || filePath === 'img/svg/none.svg') {
    if (el) el.src = filePath || '';
    return Promise.resolve();
  }

  return fetchSVGCached(filePath)
    .then(function(svgText) {
      var colored = applyColors(svgText, category);
      var dataURI = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(colored);
      if (el) el.src = dataURI;
    })
    .catch(function() {
      // フォールバック: file:// 環境など（色変更なし）
      if (el) el.src = filePath;
    });
}

// 全レイヤーを再描画
function renderAllWithColor() {
  LAYER_ORDER.forEach(function(cat) {
    renderLayerWithColor(cat);
  });
}
