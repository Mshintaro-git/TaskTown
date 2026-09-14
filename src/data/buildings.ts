import { BuildingType } from "../types";

// 建物マスターデータ（後でSQLiteに移行可能）
export const BUILDINGS: Record<string, BuildingType> = {
  tent: {
    id: "tent",
    name: "テント",
    description: "冒険の始まりにぴったりの簡易テント。",
    icon: "⛺",
    xp: 10,
  },
  tree: {
    id: "tree",
    name: "大きな木",
    description: "街のシンボルになる立派な大木。",
    icon: "🌳",
    xp: 15,
  },
  flower: {
    id: "flower",
    name: "花畑",
    description: "色とりどりの花が咲き誇る美しい花畑。",
    icon: "🌸",
    xp: 20,
  },
  farm: {
    id: "farm",
    name: "畑",
    description: "新鮮な野菜が育つ小さな畑。",
    icon: "🌾",
    xp: 25,
  },
  small_house: {
    id: "small_house",
    name: "小さな家",
    description: "温かみのある木造の小さな家。",
    icon: "🏠",
    xp: 30,
  },
  bakery: {
    id: "bakery",
    name: "パン屋",
    description: "焼きたてパンの香りが漂う人気のパン屋。",
    icon: "🥖",
    xp: 40,
  },
  park: {
    id: "park",
    name: "公園",
    description: "住民の憩いの場になる小さな公園。",
    icon: "🌲",
    xp: 50,
  },
  library: {
    id: "library",
    name: "図書館",
    description: "知識の宝庫。静かに本を読める空間。",
    icon: "📚",
    xp: 60,
  },
  plaza: {
    id: "plaza",
    name: "広場",
    description: "街の中心。イベントが開かれる賑やかな広場。",
    icon: "⛲",
    xp: 80,
  },
  clock_tower: {
    id: "clock_tower",
    name: "時計台",
    description: "街のシンボル。時間を知らせる美しい時計台。",
    icon: "🕰",
    xp: 100,
  },
};

// 建物一覧を配列で取得（表示順）
export const BUILDING_LIST: BuildingType[] = Object.values(BUILDINGS);