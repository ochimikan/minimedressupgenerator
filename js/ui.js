// タブ・オプションパネルのUI操作

var currentTab = 'upperbody';

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

  // 最初のタブを選択
  switchTab('upperbody');
}

function switchTab(category) {
  currentTab = category;

  // タブボタンのアクティブ状態を更新
  var buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(function(btn) {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  buildOptionPanel(category);
}

function buildOptionPanel(category) {
  var panel = document.getElementById('option-panel');
  panel.innerHTML = '';

  var options = PARTS_DATA[category].options;
  var currentFile = state[category];

  options.forEach(function(opt) {
    var btn = document.createElement('button');
    btn.className = 'option-btn';

    if (opt.file === currentFile) {
      btn.classList.add('selected');
    }

    if (opt.isNone) {
      // 「なし」オプション：プレースホルダー表示
      btn.classList.add('option-none');
      var placeholder = document.createElement('div');
      placeholder.className = 'thumb-placeholder';
      placeholder.textContent = '✕';
      btn.appendChild(placeholder);
    } else {
      // 通常オプション：SVGサムネイル表示
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
      setState(category, opt.file);
      updateLayer(category, opt.file);

      // 選択状態を更新
      panel.querySelectorAll('.option-btn').forEach(function(b) {
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
    });

    panel.appendChild(btn);
  });
}
