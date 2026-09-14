// Migration V1
// 初期スキーマ: player_state テーブル作成

import * as SQLite from "expo-sqlite";

export async function migrateToV1(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS player_state (
      id INTEGER PRIMARY KEY DEFAULT 1,
      level INTEGER NOT NULL DEFAULT 1,
      current_xp INTEGER NOT NULL DEFAULT 0,
      total_xp INTEGER NOT NULL DEFAULT 0,
      last_play_date TEXT,
      adventure_status TEXT DEFAULT 'NOT_STARTED'
    );
  `);

  // 初期データ挿入
  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) as count FROM player_state"
  );
  if (result?.count === 0) {
    await db.runAsync(
      "INSERT INTO player_state (id, level, current_xp, total_xp, last_play_date, adventure_status) VALUES (1, 1, 0, 0, NULL, 'NOT_STARTED')"
    );
  }
}