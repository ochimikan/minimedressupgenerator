// パーツデータ定義
// 実際のSVGファイルに基づいたオプション一覧

const PARTS_DATA = {
  upperbody: {
    label: '上半身',
    layer: 'upperbody',
    options: [
      { id: 'upperbody01', label: 'タイプ1', file: 'img/svg/upperbody01.svg' },
      { id: 'upperbody02', label: 'タイプ2', file: 'img/svg/upperbody02.svg' },
      { id: 'upperbody03', label: 'タイプ3', file: 'img/svg/upperbody03.svg' },
      { id: 'upperbody04', label: 'タイプ4', file: 'img/svg/upperbody04.svg' },
      { id: 'upperbody05', label: 'タイプ5', file: 'img/svg/upperbody05.svg' },
    ]
  },

  lowerbody: {
    label: '下半身',
    layer: 'lowerbody',
    options: [
      { id: 'lowerbody01', label: 'タイプ1', file: 'img/svg/lowerbody01.svg' },
      { id: 'lowerbody02', label: 'タイプ2', file: 'img/svg/lowerbody02.svg' },
      { id: 'lowerbody03', label: 'タイプ3', file: 'img/svg/lowerbody03.svg' },
      { id: 'lowerbody04', label: 'タイプ4', file: 'img/svg/lowerbody04.svg' },
      { id: 'lowerbody05', label: 'タイプ5', file: 'img/svg/lowerbody05.svg' },
      { id: 'lowerbody06', label: 'タイプ6', file: 'img/svg/lowerbody06.svg' },
      { id: 'lowerbody07', label: 'タイプ7', file: 'img/svg/lowerbody07.svg' },
    ]
  },

  face: {
    label: '顔',
    layer: 'face',
    options: [
      { id: 'face01', label: 'タイプ1', file: 'img/svg/face01.svg' },
      { id: 'face02', label: 'タイプ2', file: 'img/svg/face02.svg' },
      { id: 'face03', label: 'タイプ3', file: 'img/svg/face03.svg' },
      { id: 'face04', label: 'タイプ4', file: 'img/svg/face04.svg' },
    ]
  },

  mouth: {
    label: '口',
    layer: 'mouth',
    options: [
      { id: 'mouth01', label: 'タイプ1', file: 'img/svg/mouth01.svg' },
      { id: 'mouth02', label: 'タイプ2', file: 'img/svg/mouth02.svg' },
      { id: 'mouth03', label: 'タイプ3', file: 'img/svg/mouth03.svg' },
      { id: 'mouth04', label: 'タイプ4', file: 'img/svg/mouth04.svg' },
    ]
  },

  nose: {
    label: '鼻',
    layer: 'nose',
    options: [
      { id: 'nose01', label: 'タイプ1', file: 'img/svg/nose01.svg' },
      { id: 'nose02', label: 'タイプ2', file: 'img/svg/nose02.svg' },
    ]
  },

  eye: {
    label: '目',
    layer: 'eye',
    options: [
      { id: 'eye01', label: 'タイプ1', file: 'img/svg/eye01.svg' },
      { id: 'eye02', label: 'タイプ2', file: 'img/svg/eye02.svg' },
      { id: 'eye03', label: 'タイプ3', file: 'img/svg/eye03.svg' },
      { id: 'eye04', label: 'タイプ4', file: 'img/svg/eye04.svg' },
      { id: 'eye05', label: 'タイプ5', file: 'img/svg/eye05.svg' },
      { id: 'eye06', label: 'タイプ6', file: 'img/svg/eye06.svg' },
    ]
  },

  ear: {
    label: '耳',
    layer: 'ear',
    options: [
      { id: 'ear01', label: 'タイプ1', file: 'img/svg/ear01.svg' },
      { id: 'ear02', label: 'タイプ2', file: 'img/svg/ear02.svg' },
    ]
  },

  eyebrows: {
    label: '眉毛',
    layer: 'eyebrows',
    options: [
      { id: 'eyebrows01', label: 'タイプ1', file: 'img/svg/eyebrows01.svg' },
      { id: 'eyebrows02', label: 'タイプ2', file: 'img/svg/eyebrows02.svg' },
      { id: 'eyebrows03', label: 'タイプ3', file: 'img/svg/eyebrows03.svg' },
      { id: 'eyebrows04', label: 'タイプ4', file: 'img/svg/eyebrows04.svg' },
    ]
  },

  flonthair: {
    label: '前髪',
    layer: 'flonthair',
    options: [
      { id: 'none-flonthair', label: 'なし', file: 'img/svg/none.svg', isNone: true },
      { id: 'flonthair01', label: 'タイプ1', file: 'img/svg/flonthair01.svg' },
      { id: 'flonthair02', label: 'タイプ2', file: 'img/svg/flonthair02.svg' },
      { id: 'flonthair03', label: 'タイプ3', file: 'img/svg/flonthair03.svg' },
      { id: 'flonthair04', label: 'タイプ4', file: 'img/svg/flonthair04.svg' },
      { id: 'flonthair05', label: 'タイプ5', file: 'img/svg/flonthair05.svg' },
      { id: 'flonthair06', label: 'タイプ6', file: 'img/svg/flonthair06.svg' },
      { id: 'flonthair07', label: 'タイプ7', file: 'img/svg/flonthair07.svg' },
      { id: 'flonthair08', label: 'タイプ8', file: 'img/svg/flonthair08.svg' },
    ]
  },

  backhair: {
    label: '後髪',
    layer: 'backhair',
    options: [
      { id: 'none-backhair', label: 'なし', file: 'img/svg/none.svg', isNone: true },
      { id: 'backhair01', label: 'タイプ1', file: 'img/svg/backhair01.svg' },
      { id: 'backhair02', label: 'タイプ2', file: 'img/svg/backhair02.svg' },
      { id: 'backhair03', label: 'タイプ3', file: 'img/svg/backhair03.svg' },
      { id: 'backhair04', label: 'タイプ4', file: 'img/svg/backhair04.svg' },
      { id: 'backhair05', label: 'タイプ5', file: 'img/svg/backhair05.svg' },
      { id: 'backhair06', label: 'タイプ6', file: 'img/svg/backhair06.svg' },
      { id: 'backhair07', label: 'タイプ7', file: 'img/svg/backhair07.svg' },
    ]
  },

  other: {
    label: 'その他',
    layer: 'other',
    options: [
      { id: 'none-other', label: 'なし', file: 'img/svg/none.svg', isNone: true },
      { id: 'other01', label: '眼鏡', file: 'img/svg/other01.svg' },
    ]
  },
};

// タブの表示順
const TAB_ORDER = [
  'upperbody', 'lowerbody', 'face', 'mouth', 'nose',
  'eye', 'ear', 'eyebrows', 'flonthair', 'backhair', 'other'
];
