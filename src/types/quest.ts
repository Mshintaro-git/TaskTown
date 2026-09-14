// クエスト関連の型定義

// クエストの種類
export type QuestType = "recommended" | "custom";

// おすすめクエスト（マスターデータ）
// title / description は言語別（ja / en）で保持
export type RecommendedQuest = {
  id: string;
  title: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  icon: string;
};

// 今日選択されたクエスト
export type PlayerQuest = {
  id: string;
  title: string;
  type: QuestType;
  xp: number;
  completed: boolean;
  selectedAt: string;
  completedAt?: string;
};

// XP履歴
export type XPHistory = {
  id: string;
  amount: number;
  reason: string;
  date: string;
};

// クエスト画面の状態
export type QuestScreenState = "selecting" | "executing";