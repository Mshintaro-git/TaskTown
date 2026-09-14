// データベーススキーマ定義
// 最新版（V2）のスキーマを定義

// player_state テーブル
export const PLAYER_STATE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS player_state (
    id INTEGER PRIMARY KEY DEFAULT 1,
    level INTEGER NOT NULL DEFAULT 1,
    current_xp INTEGER NOT NULL DEFAULT 0,
    total_xp INTEGER NOT NULL DEFAULT 0,
    last_play_date TEXT,
    adventure_status TEXT DEFAULT 'NOT_STARTED',
    created_at TEXT,
    updated_at TEXT
  );
`;

// daily_adventures テーブル
export const DAILY_ADVENTURES_SCHEMA = `
  CREATE TABLE IF NOT EXISTS daily_adventures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    status TEXT DEFAULT 'NOT_STARTED',
    created_at TEXT,
    updated_at TEXT
  );
`;

// daily_adventure_quests テーブル
export const DAILY_ADVENTURE_QUESTS_SCHEMA = `
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
`;

// buildings テーブル
export const BUILDINGS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS buildings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    building_id TEXT NOT NULL UNIQUE,
    slot_number INTEGER NOT NULL,
    built_at TEXT,
    created_at TEXT,
    updated_at TEXT
  );
`;

// adventure_diaries テーブル
export const ADVENTURE_DIARIES_SCHEMA = `
  CREATE TABLE IF NOT EXISTS adventure_diaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    quest_data TEXT,
    earned_xp INTEGER DEFAULT 0,
    built_building_id TEXT,
    diary_text TEXT,
    created_at TEXT
  );
`;

// meta テーブル（バージョン管理用）
export const META_SCHEMA = `
  CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value INTEGER
  );
`;

// 全スキーマを取得（新規DB作成用）
export function getAllSchemas(): string[] {
  return [
    PLAYER_STATE_SCHEMA,
    DAILY_ADVENTURES_SCHEMA,
    DAILY_ADVENTURE_QUESTS_SCHEMA,
    BUILDINGS_SCHEMA,
    ADVENTURE_DIARIES_SCHEMA,
    META_SCHEMA,
  ];
}