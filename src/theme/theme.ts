// アプリ全体のデザインテーマ
// Figma デザイン「ToDo Town RPG」を参考にした、
// あたたかみのあるパステル・RPGタウン風のテーマ設定

export const colors = {
  // 背景
  background: "#f5ede0",
  backgroundGradientTop: "#e8d8c4",
  backgroundGradientBottom: "#f0e4d0",
  card: "#fffaf2",
  cardAlt: "#fdf6ec",
  border: "#e8d8c4",

  // テキスト
  foreground: "#4a3728",
  textSecondary: "#8a7060",
  textMuted: "#a89684",
  onPrimary: "#ffffff",

  // ブランドカラー
  primary: "#5a8a4a",
  primaryLight: "#7aba6a",
  primarySoft: "#c4e8a0",
  primarySurface: "rgba(122, 186, 106, 0.12)",

  secondary: "#c4956a",
  secondarySurface: "rgba(196, 149, 106, 0.15)",

  accent: "#89bdd3",
  accentDark: "#5a9ab5",
  accentSurface: "rgba(137, 189, 211, 0.15)",

  gold: "#e8c56a",
  goldDark: "#d4a030",
  goldSurface: "#fff8e8",

  danger: "#c47a5a",
  dangerSurface: "rgba(196, 122, 90, 0.15)",

  muted: "#efe3d2",
  overlay: "rgba(74, 55, 40, 0.55)",

  // 空・草・道（街シーン用）
  sky: "#c8e8f8",
  skyLight: "#e8f4fc",
  grassLight: "#d4eabc",
  grass: "#a8d878",
  grassDark: "#6aaa5a",
  path: "#d4b890",
} as const;

export const fonts = {
  display: "Fredoka_700Bold",
  displaySemiBold: "Fredoka_600SemiBold",
  bodyRegular: "Nunito_400Regular",
  bodySemiBold: "Nunito_600SemiBold",
  bodyBold: "Nunito_700Bold",
  bodyExtraBold: "Nunito_800ExtraBold",
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const shadow = {
  card: {
    shadowColor: "#4a3728",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  soft: {
    shadowColor: "#4a3728",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
} as const;
