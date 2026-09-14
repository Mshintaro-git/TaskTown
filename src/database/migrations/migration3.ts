// Migration V3
// buildings テーブル作成

import * as SQLite from "expo-sqlite";

export async function migrateToV3(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS buildings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      building_id TEXT NOT NULL UNIQUE,
      slot_number INTEGER NOT NULL,
      built_at TEXT,
      created_at TEXT,
      updated_at TEXT
    );
  `);
}