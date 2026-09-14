// Migration Runner
// データベースのバージョン管理とマイグレーション実行

import * as SQLite from "expo-sqlite";
import { migrateToV1 } from "./migration1";
import { migrateToV2 } from "./migration2";
import { migrateToV3 } from "./migration3";
import { migrateToV4 } from "./migration4";

// 現在のデータベースバージョン
export const DATABASE_VERSION = 4;

// マイグレーション関数のマッピング
const migrations: Record<number, (db: SQLite.SQLiteDatabase) => Promise<void>> = {
  1: migrateToV1,
  2: migrateToV2,
  3: migrateToV3,
  4: migrateToV4,
};

// データベースバージョンを取得
async function getDbVersion(db: SQLite.SQLiteDatabase): Promise<number> {
  try {
    const result = await db.getFirstAsync<{ version: number }>(
      "SELECT value as version FROM meta WHERE key = 'version'"
    );
    return result?.version ?? 0;
  } catch {
    // metaテーブルが存在しない場合はV0
    return 0;
  }
}

// データベースバージョンを設定
async function setDbVersion(db: SQLite.SQLiteDatabase, version: number): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value INTEGER
    );
  `);
  await db.runAsync(
    "INSERT OR REPLACE INTO meta (key, value) VALUES ('version', ?)",
    version
  );
}

// マイグレーションを実行
export async function runMigrations(db: SQLite.SQLiteDatabase): Promise<void> {
  // metaテーブルを作成（バージョン管理用）
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value INTEGER
    );
  `);

  const currentVersion = await getDbVersion(db);

  // 必要なマイグレーションを順次実行
  for (let v = currentVersion + 1; v <= DATABASE_VERSION; v++) {
    const migration = migrations[v];
    if (migration) {
      await migration(db);
      await setDbVersion(db, v);
    }
  }
}