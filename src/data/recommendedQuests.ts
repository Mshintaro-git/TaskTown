import { RecommendedQuest } from "../types/quest";

// おすすめクエストマスターデータ（後でSQLiteに移行可能）
// title / description は言語別（ja / en）で保持
export const RECOMMENDED_QUESTS: RecommendedQuest[] = [
  {
    id: "walk_1000",
    title: {
      ja: "1000歩歩く",
      en: "Walk 1000 Steps",
    },
    description: {
      ja: "外に出て少し歩いてみよう",
      en: "Go outside and take a short walk",
    },
    icon: "🚶",
  },
  {
    id: "read_book",
    title: {
      ja: "本を読む",
      en: "Read a Book",
    },
    description: {
      ja: "10ページでも良いから本を開こう",
      en: "Open a book, even just 10 pages",
    },
    icon: "📖",
  },
  {
    id: "cleaning",
    title: {
      ja: "掃除する",
      en: "Clean Your Room",
    },
    description: {
      ja: "部屋を少し綺麗にしよう",
      en: "Tidy up your room a little",
    },
    icon: "🧹",
  },
  {
    id: "stretching",
    title: {
      ja: "ストレッチする",
      en: "Exercise",
    },
    description: {
      ja: "体を伸ばしてリフレッシュ",
      en: "Stretch your body and refresh",
    },
    icon: "🤸",
  },
  {
    id: "cooking",
    title: {
      ja: "料理する",
      en: "Cook a Meal",
    },
    description: {
      ja: "手作りご飯で心も豊かに",
      en: "A homemade meal nourishes the heart",
    },
    icon: "🍳",
  },
  {
    id: "drink_water",
    title: {
      ja: "水を飲む",
      en: "Drink Water",
    },
    description: {
      ja: "コップ1杯の水をしっかり飲もう",
      en: "Drink a full glass of water",
    },
    icon: "💧",
  },
  {
    id: "write_diary",
    title: {
      ja: "日記を書く",
      en: "Write a Diary",
    },
    description: {
      ja: "今日の出来事を振り返ろう",
      en: "Reflect on today's events",
    },
    icon: "✍",
  },
  {
    id: "early_sleep",
    title: {
      ja: "早く寝る",
      en: "Sleep Early",
    },
    description: {
      ja: "今日は早めに休もう",
      en: "Rest early today",
    },
    icon: "😴",
  },
];