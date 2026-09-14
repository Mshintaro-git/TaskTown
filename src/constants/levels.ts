// LevelMaster
// レベルごとの必要XPを管理するマスターデータ

export type LevelData = {
  level: number;
  requiredXp: number;
};

export const LEVELS: LevelData[] = [
  { level: 1, requiredXp: 0 },
  { level: 2, requiredXp: 90 },
  { level: 3, requiredXp: 150 },
  { level: 4, requiredXp: 220 },
  { level: 5, requiredXp: 300 },
  { level: 6, requiredXp: 400 },
  { level: 7, requiredXp: 520 },
  { level: 8, requiredXp: 660 },
  { level: 9, requiredXp: 820 },
  { level: 10, requiredXp: 1000 },
];

// 最大レベル
export const MAX_LEVEL = 10;

// 指定レベルに必要なXPを取得
export function getRequiredXp(level: number): number {
  const data = LEVELS.find((l) => l.level === level);
  return data?.requiredXp ?? 999999;
}

// 次のレベルに必要なXPを取得
export function getNextRequiredXp(level: number): number {
  return getRequiredXp(level + 1);
}