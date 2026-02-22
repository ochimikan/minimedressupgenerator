// タブ・オプションパネル・カラーセクションのUI

var currentTab = 'upperbody';

// ===== カラーUI設定 =====

// タブごとに表示するカラースロット
var TAB_COLOR_SLOTS = {
  upperbody: ['skin', 'upperClothing'],
  lowerbody: ['skin', 'lowerClothing'],
  face:      ['skin'],
  mouth:     ['mouth'],
  nose:      ['skin'],
  eye:       ['eye'],
  ear:       ['skin'],
  eyebrows:  ['eyebrows'],
  flonthair: ['hair'],
  backhair:  ['hair'],
  other:     [],
};

// スロット別のラベル・スウォッチ定義
var SLOT_CONFIG = {
  skin: {
    label: '肌色',
    swatches: ['#FAD6B6', '#F5C08A', '#C8864A', '#8D5524', '#4A2912'],
  },
  hair: {
    label: '髪色',
    swatches: ['#291508', '#7B4A1E', '#C4783A', '#F0C27F', '#E8E8E8', '#FF6B6B', '#5B8DB8'],
  },
  eyebrows: {
    label: '眉の色',
    swatches: ['#291508', '#7B4A1E', '#C4783A', '#F0C27F', '#E8E8E8'],
  },
  eye: {
    label: '目の色',
    swatches: ['#291508', '#7B4A1E', '#3A7BC4', '#3AC47B', '#888888'],
  },
  upperClothing: {
    label: '服の色（上）',
    swatches: ['#F3F757', '#5B8DB8', '#C05070', '#64CC64', '#888888', '#FFFFFF'],
  },
  lowerClothing: {
    label: '服の色（下）',
    swatches: ['#0E2E48', '#DD3812', '#64CC64', '#888888', '#EAEAEA', '#4A2912'],
  },
  mouth: {
    label: '口の色',
    swatches: ['#DF775A', '#CE6363', '#BC6868', '#E8A0A0', '#C88080'],
  },
};

// ===== タブ =====

function initTabs() {
  var tabBar = document.getElementById('tab-bar');

  TAB_ORDER.forEach(function(category) {
    var btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.textContent = PARTS_DATA[category].label;
    btn.dataset.category = category;
    btn.addEventListener('click', function() {
      switchTab(category);
    });
    tabBar.appendChild(btn);
  });

  switchTab('upperbody');
}

function switchTab(category) {
  currentTab = category;

  var buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.category === category);
  });

  buildOptionPanel(category);
}

// ===== オプションパネル =====

function buildOptionPanel(category) {
  var panel = document.getElementById('option-panel');
  panel.innerHTML = '';

  // ── オプショングリッド ──
  var grid = document.createElement('div');
  grid.className = 'options-grid';

  var options = PARTS_DATA[category].options;
  var currentFile = state[category];

  options.forEach(function(opt) {
    var btn = document.createElement('button');
    btn.className = 'option-btn';
    if (opt.file === currentFile) btn.classList.add('selected');

    if (opt.isNone) {
      btn.classList.add('option-none');
      var placeholder = document.createElement('div');
      placeholder.className = 'thumb-placeholder';
      placeholder.textContent = '✕';
      btn.appendChild(placeholder);
    } else {
      var img = document.createElement('img');
      img.src = opt.file;
      img.alt = opt.label;
      img.className = 'thumb';
      btn.appendChild(img);
    }

    var label = document.createElement('span');
    label.textContent = opt.label;
    btn.appendChild(label);

    btn.addEventListener('click', function() {
      // 状態更新
      setState(category, opt.file);

      // targetColor 更新
      if (opt.targetColor) {
        categoryTargetColors[category] = opt.targetColor;
      }

      // レイヤー再描画
      renderLayerWithColor(category);

      // 選択状態UI更新
      grid.querySelectorAll('.option-btn').forEach(function(b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
    });

    grid.appendChild(btn);
  });

  panel.appendChild(grid);

  // ── カラーセクション ──
  var colorSection = buildColorSection(category);
  if (colorSection) {
    panel.appendChild(colorSection);
  }
}

// ===== カラーセクション =====

function buildColorSection(category) {
  var slots = TAB_COLOR_SLOTS[category];
  if (!slots || slots.length === 0) return null;

  var section = document.createElement('div');
  section.className = 'color-section';

  var title = document.createElement('div');
  title.className = 'color-section-title';
  title.textContent = 'カラー';
  section.appendChild(title);

  slots.forEach(function(slotKey) {
    var slotEl = buildColorSlot(slotKey);
    section.appendChild(slotEl);
  });

  return section;
}

function buildColorSlot(slotKey) {
  var config = SLOT_CONFIG[slotKey];

  var div = document.createElement('div');
  div.className = 'color-slot';

  var label = document.createElement('span');
  label.className = 'color-slot-label';
  label.textContent = config.label;
  div.appendChild(label);

  var swatchRow = document.createElement('div');
  swatchRow.className = 'color-swatches';

  // プリセットスウォッチ
  config.swatches.forEach(function(hex) {
    var btn = document.createElement('button');
    btn.className = 'swatch';
    btn.style.background = hex;
    btn.title = hex;
    if (colorState[slotKey].toUpperCase() === hex.toUpperCase()) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', function() {
      colorState[slotKey] = hex;
      picker.value = hex;

      // アクティブスウォッチ更新
      swatchRow.querySelectorAll('.swatch').forEach(function(s) {
        s.classList.remove('active');
      });
      btn.classList.add('active');

      // 関連レイヤーを再描画
      var cats = SLOT_TO_CATEGORIES[slotKey];
      if (cats) cats.forEach(function(cat) { renderLayerWithColor(cat); });
    });

    swatchRow.appendChild(btn);
  });

  // カスタムカラーピッカー
  var picker = document.createElement('input');
  picker.type = 'color';
  picker.className = 'color-picker';
  picker.value = colorState[slotKey];
  picker.title = 'カスタム';

  picker.addEventListener('input', function() {
    colorState[slotKey] = picker.value.toUpperCase();

    // スウォッチのアクティブ解除
    swatchRow.querySelectorAll('.swatch').forEach(function(s) {
      s.classList.remove('active');
    });

    // 関連レイヤーを再描画
    var cats = SLOT_TO_CATEGORIES[slotKey];
    if (cats) cats.forEach(function(cat) { renderLayerWithColor(cat); });
  });

  swatchRow.appendChild(picker);
  div.appendChild(swatchRow);

  return div;
}
