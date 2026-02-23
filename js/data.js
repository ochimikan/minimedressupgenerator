// カテゴリメタデータ
// PARTS_DATA は scanner.js の scanAllParts() によって動的に構築される

var CATEGORY_META = {
  upperbody: { label: '上半身', colorSlot: 'upperClothing', hasNone: false },
  lowerbody: { label: '下半身', colorSlot: 'lowerClothing', hasNone: false },
  face:      { label: '顔',     colorSlot: null,             hasNone: false },
  mouth:     { label: '口',     colorSlot: 'mouth',          hasNone: false },
  nose:      { label: '鼻',     colorSlot: null,             hasNone: false },
  eye:       { label: '目',     colorSlot: 'eye',            hasNone: false },
  ear:       { label: '耳',     colorSlot: null,             hasNone: false },
  eyebrows:  { label: '眉毛',   colorSlot: 'eyebrows',       hasNone: false },
  flonthair: { label: '前髪',   colorSlot: 'hair',           hasNone: true  },
  backhair:  { label: '後髪',   colorSlot: 'hair',           hasNone: true  },
  other:     { label: 'その他', colorSlot: null,             hasNone: true  },
};

// scanAllParts() によって動的に構築されるパーツデータ
var PARTS_DATA = {};

// タブの表示順
const TAB_ORDER = [
  'upperbody', 'lowerbody', 'face', 'mouth', 'nose',
  'eye', 'ear', 'eyebrows', 'flonthair', 'backhair', 'other'
];
