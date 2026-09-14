// データベース初期化エントリーポイント
// Migrationシステムを使用してDBを初期化

import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { runMigrations, DATABASE_VERSION } from "./migrations";
import { getAllSchemas } from "./schema";

// データベースインスタンス
let db: SQLite.SQLiteDatabase | null = null;

// Web用メモリ内ストレージ
let webState: Record<string, any> = {};

// データベースを初期化
export async function initDatabase(): Promise<void> {
  // Web環境ではSQLiteをスキップ
  if (Platform.OS === "web") {
    return;
  }

  try {
    db = await SQLite.openDatabaseAsync("dailytownrpg.db");

    // マイグレーションを実行
    await runMigrations(db);
  } catch (e) {
    console.warn("SQLite init failed, using in-memory storage:", e);
  }
}

// データベースインスタンスを取得
export function getDb(): SQLite.SQLiteDatabase | null {
  return db;
}

// データベースバージョンを取得
export function getDatabaseVersion(): number {
  return DATABASE_VERSION;
}

// Web用メモリ内ストレージの操作
export function getWebState(): Record<string, any> {
  return webState;
}

export function setWebState(state: Record<string, any>): void {
  webState = { ...state };
}