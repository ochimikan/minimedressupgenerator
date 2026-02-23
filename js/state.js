// キャラクター選択状態の管理
// 初期値は scanner.js の initStateFromParts() によって設定される

var state = {
  upperbody: '',
  lowerbody: '',
  face:      '',
  mouth:     '',
  nose:      '',
  eye:       '',
  ear:       '',
  eyebrows:  '',
  flonthair: '',
  backhair:  '',
  other:     '',
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

// ユーザーが選んだ色（skin のみ固定初期値。その他は scanAllParts() 後に設定される）
var colorState = {
  skin:          '#FAD6B6',
  hair:          '#291508',
  eyebrows:      '#482A2A',
  eye:           '#291508',
  upperClothing: '#3EB69D',  // scanner で上書きされる
  lowerClothing: '#0E2E48',  // scanner で上書きされる
  mouth:         '#DF775A',  // scanner で上書きされる
};

// 現在選択中の各カテゴリSVGの元の主要色（置換の FROM 色）
// scanAllParts() によって動的に設定される
var categoryTargetColors = {
  flonthair: '#291508',
  backhair:  '#1E0B0B',
  eyebrows:  '#482A2A',
  eye:       '#291508',
  upperbody: '#3EB69D',  // scanner で正しい値に上書きされる
  lowerbody: '#0E2E48',
  mouth:     '#DF775A',
};
