// パーツデータ定義
// targetColor: カラー置換の対象となる元の主要色（服・髪・口・目・眉）

const PARTS_DATA = {
  upperbody: {
    label: '上半身',
    layer: 'upperbody',
    options: [
      { id: 'upperbody01', label: 'タイプ1', file: 'img/svg/upperbody01.svg', targetColor: '#F3F757' },
      { id: 'upperbody02', label: 'タイプ2', file: 'img/svg/upperbody02.svg', targetColor: '#F3F757' },
      { id: 'upperbody03', label: 'タイプ3', file: 'img/svg/upperbody03.svg', targetColor: '#FFFFFF' },
      { id: 'upperbody04', label: 'タイプ4', file: 'img/svg/upperbody04.svg', targetColor: '#EAEAEA' },
      { id: 'upperbody05', label: 'タイプ5', file: 'img/svg/upperbody05.svg', targetColor: '#036EB7' },
    ]
  },

  lowerbody: {
    label: '下半身',
    layer: 'lowerbody',
    options: [
      { id: 'lowerbody01', label: 'タイプ1', file: 'img/svg/lowerbody01.svg', targetColor: '#0E2E48' },
      { id: 'lowerbody02', label: 'タイプ2', file: 'img/svg/lowerbody02.svg', targetColor: '#DD3812' },
      { id: 'lowerbody03', label: 'タイプ3', file: 'img/svg/lowerbody03.svg', targetColor: '#64CC64' },
      { id: 'lowerbody04', label: 'タイプ4', file: 'img/svg/lowerbody04.svg', targetColor: '#EA5C5C' },
      { id: 'lowerbody05', label: 'タイプ5', file: 'img/svg/lowerbody05.svg', targetColor: '#EAEAEA' },
      { id: 'lowerbody06', label: 'タイプ6', file: 'img/svg/lowerbody06.svg', targetColor: '#0E2E48' },
      { id: 'lowerbody07', label: 'タイプ7', file: 'img/svg/lowerbody07.svg', targetColor: '#231815' },
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
      { id: 'mouth01', label: 'タイプ1', file: 'img/svg/mouth01.svg', targetColor: '#DF775A' },
      { id: 'mouth02', label: 'タイプ2', file: 'img/svg/mouth02.svg', targetColor: '#CE6363' },
      { id: 'mouth03', label: 'タイプ3', file: 'img/svg/mouth03.svg', targetColor: '#DF775A' },
      { id: 'mouth04', label: 'タイプ4', file: 'img/svg/mouth04.svg', targetColor: '#BC6868' },
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
      { id: 'eye01', label: 'タイプ1', file: 'img/svg/eye01.svg', targetColor: '#291508' },
      { id: 'eye02', label: 'タイプ2', file: 'img/svg/eye02.svg', targetColor: '#291508' },
      { id: 'eye03', label: 'タイプ3', file: 'img/svg/eye03.svg', targetColor: '#291508' },
      { id: 'eye04', label: 'タイプ4', file: 'img/svg/eye04.svg', targetColor: '#291508' },
      { id: 'eye05', label: 'タイプ5', file: 'img/svg/eye05.svg', targetColor: '#291508' },
      { id: 'eye06', label: 'タイプ6', file: 'img/svg/eye06.svg', targetColor: '#291508' },
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
      { id: 'eyebrows01', label: 'タイプ1', file: 'img/svg/eyebrows01.svg', targetColor: '#482A2A' },
      { id: 'eyebrows02', label: 'タイプ2', file: 'img/svg/eyebrows02.svg', targetColor: '#482A2A' },
      { id: 'eyebrows03', label: 'タイプ3', file: 'img/svg/eyebrows03.svg', targetColor: '#6B0000' },
      { id: 'eyebrows04', label: 'タイプ4', file: 'img/svg/eyebrows04.svg', targetColor: '#473D3D' },
    ]
  },

  flonthair: {
    label: '前髪',
    layer: 'flonthair',
    options: [
      { id: 'none-flonthair', label: 'なし', file: 'img/svg/none.svg', isNone: true },
      { id: 'flonthair01', label: 'タイプ1', file: 'img/svg/flonthair01.svg', targetColor: '#291508' },
      { id: 'flonthair02', label: 'タイプ2', file: 'img/svg/flonthair02.svg', targetColor: '#482A2A' },
      { id: 'flonthair03', label: 'タイプ3', file: 'img/svg/flonthair03.svg', targetColor: '#291508' },
      { id: 'flonthair04', label: 'タイプ4', file: 'img/svg/flonthair04.svg', targetColor: '#291508' },
      { id: 'flonthair05', label: 'タイプ5', file: 'img/svg/flonthair05.svg', targetColor: '#291508' },
      { id: 'flonthair06', label: 'タイプ6', file: 'img/svg/flonthair06.svg', targetColor: '#291508' },
      { id: 'flonthair07', label: 'タイプ7', file: 'img/svg/flonthair07.svg', targetColor: '#291508' },
      { id: 'flonthair08', label: 'タイプ8', file: 'img/svg/flonthair08.svg', targetColor: '#473D3D' },
    ]
  },

  backhair: {
    label: '後髪',
    layer: 'backhair',
    options: [
      { id: 'none-backhair', label: 'なし', file: 'img/svg/none.svg', isNone: true },
      { id: 'backhair01', label: 'タイプ1', file: 'img/svg/backhair01.svg', targetColor: '#1E0B0B' },
      { id: 'backhair02', label: 'タイプ2', file: 'img/svg/backhair02.svg', targetColor: '#6B0000' },
      { id: 'backhair03', label: 'タイプ3', file: 'img/svg/backhair03.svg', targetColor: '#1E0B0B' },
      { id: 'backhair04', label: 'タイプ4', file: 'img/svg/backhair04.svg', targetColor: '#1E0B0B' },
      { id: 'backhair05', label: 'タイプ5', file: 'img/svg/backhair05.svg', targetColor: '#291508' },
      { id: 'backhair06', label: 'タイプ6', file: 'img/svg/backhair06.svg', targetColor: '#291508' },
      { id: 'backhair07', label: 'タイプ7', file: 'img/svg/backhair07.svg', targetColor: '#291508' },
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
