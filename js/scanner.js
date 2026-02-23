// SVGファイル自動スキャン
// img/svg/ に [カテゴリ名][01-99].svg 形式のファイルを置くだけで自動認識される

// ===== ユーティリティ =====

// HEAD fetchでファイルの存在を確認（存在する=true, 404=false）
async function probeFile(url) {
  try {
    var r = await fetch(url, { method: 'HEAD' });
    return r.ok;
  } catch (e) {
    return false;
  }
}

// 数値を2桁ゼロ埋め（1 → "01"）
function pad2(n) {
  return n < 10 ? '0' + n : '' + n;
}

// ===== SVGからメインカラーを抽出 =====

// SVGテキストから可視レイヤーの主要色を自動抽出
// display:none の要素を除去してから最頻出の非スキン・非暗色を返す
function extractPrimaryColor(svgText) {
  try {
    var parser = new DOMParser();
    var doc = parser.parseFromString(svgText, 'image/svg+xml');

    // display:none の要素をすべて除去
    var allElements = Array.from(doc.querySelectorAll('*'));
    allElements.forEach(function(el) {
      if (el.style && el.style.display === 'none') {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }
    });

    // 可視部分のSVGテキストを取得
    var visibleText = new XMLSerializer().serializeToString(doc);

    // hex6桁カラーをすべて抽出（#RRGGBB形式）
    var allColors = visibleText.match(/#[0-9A-Fa-f]{6}/g) || [];

    // 除外すべき色を判定
    function shouldExclude(hex) {
      var r = parseInt(hex.slice(1, 3), 16);
      var g = parseInt(hex.slice(3, 5), 16);
      var b = parseInt(hex.slice(5, 7), 16);
      var sum = r + g + b;

      // 肌色を除外
      if (hex.toLowerCase() === '#fad6b6') return true;
      if (hex.toLowerCase() === '#f1b588') return true;

      // 超暗色（アウトライン・影）を除外: R+G+B < 120
      if (sum < 120) return true;

      // 超明色（白背景等）を除外: R+G+B > 720
      if (sum > 720) return true;

      return false;
    }

    // 色の出現回数をカウント（除外色を除く）
    var colorCount = {};
    allColors.forEach(function(c) {
      var normalized = c.toLowerCase();
      if (!shouldExclude(normalized)) {
        colorCount[normalized] = (colorCount[normalized] || 0) + 1;
      }
    });

    // 最頻出の色を返す
    var bestColor = null;
    var bestCount = 0;
    Object.keys(colorCount).forEach(function(c) {
      if (colorCount[c] > bestCount) {
        bestCount = colorCount[c];
        bestColor = c;
      }
    });

    return bestColor; // 見つからなければ null
  } catch (e) {
    console.warn('[scanner] extractPrimaryColor error:', e);
    return null;
  }
}

// ===== メインスキャン処理 =====

// 全カテゴリのSVGをスキャンし PARTS_DATA を動的に構築する
// ローディング中は #loading-overlay を表示する
async function scanAllParts() {
  // ローディング表示
  var overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.style.display = 'flex';

  // fetch が使えない環境（file://）の場合はエラーを表示して終了
  try {
    var testFetch = await fetch('img/svg/none.svg', { method: 'HEAD' });
    if (!testFetch.ok && testFetch.status !== 200) {
      throw new Error('fetch failed');
    }
  } catch (e) {
    if (overlay) overlay.style.display = 'none';
    alert(
      'SVGファイルの読み込みに失敗しました。\n' +
      'Live Server または GitHub Pages 経由でアクセスしてください。\n' +
      '（file:// では動作しません）'
    );
    return;
  }

  // 全カテゴリを並列スキャン
  await Promise.all(TAB_ORDER.map(async function(category) {
    var meta = CATEGORY_META[category];

    PARTS_DATA[category] = {
      label: meta.label,
      layer: category,
      options: []
    };

    // hasNone=true のカテゴリは「なし」オプションを先頭に追加
    if (meta.hasNone) {
      PARTS_DATA[category].options.push({
        id: 'none-' + category,
        label: 'なし',
        file: 'img/svg/none.svg',
        isNone: true,
        targetColor: null
      });
    }

    // 01 から順番に存在確認
    for (var n = 1; n <= 99; n++) {
      var filename = category + pad2(n) + '.svg';
      var url = 'img/svg/' + filename;

      var exists = await probeFile(url);
      if (!exists) break; // 存在しなければ終了

      // targetColor を抽出（colorSlot がある場合のみ）
      var targetColor = null;
      if (meta.colorSlot) {
        try {
          var svgText = await fetchSVGCached(url);
          targetColor = extractPrimaryColor(svgText);
        } catch (e) {
          console.warn('[scanner] color extraction failed for', url, e);
        }
      }

      PARTS_DATA[category].options.push({
        id: category + pad2(n),
        label: 'タイプ' + n,
        file: url,
        targetColor: targetColor
      });
    }
  }));

  // スキャン結果から初期状態を設定
  initStateFromParts();

  // ローディング非表示
  if (overlay) overlay.style.display = 'none';
}

// スキャン結果から state / colorState / categoryTargetColors を初期化
function initStateFromParts() {
  TAB_ORDER.forEach(function(category) {
    var data = PARTS_DATA[category];
    if (!data || !data.options || data.options.length === 0) return;

    var meta = CATEGORY_META[category];

    // 初期選択: hasNone=true かつ noneオプションのみ → none.svg, そうでなければ最初の非noneオプション
    var firstOption = null;
    if (meta.hasNone) {
      // デフォルトは「なし」（none.svg）
      firstOption = data.options[0]; // none オプション
    } else {
      // デフォルトは最初のオプション
      firstOption = data.options[0];
    }

    // state を設定
    state[category] = firstOption.file;

    // colorSlot があるカテゴリは targetColor / colorState も設定
    if (meta.colorSlot) {
      // 最初の非noneオプションの targetColor を使う
      var firstReal = data.options.find(function(o) { return !o.isNone && o.targetColor; });
      if (firstReal) {
        categoryTargetColors[category] = firstReal.targetColor;

        // colorState はそのスロットがまだデフォルト値（skin以外）なら最初のパーツの色で初期化
        // ただし skin は固定なので変更しない
        if (meta.colorSlot !== 'skin') {
          colorState[meta.colorSlot] = firstReal.targetColor;
        }
      }
    }
  });

  // backhair の初期値は none.svg なので state を上書き
  if (PARTS_DATA['backhair']) {
    state['backhair'] = 'img/svg/none.svg';
  }
  // other の初期値も none.svg
  if (PARTS_DATA['other']) {
    state['other'] = 'img/svg/none.svg';
  }
  // flonthair は最初のタイプ（flonthair01）を選択状態にする
  if (PARTS_DATA['flonthair'] && PARTS_DATA['flonthair'].options.length > 1) {
    state['flonthair'] = PARTS_DATA['flonthair'].options[1].file; // index 0 は none
  }
}
