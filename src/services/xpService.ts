import { XPHistory } from "../types/quest";

// XPサービス（後でSQLiteに移行可能）
// 現在はメモリ内で管理、後でSQLiteに切り替え

// XP履歴（メモリ内）
let xpHistory: XPHistory[] = [];

// 現在の合計XP
let currentXP = 0;

// XPを追加する
export function addXP(amount: number, reason: string): XPHistory {
  const history: XPHistory = {
    id: `xp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    amount,
    reason,
    date: new Date().toISOString(),
  };

  xpHistory.push(history);
  currentXP += amount;

  return history;
}

// 現在の合計XPを取得
export function getCurrentXP(): number {
  return currentXP;
}

// XP履歴を取得
export function getXPHistory(): XPHistory[] {
  return [...xpHistory];
}

// XP履歴をクリア（テスト用）
export function clearXPHistory(): void {
  xpHistory = [];
  currentXP = 0;
}