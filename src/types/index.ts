// 建物の種類（マスターデータ）
export type BuildingType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp: number;
};

// スロットの固定位置
export type SlotPosition = {
  slotNumber: number;
  x: number; // 画面幅に対する%位置
  y: number; // 画面高さに対する%位置
};

// プレイヤーの所有建物
export type PlayerBuilding = {
  id: number;
  slotNumber: number;
  type: string;
  builtAt: string;
};