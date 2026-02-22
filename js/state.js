// キャラクター選択状態の管理

var state = {
  upperbody: 'img/svg/upperbody01.svg',
  lowerbody: 'img/svg/lowerbody01.svg',
  face:      'img/svg/face01.svg',
  mouth:     'img/svg/mouth01.svg',
  nose:      'img/svg/nose01.svg',
  eye:       'img/svg/eye01.svg',
  ear:       'img/svg/ear01.svg',
  eyebrows:  'img/svg/eyebrows01.svg',
  flonthair: 'img/svg/flonthair01.svg',
  backhair:  'img/svg/none.svg',
  other:     'img/svg/none.svg',
};

function setState(category, filePath) {
  state[category] = filePath;
}

function getState() {
  var copy = {};
  for (var key in state) {
    copy[key] = state[key];
  }
  return copy;
}

// ===== カラー状態 =====

// ユーザーが選んだ色（初期値は初期パーツのデフォルト色に合わせる）
var colorState = {
  skin:          '#FAD6B6',
  hair:          '#291508',  // flonthair01 のデフォルト色
  eyebrows:      '#482A2A',  // eyebrows01 のデフォルト色
  eye:           '#291508',  // eye01 のデフォルト色
  upperClothing: '#F3F757',  // upperbody01 のデフォルト色
  lowerClothing: '#0E2E48',  // lowerbody01 のデフォルト色
  mouth:         '#DF775A',  // mouth01 のデフォルト色
};

// 現在選択中の各カテゴリSVGの元の主要色（置換の FROM 色）
var categoryTargetColors = {
  flonthair: '#291508',  // flonthair01
  backhair:  '#1E0B0B',  // backhair01（初期はnone.svg選択だが設定しておく）
  eyebrows:  '#482A2A',  // eyebrows01
  eye:       '#291508',  // eye01
  upperbody: '#F3F757',  // upperbody01
  lowerbody: '#0E2E48',  // lowerbody01
  mouth:     '#DF775A',  // mouth01
};
