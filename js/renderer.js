// SVGレイヤーの描画更新

var LAYER_ORDER = [
  'backhair', 'lowerbody', 'upperbody', 'ear',
  'face', 'mouth', 'nose', 'eye', 'eyebrows', 'other', 'flonthair'
];

// 後方互換ラッパー（colorizer.js を使った描画に委譲）
function updateLayer(category, filePath) {
  renderLayerWithColor(category);
}

function renderAll() {
  renderAllWithColor();
}
