// 建物サービス
// 建物取得・未建築判定・候補抽選・建築・保存・一覧取得

import { Platform } from "react-native";
import { BUILDINGS, LevelBuildingChoices, getBuildingById, BuildingMaster } from "../constants/buildings";
import { getDb } from "../database";

// プレイヤーの建物
export type PlayerBuilding = {
  id: number;
  buildingId: string;
  slotNumber: number;
  builtAt: string;
};

// Web用メモリ内建物データ
let webBuildings: PlayerBuilding[] = [];

// 建物候補（3件）
export type BuildingCandidate = {
  building: BuildingMaster;
  slotNumber: number;
};

// 建物を取得（IDから）
export function getBuilding(id: string): BuildingMaster | undefined {
  return getBuildingById(id);
}

// 全建物を取得
export function getAllBuildings(): BuildingMaster[] {
  return [...BUILDINGS];
}

// 建築済み建物を取得
export async function getBuiltBuildings(): Promise<PlayerBuilding[]> {
  if (Platform.OS === "web") {
    return [...webBuildings];
  }

  const db = getDb();
  if (!db) return [];

  const rows = await db.getAllAsync<{
    id: number;
    building_id: string;
    slot_number: number;
    built_at: string;
  }>("SELECT id, building_id, slot_number, built_at FROM buildings ORDER BY slot_number");

  return rows.map((row) => ({
    id: row.id,
    buildingId: row.building_id,
    slotNumber: row.slot_number,
    builtAt: row.built_at,
  }));
}

// 未建築の建物を取得
export async function getUnbuiltBuildings(): Promise<BuildingMaster[]> {
  const built = await getBuiltBuildings();
  const builtIds = new Set(built.map((b) => b.buildingId));
  return BUILDINGS.filter((b) => !builtIds.has(b.id));
}

// 空いている最小スロット番号を取得
export async function getNextAvailableSlot(): Promise<number> {
  const built = await getBuiltBuildings();
  const usedSlots = new Set(built.map((b) => b.slotNumber));

  for (let i = 1; i <= 10; i++) {
    if (!usedSlots.has(i)) {
      return i;
    }
  }

  return -1; // 全スロット埋まり
}

// 建物候補を取得（レベルごとに固定の3択）
export async function getBuildingCandidates(currentLevel: number = 1): Promise<BuildingCandidate[]> {
  const built = await getBuiltBuildings();
  const builtIds = new Set(built.map((b) => b.buildingId));

  // レベル別の固定候補を取得
  const levelChoices = LevelBuildingChoices[currentLevel] || [];

  // 未建築のみフィルター
  const candidates = levelChoices
    .map((id) => getBuildingById(id))
    .filter((building): building is BuildingMaster => {
      return building !== undefined && !builtIds.has(building.id);
    });

  if (candidates.length === 0) {
    return [];
  }

  // 空いているスロットを取得
  const slot = await getNextAvailableSlot();

  return candidates.map((building) => ({
    building,
    slotNumber: slot,
  }));
}

// 建物を建築
export async function buildBuilding(buildingId: string): Promise<PlayerBuilding | null> {
  const slot = await getNextAvailableSlot();
  if (slot === -1) {
    return null; // スロット満杯
  }

  const now = new Date().toISOString();

  if (Platform.OS === "web") {
    const newBuilding: PlayerBuilding = {
      id: webBuildings.length + 1,
      buildingId,
      slotNumber: slot,
      builtAt: now,
    };
    webBuildings.push(newBuilding);
    return newBuilding;
  }

  const db = getDb();
  if (!db) return null;

  const result = await db.runAsync(
    "INSERT INTO buildings (building_id, slot_number, built_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    buildingId,
    slot,
    now,
    now,
    now
  );

  return {
    id: result.lastInsertRowId as number,
    buildingId,
    slotNumber: slot,
    builtAt: now,
  };
}

// 建物一覧を取得（建築済み）
export async function getPlayerBuildings(): Promise<PlayerBuilding[]> {
  return await getBuiltBuildings();
}

// Web用メモリ内建物データをクリア（開発者用）
export function clearWebBuildings(): void {
  webBuildings = [];
}