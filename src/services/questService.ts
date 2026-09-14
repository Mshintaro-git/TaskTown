import { PlayerQuest, QuestType } from "../types/quest";
import { AdventureStatus, getTodayDate, isNewDay, loadPlayerState, savePlayerState } from "./databaseService";
import { generateDiary, saveDiary, hasDiaryForDate } from "./adventureDiaryService";
import { getPlayerBuildings } from "./buildingService";

// クエストサービス（後でSQLiteに移行可能）
// 現在はメモリ内で管理

// 1クエストあたりの固定XP
export const QUEST_XP = 30;

// 1日に選択できる最大クエスト数
export const MAX_QUESTS = 3;

// 今日選択されたクエスト（メモリ内）
let todayQuests: PlayerQuest[] = [];

// ユニークIDを生成
function generateId(): string {
  return `quest_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// おすすめクエストからPlayerQuestを作成
export function createQuestFromRecommended(
  questId: string,
  title: string
): PlayerQuest {
  return {
    id: generateId(),
    title,
    type: "recommended" as QuestType,
    xp: QUEST_XP,
    completed: false,
    selectedAt: new Date().toISOString(),
  };
}

// 自作クエストからPlayerQuestを作成
export function createCustomQuest(title: string): PlayerQuest {
  return {
    id: generateId(),
    title,
    type: "custom" as QuestType,
    xp: QUEST_XP,
    completed: false,
    selectedAt: new Date().toISOString(),
  };
}

// クエストを追加（最大3つまで）
export function addQuest(quest: PlayerQuest): boolean {
  if (todayQuests.length >= MAX_QUESTS) {
    return false;
  }
  todayQuests.push(quest);
  return true;
}

// クエストを削除
export function removeQuest(questId: string): void {
  todayQuests = todayQuests.filter((q) => q.id !== questId);
}

// クエストを達成（XPの追加は呼び出し元で行う）
export function completeQuest(questId: string): PlayerQuest | null {
  const quest = todayQuests.find((q) => q.id === questId);
  if (!quest || quest.completed) {
    return null;
  }

  quest.completed = true;
  quest.completedAt = new Date().toISOString();

  return quest;
}

// 今日のクエスト一覧を取得
export function getTodayQuests(): PlayerQuest[] {
  return [...todayQuests];
}

// 選択されたクエスト数を取得
export function getQuestCount(): number {
  return todayQuests.length;
}

// 全てのクエストをクリア（新しい1日用）
export function clearTodayQuests(): void {
  todayQuests = [];
}

// 全て達成されているか確認
export function allQuestsCompleted(): boolean {
  if (todayQuests.length === 0) return false;
  return todayQuests.every((q) => q.completed);
}

// 冒険を開始（状態をIN_PROGRESSに変更）
export async function startAdventure(): Promise<void> {
  const state = await loadPlayerState();
  state.adventureStatus = "IN_PROGRESS";
  state.lastPlayDate = getTodayDate();
  await savePlayerState(state);
}

// 冒険を中止（状態をTERMINATEDにしてその日のクエストを終了）
// 達成済みクエストのXPは既に付与済みのため、XP処理は行わない（二重付与防止）
// TERMINATED状態のため、その日は再びクエストを受注できない
export async function abortAdventure(): Promise<void> {
  const state = await loadPlayerState();
  state.adventureStatus = "TERMINATED";
  state.lastPlayDate = getTodayDate();
  await savePlayerState(state);

  // 現在のクエストを終了
  clearTodayQuests();
}

// 冒険を完了（状態をCOMPLETEDに変更）＋日記生成
export async function completeAdventure(): Promise<void> {
  const state = await loadPlayerState();
  state.adventureStatus = "COMPLETED";
  state.lastPlayDate = getTodayDate();
  await savePlayerState(state);

  // 日記を生成（重複チェック付き）
  // エラーが発生しても冒険完了は維持する
  try {
    await generateAndSaveDiary();
  } catch (e) {
    console.warn("Diary generation failed:", e);
  }
}

// 日記を生成して保存
export async function generateAndSaveDiary(): Promise<void> {
  const today = getTodayDate();

  // 既に今日の日記が存在する場合は生成しない
  const exists = await hasDiaryForDate(today);
  if (exists) {
    return;
  }

  // クエスト情報を取得
  const quests = getTodayQuests();
  if (quests.length === 0) {
    return; // クエストがない場合は日記を生成しない
  }

  const questTitles = quests.map((q) => q.title);
  const earnedXp = quests.reduce((sum, q) => sum + q.xp, 0);

  // 建築情報を取得（今日建築された建物）
  let builtBuildingId: string | null = null;
  try {
    const buildings = await getPlayerBuildings();
    const todayBuildings = buildings.filter((b) => {
      const builtDate = new Date(b.builtAt).toISOString().split('T')[0];
      return builtDate === today;
    });
    builtBuildingId = todayBuildings.length > 0 ? todayBuildings[0].buildingId : null;
  } catch (e) {
    console.warn("Building info fetch failed:", e);
  }

  // 現在レベルを取得
  const state = await loadPlayerState();
  const currentLevel = state.level;

  // 日記を生成
  const diaryText = await generateDiary(questTitles, earnedXp, builtBuildingId, currentLevel);

  // 日記を保存
  const questData = questTitles.join("\n");
  await saveDiary(today, questData, earnedXp, builtBuildingId, diaryText);
}

// 冒険状態を取得
export async function getAdventureStatus(): Promise<AdventureStatus> {
  const state = await loadPlayerState();
  return state.adventureStatus;
}

// 新しい1日かチェックし、必要ならリセット
export async function checkAndResetDaily(): Promise<AdventureStatus> {
  const state = await loadPlayerState();

  if (isNewDay(state.lastPlayDate)) {
    // 新しい1日なのでリセット
    state.adventureStatus = "NOT_STARTED";
    state.lastPlayDate = getTodayDate();
    await savePlayerState(state);
    clearTodayQuests();
    return "NOT_STARTED";
  }

  return state.adventureStatus;
}