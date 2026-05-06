import { pitchTypes } from "../data/pitchData";

type Stats = Record<string, number>;

type RequiredPoints = {
  muscle: number;
  agility: number;
  technique: number;
  mental: number;
};

type PointCost = RequiredPoints;

const CONTROL_RANK_COST: Record<string, PointCost> = {
  G: { muscle: 0, agility: 0, technique: 10, mental: 7 },
  F: { muscle: 0, agility: 0, technique: 11, mental: 8 }, // TODO: 仮値（資料の空欄）
  E: { muscle: 0, agility: 0, technique: 12, mental: 9 },
  D: { muscle: 0, agility: 0, technique: 14, mental: 10 },
  C: { muscle: 0, agility: 0, technique: 16, mental: 12 },
  B: { muscle: 0, agility: 0, technique: 18, mental: 13 }, // TODO: 仮値（資料の空欄）
  A: { muscle: 0, agility: 0, technique: 20, mental: 15 }, // TODO: 仮値（資料の空欄）
  A90: { muscle: 0, agility: 0, technique: 22, mental: 17 }, // TODO: 仮値（資料の空欄）
  S: { muscle: 0, agility: 0, technique: 24, mental: 19 }, // TODO: 仮値（資料の空欄）
};

const STAMINA_RANK_COST: Record<string, PointCost> = {
  G: { muscle: 7, agility: 0, technique: 0, mental: 3 },
  F: { muscle: 7, agility: 0, technique: 0, mental: 4 },
  E: { muscle: 8, agility: 0, technique: 0, mental: 4 },
  D: { muscle: 8, agility: 0, technique: 0, mental: 5 },
  C: { muscle: 9, agility: 0, technique: 0, mental: 5 },
  B: { muscle: 9, agility: 0, technique: 0, mental: 6 },
  A: { muscle: 10, agility: 0, technique: 0, mental: 7 }, // TODO: 仮値（資料の空欄）
  A90: { muscle: 11, agility: 0, technique: 0, mental: 8 }, // TODO: 仮値（資料の空欄）
  S: { muscle: 12, agility: 0, technique: 0, mental: 9 }, // TODO: 仮値（資料の空欄）
};

const NEW_PITCH_COUNT_COST: Record<number, number> = {
  1: 0,
  2: 60,
  3: 180,
  4: 360,
  5: 600,
};

const PITCH_TYPE_COST: Record<"A" | "B" | "C" | "D", number> = {
  A: 14,
  B: 16,
  C: 18,
  D: 21,
};

const PITCH_TYPE_BY_ID: Record<string, "A" | "B" | "C" | "D"> = {
  slider: "A",
  cutter: "A",
  palm: "A",
  shoot: "A",
  hShoot: "A",

  hSlider: "B",
  curve: "B",
  slowCurve: "B",
  drop: "B",
  dCurve: "B",
  slurve: "B",
  fork: "B",
  vSlider: "B",
  sff: "B",
  sinker: "B",
  hSinker: "B",

  knuckleCurve: "C",
  changeup: "C",
  circleChange: "C",

  knuckle: "D",
  original: "D",

  // TODO: ツーシーム・超スローボールの正式分類は要確認（暫定でD）
  twoSeam: "D",
  superSlow: "D",
};

function getControlRank(value: number): keyof typeof CONTROL_RANK_COST {
  if (value >= 100) return "S";
  if (value >= 90) return "A90";
  if (value >= 80) return "A";
  if (value >= 70) return "B";
  if (value >= 60) return "C";
  if (value >= 50) return "D";
  if (value >= 40) return "E";
  if (value >= 30) return "F";
  return "G";
}

function getStaminaRank(value: number): keyof typeof STAMINA_RANK_COST {
  if (value >= 100) return "S";
  if (value >= 90) return "A90";
  if (value >= 80) return "A";
  if (value >= 70) return "B";
  if (value >= 60) return "C";
  if (value >= 50) return "D";
  if (value >= 40) return "E";
  if (value >= 30) return "F";
  return "G";
}

function getBallSpeedCost(nextValue: number): PointCost {
  // 参考値テーブル（球速を1上げるコスト）
  if (nextValue <= 130) return { muscle: 22, agility: 0, technique: 11, mental: 1 };
  if (nextValue <= 135) return { muscle: 25, agility: 0, technique: 12, mental: 1 };
  if (nextValue <= 140) return { muscle: 28, agility: 0, technique: 14, mental: 1 };
  if (nextValue === 141) return { muscle: 31, agility: 0, technique: 15, mental: 2 };
  if (nextValue === 142) return { muscle: 34, agility: 0, technique: 17, mental: 3 };
  if (nextValue === 143) return { muscle: 37, agility: 0, technique: 18, mental: 4 };
  if (nextValue === 144) return { muscle: 40, agility: 0, technique: 20, mental: 5 };
  if (nextValue === 145) return { muscle: 43, agility: 0, technique: 21, mental: 6 };
  if (nextValue === 146) return { muscle: 46, agility: 0, technique: 23, mental: 7 };
  if (nextValue === 147) return { muscle: 49, agility: 0, technique: 24, mental: 8 };
  if (nextValue === 148) return { muscle: 52, agility: 0, technique: 26, mental: 9 };
  if (nextValue === 149) return { muscle: 55, agility: 0, technique: 27, mental: 10 };
  if (nextValue === 150) return { muscle: 58, agility: 0, technique: 29, mental: 11 };
  if (nextValue === 151) return { muscle: 61, agility: 0, technique: 30, mental: 12 };
  if (nextValue === 152) return { muscle: 64, agility: 0, technique: 32, mental: 13 };

  // TODO: 153以上の正式値は要確認（暫定で+3/+2/+1増分）
  const over = nextValue - 152;
  return {
    muscle: 64 + over * 3,
    agility: 0,
    technique: 32 + over * 2,
    mental: 13 + over,
  };
}

function addCost(target: RequiredPoints, cost: PointCost): void {
  target.muscle += cost.muscle;
  target.agility += cost.agility;
  target.technique += cost.technique;
  target.mental += cost.mental;
}

export function calculateRequiredPoints(currentStats: Stats, targetStats: Stats): RequiredPoints {
  const result: RequiredPoints = {
    muscle: 0,
    agility: 0,
    technique: 0,
    mental: 0,
  };

  // 球速
  const currentBallSpeed = currentStats.ballSpeed ?? 0;
  const targetBallSpeed = targetStats.ballSpeed ?? 0;
  for (let next = currentBallSpeed + 1; next <= targetBallSpeed; next += 1) {
    addCost(result, getBallSpeedCost(next));
  }

  // コントロール
  const currentControl = currentStats.control ?? 0;
  const targetControl = targetStats.control ?? 0;
  for (let next = currentControl + 1; next <= targetControl; next += 1) {
    addCost(result, CONTROL_RANK_COST[getControlRank(next)]);
  }

  // スタミナ
  const currentStamina = currentStats.stamina ?? 0;
  const targetStamina = targetStats.stamina ?? 0;
  for (let next = currentStamina + 1; next <= targetStamina; next += 1) {
    addCost(result, STAMINA_RANK_COST[getStaminaRank(next)]);
  }

  const pitchState: Record<string, number> = {};
  pitchTypes.forEach((pitch) => {
    pitchState[pitch.id] = currentStats[pitch.id] ?? 0;
  });

  const getTotalPitchAmount = () => pitchTypes.reduce((sum, pitch) => sum + (pitchState[pitch.id] ?? 0), 0);
  const getLearnedPitchCount = () => pitchTypes.reduce((count, pitch) => count + ((pitchState[pitch.id] ?? 0) > 0 ? 1 : 0), 0);

  // 変化球
  for (const pitch of pitchTypes) {
    const current = currentStats[pitch.id] ?? 0;
    const target = targetStats[pitch.id] ?? 0;
    if (target <= current) continue;

    for (let nextLevel = current + 1; nextLevel <= target; nextLevel += 1) {
      const beforeLearnedCount = getLearnedPitchCount();
      pitchState[pitch.id] = nextLevel;
      const afterLearnedCount = getLearnedPitchCount();

      const pitchType = PITCH_TYPE_BY_ID[pitch.id] ?? "B";
      const variableCost = PITCH_TYPE_COST[pitchType] * nextLevel;
      const totalAmountCost = 12 * getTotalPitchAmount();
      const pitchCountCost = afterLearnedCount > beforeLearnedCount ? (NEW_PITCH_COUNT_COST[afterLearnedCount] ?? 0) : 0;

      const changePoint = variableCost + totalAmountCost + pitchCountCost;
      const techniquePoint =
        Math.ceil(variableCost / 4) + Math.ceil(totalAmountCost / 4) + Math.ceil(pitchCountCost / 4);
      const mentalPoint =
        Math.ceil(variableCost / 8) + Math.ceil(totalAmountCost / 8) + Math.ceil(pitchCountCost / 8);

      result.agility += changePoint;
      result.technique += techniquePoint + (beforeLearnedCount === 0 && afterLearnedCount > 0 ? 1 : 0);
      result.mental += mentalPoint;
    }
  }

  return result;
}
