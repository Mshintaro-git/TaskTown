import { PlayerBuilding } from "../types";

// プレイヤーの所有建物データ（モック）
// 後でSQLiteから取得する形に変更
export const MOCK_PLAYER_BUILDINGS: PlayerBuilding[] = [
  {
    id: 1,
    slotNumber: 1,
    type: "tent",
    builtAt: "2026-07-30",
  },
  {
    id: 2,
    slotNumber: 2,
    type: "tree",
    builtAt: "2026-07-30",
  },
  {
    id: 3,
    slotNumber: 5,
    type: "flower",
    builtAt: "2026-07-30",
  },
];

// 指定したスロット番号の建物を取得
export function getBuildingAtSlot(
  slotNumber: number,
  buildings: PlayerBuilding[]
): PlayerBuilding | undefined {
  return buildings.find((b) => b.slotNumber === slotNumber);
}