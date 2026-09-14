// Migration V4
// adventure_diaries テーブル作成

import * as SQLite from "expo-sqlite";

export async function migrateToV4(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS adventure_diaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      quest_data TEXT,
      earned_xp INTEGER DEFAULT 0,
      built_building_id TEXT,
      diary_text TEXT,
      created_at TEXT
    );
  `);
}