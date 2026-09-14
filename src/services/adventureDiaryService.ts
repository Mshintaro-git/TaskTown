// 冒険日記サービス
// 日記生成・保存・取得

import { Platform } from "react-native";
import { getDb } from "../database";
import { getBuildingById } from "../constants/buildings";
import { getTodayDate as getCurrentDate } from "./databaseService";
import { isEnglish } from "../utils/language";

// 冒険日記の型
export type AdventureDiary = {
  id: number;
  date: string;
  questData: string;
  earnedXp: number;
  builtBuildingId: string | null;
  diaryText: string;
  createdAt: string;
};

// Web用メモリ内日記データ
let webDiaries: AdventureDiary[] = [];

// 今日の日記を取得
export async function getTodayDiary(): Promise<AdventureDiary | null> {
  const today = getCurrentDate();
  return getDiaryByDate(today);
}

// 日付から日記を取得
export async function getDiaryByDate(date: string): Promise<AdventureDiary | null> {
  if (Platform.OS === "web") {
    return webDiaries.find((d) => d.date === date) ?? null;
  }

  const db = getDb();
  if (!db) return null;

  const row = await db.getFirstAsync<{
    id: number;
    date: string;
    quest_data: string;
    earned_xp: number;
    built_building_id: string | null;
    diary_text: string;
    created_at: string;
  }>("SELECT * FROM adventure_diaries WHERE date = ?", date);

  if (!row) return null;

  return {
    id: row.id,
    date: row.date,
    questData: row.quest_data,
    earnedXp: row.earned_xp,
    builtBuildingId: row.built_building_id,
    diaryText: row.diary_text,
    createdAt: row.created_at,
  };
}

// 日記を生成（テンプレート方式・言語対応）
export async function generateDiary(
  questTitles: string[],
  earnedXp: number,
  builtBuildingId: string | null,
  currentLevel: number
): Promise<string> {
  const questCount = questTitles.length;
  const questList = questTitles.map((q) => `・${q}`).join("\n");

  // 言語判定（英語端末・その他言語は英語、日本語端末は日本語）
  // isEnglish は utils/language.ts から import 済み

  // 建物情報
  let buildingText = "";
  if (builtBuildingId) {
    const building = getBuildingById(builtBuildingId);
    if (building) {
      const buildingName = isEnglish ? building.nameEn : building.nameJa;
      if (isEnglish) {
        buildingText = `\n\n${buildingName} was built in your town.`;
      } else {
        buildingText = `\n\nあなたの努力によって、街には新しい建物「${buildingName}」が完成した。`;
      }
    }
  } else {
    if (isEnglish) {
      buildingText = "\n\nYour town did not change today, but it was a day to prepare for the future.";
    } else {
      buildingText = "\n\n今日は街に変化はなかったが、未来への準備となる一日だった。";
    }
  }

  // テンプレート生成（言語別）
  let diaryText: string;
  if (isEnglish) {
    diaryText = `Today, you completed ${questCount} small adventures.
${questList}

You earned ${earnedXp} XP.${buildingText}

Every small step leads to a bigger and brighter town.`;
  } else {
    diaryText = `今日、あなたは${questCount}つの小さな冒険を乗り越えた。
${questList}

${earnedXp}XPを獲得し、合計${earnedXp}XPの経験を積んだ。${buildingText}

小さな一歩が、未来の大きな街づくりにつながっている。`;
  }

  return diaryText;
}

// 日記を保存
export async function saveDiary(
  date: string,
  questData: string,
  earnedXp: number,
  builtBuildingId: string | null,
  diaryText: string
): Promise<void> {
  const now = new Date().toISOString();

  if (Platform.OS === "web") {
    const newDiary: AdventureDiary = {
      id: webDiaries.length + 1,
      date,
      questData,
      earnedXp,
      builtBuildingId,
      diaryText,
      createdAt: now,
    };
    webDiaries.push(newDiary);
    return;
  }

  const db = getDb();
  if (!db) return;

  await db.runAsync(
    `INSERT OR REPLACE INTO adventure_diaries 
     (date, quest_data, earned_xp, built_building_id, diary_text, created_at) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    date,
    questData,
    earnedXp,
    builtBuildingId,
    diaryText,
    now
  );
}

// 過去の日記一覧を取得
export async function getPastDiaries(): Promise<AdventureDiary[]> {
  if (Platform.OS === "web") {
    return [...webDiaries].sort((a, b) => b.date.localeCompare(a.date));
  }

  const db = getDb();
  if (!db) return [];

  const rows = await db.getAllAsync<{
    id: number;
    date: string;
    quest_data: string;
    earned_xp: number;
    built_building_id: string | null;
    diary_text: string;
    created_at: string;
  }>("SELECT * FROM adventure_diaries ORDER BY date DESC");

  return rows.map((row) => ({
    id: row.id,
    date: row.date,
    questData: row.quest_data,
    earnedXp: row.earned_xp,
    builtBuildingId: row.built_building_id,
    diaryText: row.diary_text,
    createdAt: row.created_at,
  }));
}

// 日記が存在するかチェック
export async function hasDiaryForDate(date: string): Promise<boolean> {
  const diary = await getDiaryByDate(date);
  return diary !== null;
}

// Web用メモリ内日記データをクリア（開発者用）
export function clearWebDiaries(): void {
  webDiaries = [];
}
