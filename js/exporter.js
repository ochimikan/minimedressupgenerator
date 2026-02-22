// PNG書き出し（カラーカスタマイズ反映版）

function exportPNG() {
  var btn = document.getElementById('export-btn');
  btn.textContent = '書き出し中...';
  btn.disabled = true;

  var layerOrder = [
    'backhair', 'lowerbody', 'upperbody', 'ear',
    'face', 'mouth', 'nose', 'eye', 'eyebrows', 'other', 'flonthair'
  ];

  // 各SVGをfetch → カラー適用 → data URI に変換
  var promises = layerOrder.map(function(cat) {
    var file = state[cat];

    // none.svg はそのまま使用
    if (!file || file === 'img/svg/none.svg') {
      return fetch('img/svg/none.svg')
        .then(function(r) { return r.text(); })
        .then(function(text) {
          return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text);
        });
    }

    // カラー適用済みのSVGテキストを使用
    return fetchSVGCached(file)
      .then(function(svgText) {
        var colored = applyColors(svgText, cat);
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(colored);
      });
  });

  Promise.all(promises)
    .then(function(dataURIs) {
      // 合成SVGを作成（3倍サイズで書き出し）
      var w = 477;  // 159 × 3
      var h = 897;  // 299 × 3

      var imageElements = dataURIs.map(function(uri) {
        return '<image href="' + uri + '" width="159" height="299"/>';
      }).join('');

      var compositeSVG =
        '<svg xmlns="http://www.w3.org/2000/svg" ' +
        'xmlns:xlink="http://www.w3.org/1999/xlink" ' +
        'viewBox="0 0 159 299" width="' + w + '" height="' + h + '">' +
        imageElements +
        '</svg>';

      var blob = new Blob([compositeSVG], { type: 'image/svg+xml' });
      var url = URL.createObjectURL(blob);
      var img = new Image();

      img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        var link = document.createElement('a');
        link.download = 'minime.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.textContent = '⬇ PNG保存';
        btn.disabled = false;
      };

      img.onerror = function() {
        URL.revokeObjectURL(url);
        alert('書き出しに失敗しました。\nVS Code の Live Server などローカルサーバーで実行してください。');
        btn.textContent = '⬇ PNG保存';
        btn.disabled = false;
      };

      img.src = url;
    })
    .catch(function(e) {
      alert(
        '書き出しに失敗しました。\n' + e.message + '\n\n' +
        'ローカルサーバー（VS Code Live Server 等）で実行してください。\n' +
        'または既存サーバーにファイルをアップロードしてください。'
      );
      btn.textContent = '⬇ PNG保存';
      btn.disabled = false;
    });
}
