// Migration V2
// player_stateに created_at, updated_at を追加
// daily_adventures テーブル作成
// daily_adventure_quests テーブル作成
// last_play_date, adventure_status を daily_adventures へ移行

import * as SQLite from "expo-sqlite";
import { getTodayDate } from "../../services/databaseService";

export async function migrateToV2(db: SQLite.SQLiteDatabase): Promise<void> {
  // 1. player_state に created_at, updated_at を追加
  await db.runAsync("ALTER TABLE player_state ADD COLUMN created_at TEXT");
  await db.runAsync("ALTER TABLE player_state ADD COLUMN updated_at TEXT");

  // 2. daily_adventures テーブル作成
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS daily_adventures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      status TEXT DEFAULT 'NOT_STARTED',
      created_at TEXT,
      updated_at TEXT
    );
  `);

  // 3. daily_adventure_quests テーブル作成
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS daily_adventure_quests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      adventure_id INTEGER NOT NULL,
      quest_id TEXT,
      title TEXT NOT NULL,
      xp INTEGER NOT NULL DEFAULT 30,
      completed INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT,
      FOREIGN KEY (adventure_id) REFERENCES daily_adventures(id)
    );
  `);

  // 4. player_state の last_play_date, adventure_status を daily_adventures へ移行
  const playerRow = await db.getFirstAsync<{
    last_play_date: string | null;
    adventure_status: string;
  }>("SELECT last_play_date, adventure_status FROM player_state WHERE id = 1");

  if (playerRow && playerRow.last_play_date) {
    const now = new Date().toISOString();
    await db.runAsync(
      "INSERT OR IGNORE INTO daily_adventures (date, status, created_at, updated_at) VALUES (?, ?, ?, ?)",
      playerRow.last_play_date,
      playerRow.adventure_status,
      now,
      now
    );
  }

  // 5. created_at, updated_at を player_state に設定
  const now = new Date().toISOString();
  await db.runAsync(
    "UPDATE player_state SET created_at = ?, updated_at = ? WHERE id = 1",
    now,
    now
  );
}