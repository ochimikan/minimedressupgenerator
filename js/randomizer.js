// ランダムキャラクター生成

function randomizeCharacter() {
  TAB_ORDER.forEach(function(category) {
    var options = PARTS_DATA[category].options;
    var random = options[Math.floor(Math.random() * options.length)];
    setState(category, random.file);

    // targetColor を更新
    if (random.targetColor) {
      categoryTargetColors[category] = random.targetColor;
    }
  });

  renderAllWithColor();

  // 現在表示中のタブのパネルを再描画して選択状態を反映
  buildOptionPanel(currentTab);
}
