// SVGレイヤーの描画更新

var LAYER_ORDER = [
  'backhair', 'lowerbody', 'upperbody', 'ear',
  'face', 'mouth', 'nose', 'eye', 'eyebrows', 'other', 'flonthair'
];

function updateLayer(category, filePath) {
  var el = document.getElementById('layer-' + category);
  if (el) {
    el.src = filePath;
  }
}

function renderAll() {
  LAYER_ORDER.forEach(function(category) {
    updateLayer(category, state[category]);
  });
}
