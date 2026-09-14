// レベルサービス
// XP加算・レベルアップ判定・持ち越しを管理

import { getNextRequiredXp, MAX_LEVEL } from "../constants/levels";
import { loadPlayerState, savePlayerState, PlayerState } from "./databaseService";

// レベルアップ時のコールバック
type LevelUpCallback = (newLevel: number, oldLevel: number) => void;

let onLevelUp: LevelUpCallback | null = null;

// レベルアップコールバックを登録
export function setOnLevelUp(callback: LevelUpCallback): void {
  onLevelUp = callback;
}

// プレイヤー状態を読み込み
export async function loadState(): Promise<PlayerState> {
  return await loadPlayerState();
}

// XPを追加（レベルアップ判定・持ち越し処理含む）
export async function addXP(amount: number): Promise<{
  state: PlayerState;
  leveledUp: boolean;
  newLevel?: number;
}> {
  const state = await loadPlayerState();
  let { level, currentXp, totalXp } = state;

  // 累計XPを加算
  totalXp += amount;
  currentXp += amount;

  let leveledUp = false;
  let newLevel: number | undefined;

  // レベルアップ判定（最大レベルまで）
  while (level < MAX_LEVEL) {
    const nextRequired = getNextRequiredXp(level);
    if (currentXp >= nextRequired) {
      // レベルアップ！
      const oldLevel = level;
      level++;
      currentXp -= nextRequired;
      leveledUp = true;
      newLevel = level;

      // コールバックを呼ぶ
      if (onLevelUp) {
        onLevelUp(level, oldLevel);
      }
    } else {
      break;
    }
  }

  // 最大レベルに達したらXPを0に
  if (level >= MAX_LEVEL) {
    currentXp = 0;
  }

  // 現在の状態からlastPlayDateとadventureStatusを維持
  const newState: PlayerState = {
    level,
    currentXp,
    totalXp,
    lastPlayDate: state.lastPlayDate,
    adventureStatus: state.adventureStatus,
  };

  // DBに保存
  await savePlayerState(newState);

  return { state: newState, leveledUp, newLevel };
}