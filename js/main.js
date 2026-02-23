// アプリ初期化

document.addEventListener('DOMContentLoaded', async function() {
  // SVGファイルをスキャンして PARTS_DATA を動的に構築
  // state / colorState / categoryTargetColors も初期設定される
  await scanAllParts();

  // タブUI初期化（最初のタブ選択・オプションパネル生成も行う）
  initTabs();

  // 状態に合わせてプレビューを描画
  renderAllWithColor();

  // ランダムボタン
  document.getElementById('random-btn').addEventListener('click', function() {
    randomizeCharacter();
  });

  // PNG保存ボタン
  document.getElementById('export-btn').addEventListener('click', function() {
    exportPNG();
  });
});
