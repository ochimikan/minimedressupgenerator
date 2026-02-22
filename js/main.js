// アプリ初期化

document.addEventListener('DOMContentLoaded', function() {
  // タブUI初期化（最初のタブ選択・オプションパネル生成も行う）
  initTabs();

  // 状態に合わせてプレビューを描画
  renderAll();

  // ランダムボタン
  document.getElementById('random-btn').addEventListener('click', function() {
    randomizeCharacter();
  });

  // PNG保存ボタン
  document.getElementById('export-btn').addEventListener('click', function() {
    exportPNG();
  });
});
