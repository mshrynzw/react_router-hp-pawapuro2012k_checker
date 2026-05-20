export interface PitchType {
  id: string;
  name: string;
  category: string;
  muscle?: number;
  agility?: number;
  technique?: number;
  mental?: number;
}

export const baseStats = [
  { id: "ballSpeed", name: "球速", max: 170 },
  { id: "control", name: "コントロール", max: 100 },
  { id: "stamina", name: "スタミナ", max: 100 },
];

export const pitchTypes: PitchType[] = [
  // スライダー系
  {
    id: "slider",
    name: "スライダー",
    category: "スライダー系",
    muscle: 2,
    agility: 4,
    technique: 6,
    mental: 2,
  },
  {
    id: "hSlider",
    name: "Hスライダー",
    category: "スライダー系",
    muscle: 3,
    agility: 5,
    technique: 7,
    mental: 2,
  },
  {
    id: "vSlider",
    name: "Vスライダー",
    category: "スライダー系",
    muscle: 2,
    agility: 6,
    technique: 6,
    mental: 1,
  },
  {
    id: "cutter",
    name: "カットボール",
    category: "スライダー系",
    muscle: 3,
    agility: 5,
    technique: 5,
    mental: 2,
  },

  // カーブ系
  {
    id: "curve",
    name: "カーブ",
    category: "カーブ系",
    muscle: 1,
    agility: 3,
    technique: 8,
    mental: 3,
  },
  {
    id: "slowCurve",
    name: "スローカーブ",
    category: "カーブ系",
    muscle: 1,
    agility: 2,
    technique: 9,
    mental: 4,
  },
  {
    id: "drop",
    name: "ドロップ",
    category: "カーブ系",
    muscle: 2,
    agility: 2,
    technique: 9,
    mental: 4,
  },
  {
    id: "dCurve",
    name: "Dカーブ",
    category: "カーブ系",
    muscle: 2,
    agility: 4,
    technique: 7,
    mental: 3,
  },
  {
    id: "slurve",
    name: "スラーブ",
    category: "カーブ系",
    muscle: 2,
    agility: 5,
    technique: 7,
    mental: 2,
  },
  {
    id: "knuckleCurve",
    name: "ナックルカーブ",
    category: "カーブ系",
    muscle: 1,
    agility: 3,
    technique: 10,
    mental: 4,
  },

  // フォーク系
  {
    id: "fork",
    name: "フォーク",
    category: "フォーク系",
    muscle: 3,
    agility: 2,
    technique: 7,
    mental: 3,
  },
  {
    id: "palm",
    name: "パーム",
    category: "フォーク系",
    muscle: 2,
    agility: 2,
    technique: 8,
    mental: 4,
  },
  {
    id: "sff",
    name: "SFF",
    category: "フォーク系",
    muscle: 4,
    agility: 3,
    technique: 6,
    mental: 2,
  },
  {
    id: "changeup",
    name: "チェンジアップ",
    category: "フォーク系",
    muscle: 2,
    agility: 3,
    technique: 8,
    mental: 3,
  },
  // シンカー系
  {
    id: "sinker",
    name: "シンカー・スクリュー",
    category: "シンカー系",
    muscle: 3,
    agility: 5,
    technique: 5,
    mental: 2,
  },
  {
    id: "hSinker",
    name: "Hシンカー",
    category: "シンカー系",
    muscle: 4,
    agility: 6,
    technique: 5,
    mental: 2,
  },
  {
    id: "circleChange",
    name: "サークルチェンジ",
    category: "シンカー系",
    muscle: 2,
    agility: 4,
    technique: 9,
    mental: 3,
  },

  // シュート系
  {
    id: "shoot",
    name: "シュート",
    category: "シュート系",
    muscle: 4,
    agility: 3,
    technique: 4,
    mental: 2,
  },
  {
    id: "hShoot",
    name: "Hシュート",
    category: "シュート系",
    muscle: 5,
    agility: 4,
    technique: 4,
    mental: 2,
  },

  // その他
  {
    id: "twoSeam",
    name: "ツーシーム",
    category: "その他",
    muscle: 4,
    agility: 4,
    technique: 4,
    mental: 1,
  },
  {
    id: "superSlow",
    name: "超スローボール",
    category: "その他",
    muscle: 1,
    agility: 1,
    technique: 12,
    mental: 6,
  },
  {
    id: "knuckle",
    name: "ナックル",
    category: "その他",
    muscle: 1,
    agility: 2,
    technique: 15,
    mental: 8,
  },
  {
    id: "original",
    name: "オリジナル変化球",
    category: "その他",
    muscle: 5,
    agility: 5,
    technique: 10,
    mental: 5,
  },
];

export const categories = [
  { id: "base", name: "基本能力", icon: "⚾" },
  { id: "スライダー系", name: "スライダー系", icon: "🔵" },
  { id: "カーブ系", name: "カーブ系", icon: "🟣" },
  { id: "フォーク系", name: "フォーク系", icon: "🔴" },
  { id: "シンカー系", name: "シンカー系", icon: "🟡" },
  { id: "シュート系", name: "シュート系", icon: "🟢" },
  { id: "その他", name: "その他", icon: "⚪" },
];
