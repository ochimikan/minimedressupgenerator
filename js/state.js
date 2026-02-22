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
