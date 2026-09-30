// BuildingMaster
// 建物のマスターデータ

export type BuildingCategory =
  | "nature"
  | "residential"
  | "commercial"
  | "culture"
  | "landmark";

export type BuildingRarity = "COMMON" | "RARE" | "EPIC";

export type BuildingMaster = {
  id: string;
  nameJa: string;
  nameEn: string;
  descriptionJa: string;
  descriptionEn: string;
  unlockLevel: number;
  icon: string;
  image: string | null;
  category: BuildingCategory;
  rarity: BuildingRarity;
  premium: boolean;
};

// 建物マスターデータ
export const BUILDINGS: BuildingMaster[] = [
  // ─── Free Buildings ──────────────────────────────────────────────────────

  {
    id: "tent",
    nameJa: "テント",
    nameEn: "Tent",
    descriptionJa: "街で最初の住まい",
    descriptionEn: "The first home in town",
    unlockLevel: 1,
    icon: "⛺",
    image: null,
    category: "residential",
    rarity: "COMMON",
    premium: false,
  },

  {
    id: "tree",
    nameJa: "木",
    nameEn: "Tree",
    descriptionJa: "街を緑化する",
    descriptionEn: "Greens up the town",
    unlockLevel: 1,
    icon: "🌳",
    image: null,
    category: "nature",
    rarity: "COMMON",
    premium: false,
  },

  {
    id: "flower_field",
    nameJa: "花畑",
    nameEn: "Flower Garden",
    descriptionJa: "色と香りの庭園",
    descriptionEn: "A garden of color and fragrance",
    unlockLevel: 1,
    icon: "🌸",
    image: null,
    category: "nature",
    rarity: "COMMON",
    premium: false,
  },

  {
    id: "farm",
    nameJa: "畑",
    nameEn: "Farm",
    descriptionJa: "食材を栽培する場所",
    descriptionEn: "A place to grow food",
    unlockLevel: 1,
    icon: "🌾",
    image: null,
    category: "commercial",
    rarity: "COMMON",
    premium: false,
  },

  {
    id: "small_house",
    nameJa: "小さな家",
    nameEn: "Small House",
    descriptionJa: "くつろげる居心地のいい部屋",
    descriptionEn: "A cozy and comfortable room",
    unlockLevel: 1,
    icon: "🏠",
    image: null,
    category: "residential",
    rarity: "COMMON",
    premium: false,
  },

  {
    id: "bakery",
    nameJa: "パン屋",
    nameEn: "Bakery",
    descriptionJa: "ふわふわのパンが焼ける",
    descriptionEn: "Fresh fluffy bread is baked here",
    unlockLevel: 1,
    icon: "🍞",
    image: null,
    category: "commercial",
    rarity: "COMMON",
    premium: false,
  },

  {
    id: "park",
    nameJa: "公園",
    nameEn: "Park",
    descriptionJa: "みんなで遊ぶ場所",
    descriptionEn: "A place for everyone to play",
    unlockLevel: 1,
    icon: "🌳",
    image: null,
    category: "nature",
    rarity: "COMMON",
    premium: false,
  },

  {
    id: "library",
    nameJa: "図書館",
    nameEn: "Library",
    descriptionJa: "知識の宝庫",
    descriptionEn: "A treasure trove of knowledge",
    unlockLevel: 1,
    icon: "📚",
    image: null,
    category: "culture",
    rarity: "COMMON",
    premium: false,
  },

  {
    id: "plaza",
    nameJa: "広場",
    nameEn: "Plaza",
    descriptionJa: "街の中心",
    descriptionEn: "The heart of the town",
    unlockLevel: 1,
    icon: "🏛️",
    image: null,
    category: "landmark",
    rarity: "COMMON",
    premium: false,
  },

  {
    id: "clock_tower",
    nameJa: "時計塔",
    nameEn: "Clock Tower",
    descriptionJa: "街のランドマーク",
    descriptionEn: "A landmark of the town",
    unlockLevel: 1,
    icon: "🕐",
    image: null,
    category: "landmark",
    rarity: "COMMON",
    premium: false,
  },

  // ─── Premium Buildings ───────────────────────────────────────────────────

  {
    id: "cafe",
    nameJa: "カフェ",
    nameEn: "Cafe",
    descriptionJa: "街角でひと息つける憩いの場",
    descriptionEn: "A cozy place to relax with a cup of coffee",
    unlockLevel: 1,
    icon: "☕",
    image: null,
    category: "commercial",
    rarity: "RARE",
    premium: true,
  },

  {
    id: "onsen",
    nameJa: "温泉",
    nameEn: "Hot Spring",
    descriptionJa: "ゆったり癒やされる小さな温泉",
    descriptionEn: "A small hot spring for peaceful relaxation",
    unlockLevel: 1,
    icon: "♨️",
    image: null,
    category: "culture",
    rarity: "RARE",
    premium: true,
  },

  {
    id: "observatory",
    nameJa: "天文台",
    nameEn: "Observatory",
    descriptionJa: "星空を眺める静かな天文台",
    descriptionEn: "A quiet observatory for gazing at the stars",
    unlockLevel: 1,
    icon: "🔭",
    image: null,
    category: "landmark",
    rarity: "EPIC",
    premium: true,
  },
];

// IDから建物を取得
export function getBuildingById(id: string): BuildingMaster | undefined {
  return BUILDINGS.find((b) => b.id === id);
}

// 全建物を取得
export function getAllBuildings(): BuildingMaster[] {
  return [...BUILDINGS];
}

// レベル別建物選択肢
// 各レベルで3つの建物候補を固定で定義
// ※ Premium建物はここには追加しない
export const LevelBuildingChoices: Record<number, string[]> = {
  1: [], // Lv1は建物なし
  2: ["tent", "tree", "flower_field"],
  3: ["farm", "small_house", "tree"],
  4: ["bakery", "flower_field", "park"],
  5: ["park", "library", "small_house"],
  6: ["library", "plaza", "bakery"],
  7: ["plaza", "clock_tower", "park"],
  8: ["clock_tower", "library", "plaza"],
  9: [], // 後日追加予定
  10: [], // 後日追加予定
};
