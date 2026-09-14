// データベースサービス
// Expo SQLiteを使用してプレイヤーデータを永続化
// Web環境ではAsyncStorageまたはメモリ内でフォールバック

import { Platform } from "react-native";
import { initDatabase as initDb, getDb } from "../database";
import { clearWebBuildings, getBuiltBuildings } from "./buildingService";

// 冒険の状態
// TERMINATED: 途中で中止した状態（その日は再受注不可）
export type AdventureStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" | "TERMINATED";

// プレイヤー状態の型
export type PlayerState = {
  level: number;
  currentXp: number;
  totalXp: number;
  lastPlayDate: string | null;
  adventureStatus: AdventureStatus;
};

// デフォルトのプレイヤー状態
const DEFAULT_STATE: PlayerState = {
  level: 1,
  currentXp: 0,
  totalXp: 0,
  lastPlayDate: null,
  adventureStatus: "NOT_STARTED",
};

// Web用メモリ内ストレージ
let webState: PlayerState = { ...DEFAULT_STATE };

// データベースを初期化（Migrationシステムを使用）
export async function initDatabase(): Promise<void> {
  await initDb();
}

// プレイヤー状態を取得
export async function loadPlayerState(): Promise<PlayerState> {
  // Web環境ではメモリ内から取得
  if (Platform.OS === "web") {
    return { ...webState };
  }

  const db = getDb();
  if (!db) {
    return { ...DEFAULT_STATE };
  }

  const row = await db.getFirstAsync<{
    level: number;
    current_xp: number;
    total_xp: number;
    last_play_date: string | null;
    adventure_status: string;
  }>("SELECT level, current_xp, total_xp, last_play_date, adventure_status FROM player_state WHERE id = 1");

  if (row) {
    return {
      level: row.level,
      currentXp: row.current_xp,
      totalXp: row.total_xp,
      lastPlayDate: row.last_play_date,
      adventureStatus: row.adventure_status as AdventureStatus,
    };
  }

  return { ...DEFAULT_STATE };
}

// プレイヤー状態を保存
export async function savePlayerState(state: PlayerState): Promise<void> {
  // Web環境ではメモリ内に保存
  if (Platform.OS === "web") {
    webState = { ...state };
    return;
  }

  const db = getDb();
  if (!db) {
    return;
  }

  await db.runAsync(
    "UPDATE player_state SET level = ?, current_xp = ?, total_xp = ?, last_play_date = ?, adventure_status = ? WHERE id = 1",
    state.level,
    state.currentXp,
    state.totalXp,
    state.lastPlayDate,
    state.adventureStatus
  );
}

// 開発用の日付オフセット（翌日スキップ用）
let devDateOffset = 0;

// 今日の日付を取得（YYYY-MM-DD形式）
// 開発用に日付を進めた場合はその日付を返す
export function getTodayDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + devDateOffset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// 新しい1日かどうかをチェック
export function isNewDay(lastPlayDate: string | null): boolean {
  if (!lastPlayDate) return true;
  const today = getTodayDate();
  return lastPlayDate !== today;
}

// ========================================
// 開発者用機能（__DEV__のみ使用）
// ========================================

// 今日の冒険をリセット
export async function resetDailyAdventure(): Promise<void> {
  if (Platform.OS === "web") {
    webState.adventureStatus = "NOT_STARTED";
    webState.lastPlayDate = null;
    return;
  }

  const db = getDb();
  if (!db) return;

  const now = new Date().toISOString();
  await db.runAsync(
    "UPDATE player_state SET adventure_status = ?, last_play_date = ? WHERE id = 1",
    "NOT_STARTED",
    null
  );
  await db.runAsync("DELETE FROM daily_adventure_quests");
  await db.runAsync(
    "UPDATE daily_adventures SET status = ? WHERE date = ?",
    "NOT_STARTED",
    getTodayDate()
  );
}

// レベルをリセット（建物は維持）
export async function resetLevel(): Promise<void> {
  if (Platform.OS === "web") {
    webState.level = 1;
    webState.currentXp = 0;
    webState.totalXp = 0;
    return;
  }

  const db = getDb();
  if (!db) return;

  await db.runAsync(
    "UPDATE player_state SET level = 1, current_xp = 0, total_xp = 0 WHERE id = 1"
  );
}

// 建物をリセット（レベルは維持）
export async function resetBuildings(): Promise<void> {
  if (Platform.OS === "web") {
    clearWebBuildings();
    return;
  }

  const db = getDb();
  if (!db) return;

  await db.runAsync("DELETE FROM buildings");
}

// 全データ削除（初回起動状態へ）
export async function resetAllData(): Promise<void> {
  if (Platform.OS === "web") {
    webState = { ...DEFAULT_STATE };
    clearWebBuildings();
    return;
  }

  const db = getDb();
  if (!db) return;

  // テーブルを空にする（DROP TABLEはしない）
  await db.runAsync("DELETE FROM buildings");
  await db.runAsync("DELETE FROM daily_adventure_quests");
  await db.runAsync("DELETE FROM daily_adventures");
  await db.runAsync(
    "UPDATE player_state SET level = 1, current_xp = 0, total_xp = 0, last_play_date = NULL, adventure_status = 'NOT_STARTED' WHERE id = 1"
  );
}

// 翌日にスキップ（開発者用）
export async function skipToNextDay(): Promise<void> {
  // 開発用の日付を1日進める
  devDateOffset += 1;
  const nextDay = getTodayDate();

  if (Platform.OS === "web") {
    webState.lastPlayDate = nextDay;
    webState.adventureStatus = "NOT_STARTED";
    return;
  }

  const db = getDb();
  if (!db) return;

  // プレイヤー状態を翌日扱いに更新
  await db.runAsync(
    "UPDATE player_state SET last_play_date = ?, adventure_status = 'NOT_STARTED' WHERE id = 1",
    nextDay
  );

  // 今日の冒険をリセット
  await db.runAsync("DELETE FROM daily_adventure_quests");
  await db.runAsync(
    "UPDATE daily_adventures SET status = 'NOT_STARTED' WHERE date = ?",
    getTodayDate()
  );
}

// デバッグ情報を取得
export async function getDebugInfo(): Promise<{
  level: number;
  currentXp: number;
  totalXp: number;
  lastPlayDate: string | null;
  adventureStatus: AdventureStatus;
  buildingCount: number;
}> {
  const state = await loadPlayerState();

  let buildingCount = 0;
  if (Platform.OS === "web") {
    const built = await getBuiltBuildings();
    buildingCount = built.length;
  } else {
    const db = getDb();
    if (db) {
      const result = await db.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM buildings"
      );
      buildingCount = result?.count ?? 0;
    }
  }

  return {
    level: state.level,
    currentXp: state.currentXp,
    totalXp: state.totalXp,
    lastPlayDate: state.lastPlayDate,
    adventureStatus: state.adventureStatus,
    buildingCount,
  };
}