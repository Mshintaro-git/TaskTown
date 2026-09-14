// 共通アイコンコンポーネント集
// Figma デザイン「ToDo Town RPG」のイラストを react-native-svg で再現し、
// アプリ内の絵文字表示をすべて画像素材（SVG）に置き換えるためのライブラリ

import Svg, {
  Path,
  Rect,
  Circle,
  Ellipse,
  Line,
  Polygon,
  G,
} from "react-native-svg";

type IconProps = {
  size?: number;
  color?: string;
};

// ─── ナビゲーション / UI アイコン ─────────────────────────────

export function HomeIcon({ size = 24, color = "#4a3728" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path
        d="M4 13L14 4L24 13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x={7} y={13} width={14} height={11} rx={2} stroke={color} strokeWidth={2} />
      <Rect x={11} y={18} width={6} height={6} rx={1} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

export function MapIcon({ size = 24, color = "#4a3728" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path
        d="M4 6 L10 4 L18 8 L24 6 L24 22 L18 24 L10 20 L4 22 Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <Line x1={10} y1={4} x2={10} y2={20} stroke={color} strokeWidth={1.5} />
      <Line x1={18} y1={8} x2={18} y2={24} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

export function BagIcon({ size = 24, color = "#4a3728" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Rect x={5} y={11} width={18} height={14} rx={4} stroke={color} strokeWidth={2} />
      <Path d="M10 11 Q10 5 14 5 Q18 5 18 11" stroke={color} strokeWidth={2} fill="none" />
      <Line x1={5} y1={17} x2={23} y2={17} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

export function ScrollIcon({ size = 28, color = "#c4956a" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Rect x={5} y={3} width={18} height={22} rx={3} fill="#f0d9b0" stroke={color} strokeWidth={1.5} />
      <Rect x={3} y={3} width={5} height={22} rx={2.5} fill="#e8c9a0" stroke={color} strokeWidth={1} />
      <Rect x={20} y={3} width={5} height={22} rx={2.5} fill="#e8c9a0" stroke={color} strokeWidth={1} />
      <Line x1={10} y1={9} x2={20} y2={9} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={10} y1={13} x2={20} y2={13} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Line x1={10} y1={17} x2={16} y2={17} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function SwordIcon({ size = 28, color = "#6aaac4" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path d="M20 4 L24 8 L12 20 L8 24 L4 24 L4 20 L8 16 Z" fill="#89bdd3" stroke={color} strokeWidth={1.2} />
      <Path d="M20 4 L24 8" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Rect x={11} y={15} width={7} height={3} rx={1} transform="rotate(-45 14 16.5)" fill="#c4956a" />
      <Line x1={4} y1={24} x2={8} y2={20} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function GearIcon({ size = 24, color = "#4a3728" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3.2} stroke={color} strokeWidth={1.8} />
      <Path
        d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.36 5.64l-1.55 1.55M7.19 16.81l-1.55 1.55M18.36 18.36l-1.55-1.55M7.19 7.19L5.64 5.64"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CartIcon({ size = 24, color = "#4a3728" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <Path d="M4 5h3l2.4 13.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L24 9H8" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={23} r={1.6} fill={color} />
      <Circle cx={20} cy={23} r={1.6} fill={color} />
    </Svg>
  );
}

export function CheckIcon({ size = 16, color = "#ffffff" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M2 7l4 4 6-6" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PlusIcon({ size = 18, color = "#5a8a4a" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M10 4v12M4 10h12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function BackIcon({ size = 18, color = "#8a7060" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M5 10h10M5 10l4-4M5 10l4 4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CloseIcon({ size = 20, color = "#8a7060" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path d="M5 5l10 10M15 5L5 15" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function CoinIcon({ size = 16 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Circle cx={8} cy={8} r={7} fill="#e8c56a" />
      <Circle cx={8} cy={8} r={5} fill="#d4a030" />
      <Circle cx={8} cy={8} r={3} fill="#e8c56a" />
    </Svg>
  );
}

export function StarIcon({ size = 16, filled = true }: IconProps & { filled?: boolean }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#e8c56a" : "none"}>
      <Path
        d="M12 2l2.9 6.5 7.1.7-5.2 4.8 1.6 7-6.4-3.7-6.4 3.7 1.6-7L2 9.2l7.1-.7z"
        stroke="#e8c56a"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export function SparkleIcon({ size = 16, color = "#e8c56a" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path d="M8 1l1.8 4 4.2.4-3.1 2.9 1 4.2L8 10.4l-3.9 2.1 1-4.2L2 5.4l4.2-.4z" fill={color} />
    </Svg>
  );
}

export function BookIcon({ size = 22, color = "#5a9ab5" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5c-2-1.4-4.6-2-7-2v14c2.4 0 5 .6 7 2 2-1.4 4.6-2 7-2V3c-2.4 0-5 .6-7 2Z" stroke={color} strokeWidth={1.6} strokeLinejoin="round" fill="#d4eef8" />
      <Line x1={12} y1={5} x2={12} y2={19} stroke={color} strokeWidth={1.4} />
    </Svg>
  );
}

// ─── クエストアイコン ────────────────────────────────────────

export function WalkIcon({ size = 24, color = "#c4956a" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={13} cy={4} r={2} fill={color} />
      <Path d="M11 8l3 2 2 6M14 10l-1 4-4 3M13 14l4 1 2 4" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Path d="M9 9l2-1" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function ReadingIcon({ size = 24, color = "#5a9ab5" }: IconProps) {
  return <BookIcon size={size} color={color} />;
}

export function CleaningIcon({ size = 24, color = "#7aba6a" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 3l6 6-9 9H6v-6z" fill="#c4e8a0" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Line x1={5} y1={21} x2={9} y2={21} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function StretchIcon({ size = 24, color = "#c4956a" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={4} r={2} fill={color} />
      <Path d="M4 9l8-2 8 2M12 7v6M8 21l4-8 4 8" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function CookingIcon({ size = 24, color = "#c47a5a" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12a8 8 0 0 1 16 0z" fill="#f0d9b0" stroke={color} strokeWidth={1.6} />
      <Line x1={2} y1={12} x2={22} y2={12} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Line x1={12} y1={3} x2={12} y2={6} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function WaterDropIcon({ size = 24, color = "#5a9ab5" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2c4 5 7 9 7 13a7 7 0 1 1-14 0c0-4 3-8 7-13Z" fill="#89bdd3" stroke={color} strokeWidth={1.4} />
    </Svg>
  );
}

export function WriteIcon({ size = 24, color = "#c4956a" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 20l1-4 11-11 3 3-11 11-4 1Z" fill="#f0d9b0" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </Svg>
  );
}

export function SleepIcon({ size = 24, color = "#8a7ba0" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 13.5A8 8 0 1 1 10.5 4a6.3 6.3 0 0 0 9.5 9.5Z" fill="#d8c8f0" stroke={color} strokeWidth={1.4} strokeLinejoin="round" />
    </Svg>
  );
}

// クエスト id -> アイコン のマッピング
export function RecommendedQuestIcon({ questId, size = 24 }: { questId: string; size?: number }) {
  switch (questId) {
    case "walk_1000":
      return <WalkIcon size={size} />;
    case "read_book":
      return <ReadingIcon size={size} />;
    case "cleaning":
      return <CleaningIcon size={size} />;
    case "stretching":
      return <StretchIcon size={size} />;
    case "cooking":
      return <CookingIcon size={size} />;
    case "drink_water":
      return <WaterDropIcon size={size} />;
    case "write_diary":
      return <WriteIcon size={size} />;
    case "early_sleep":
      return <SleepIcon size={size} />;
    default:
      return <ScrollIcon size={size} />;
  }
}

// ─── 街のイラスト（雲・道など） ──────────────────────────────

export function CloudIllustration({ width = 100, opacity = 0.85 }: { width?: number; opacity?: number }) {
  const h = width * 0.5;
  return (
    <Svg width={width} height={h} viewBox="0 0 120 60" fill="none">
      <Ellipse cx={55} cy={38} rx={40} ry={22} fill="white" fillOpacity={opacity} />
      <Ellipse cx={35} cy={42} rx={22} ry={16} fill="white" fillOpacity={opacity} />
      <Ellipse cx={78} cy={40} rx={25} ry={18} fill="white" fillOpacity={opacity} />
      <Ellipse cx={55} cy={30} rx={28} ry={20} fill="white" fillOpacity={Math.min(opacity + 0.05, 1)} />
    </Svg>
  );
}

export function PathIllustration({ width = 320 }: { width?: number }) {
  const h = width / 4.5;
  return (
    <Svg width={width} height={h} viewBox="0 0 360 80" fill="none">
      <Path d="M0 60 Q90 40 180 55 Q270 70 360 50" stroke="#d4b890" strokeWidth={20} strokeLinecap="round" />
      <Path d="M0 60 Q90 40 180 55 Q270 70 360 50" stroke="#c4a878" strokeWidth={14} strokeLinecap="round" />
      <Path d="M0 60 Q90 40 180 55 Q270 70 360 50" stroke="#d4b890" strokeWidth={10} strokeLinecap="round" strokeDasharray="6 14" />
    </Svg>
  );
}

// ─── キャラクターアバター ─────────────────────────────────────

export function CharacterAvatar({ size = 36 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Circle cx={20} cy={16} r={10} fill="#f5d5a0" />
      <Circle cx={16} cy={15} r={1.5} fill="#4a3728" />
      <Circle cx={24} cy={15} r={1.5} fill="#4a3728" />
      <Path d="M16 20 Q20 23 24 20" stroke="#c47a5a" strokeWidth={1.5} strokeLinecap="round" fill="none" />
      <Path d="M10 15 Q12 6 20 8 Q28 6 30 15" fill="#c4956a" />
      <Path d="M10 30 Q12 24 20 24 Q28 24 30 30" fill="#89bdd3" />
    </Svg>
  );
}

export default {
  HomeIcon,
  MapIcon,
  BagIcon,
  ScrollIcon,
  SwordIcon,
  GearIcon,
  CartIcon,
  CheckIcon,
  PlusIcon,
  BackIcon,
  CloseIcon,
  CoinIcon,
  StarIcon,
  SparkleIcon,
  BookIcon,
  CharacterAvatar,
};
