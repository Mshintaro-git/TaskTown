// 建物イラストアイコン集
// Figma デザイン「ToDo Town RPG」の街並みイラストを react-native-svg で再現。
// 建物データ（src/data, src/constants）は変更せず、id をもとに見た目のみを
// 絵文字からイラストへ差し替えるためのマッピングコンポーネント。

import Svg, { Path, Rect, Ellipse, Circle, Line, Defs, Pattern } from "react-native-svg";

type Props = { size?: number };

export function TentBuildingIcon({ size = 40 }: Props) {
  const h = size * 1.05;
  return (
    <Svg width={size} height={h} viewBox="0 0 80 84" fill="none">
      <Ellipse cx={40} cy={81} rx={26} ry={4} fill="#4a3728" fillOpacity={0.12} />
      <Path d="M40 12 L68 78 L12 78 Z" fill="#c47a5a" />
      <Path d="M40 12 L54 78 L26 78 Z" fill="#9a4030" />
      <Path d="M40 40 L40 78" stroke="#7a3020" strokeWidth={1.5} />
      <Path d="M34 78 Q40 60 46 78" fill="#7a3020" />
      <Line x1={22} y1={60} x2={58} y2={60} stroke="#b86a4a" strokeWidth={1.5} />
    </Svg>
  );
}

export function TreeBuildingIcon({ size = 40 }: Props) {
  const h = size * 1.4;
  return (
    <Svg width={size} height={h} viewBox="0 0 50 70" fill="none">
      <Ellipse cx={25} cy={67} rx={12} ry={3.5} fill="#4a3728" fillOpacity={0.15} />
      <Rect x={21} y={48} width={8} height={18} rx={3} fill="#8a6040" />
      <Ellipse cx={25} cy={35} rx={16} ry={18} fill="#6aaa5a" />
      <Ellipse cx={25} cy={26} rx={13} ry={16} fill="#7aba6a" />
      <Ellipse cx={25} cy={20} rx={10} ry={12} fill="#8aca7a" />
      <Ellipse cx={22} cy={18} rx={5} ry={6} fill="#9ada8a" fillOpacity={0.6} />
    </Svg>
  );
}

export function FlowerFieldIcon({ size = 40 }: Props) {
  const h = size * 0.75;
  return (
    <Svg width={size} height={h} viewBox="0 0 80 60" fill="none">
      <Ellipse cx={40} cy={56} rx={34} ry={4} fill="#4a3728" fillOpacity={0.1} />
      <Path d="M6 50 Q40 34 74 50" fill="#8aca7a" />
      {[[16, 40, "#e88ab0"], [30, 34, "#f0c860"], [44, 38, "#e88ab0"], [58, 42, "#89bdd3"], [66, 36, "#f0c860"]].map(
        ([cx, cy, c]: any, i) => (
          <Circle key={i} cx={cx} cy={cy} r={4} fill={c} />
        )
      )}
      <Circle cx={16} cy={40} r={1.6} fill="#fff8a0" />
      <Circle cx={30} cy={34} r={1.6} fill="#c47a5a" />
      <Circle cx={44} cy={38} r={1.6} fill="#fff8a0" />
      <Circle cx={58} cy={42} r={1.6} fill="#fff8a0" />
      <Circle cx={66} cy={36} r={1.6} fill="#c47a5a" />
    </Svg>
  );
}

export function FarmBuildingIcon({ size = 40 }: Props) {
  const h = size;
  return (
    <Svg width={size} height={h} viewBox="0 0 80 80" fill="none">
      <Ellipse cx={40} cy={77} rx={22} ry={4} fill="#4a3728" fillOpacity={0.12} />
      <Rect x={16} y={40} width={48} height={34} rx={3} fill="#c47a5a" />
      <Path d="M10 42 L40 18 L70 42Z" fill="#9a4030" />
      <Rect x={30} y={52} width={20} height={22} rx={2} fill="#7a3820" />
      <Line x1={40} y1={52} x2={40} y2={74} stroke="#5a2810" strokeWidth={1.5} />
      <Path d="M30 62 Q35 58 40 62 Q45 58 50 62" stroke="#5a2810" strokeWidth={1.5} fill="none" />
      <Rect x={6} y={58} width={8} height={12} rx={1} fill="#6aaa5a" />
      <Rect x={66} y={58} width={8} height={12} rx={1} fill="#6aaa5a" />
    </Svg>
  );
}

export function SmallHouseIcon({ size = 40 }: Props) {
  const h = size * 1.1;
  return (
    <Svg width={size} height={h} viewBox="0 0 80 90" fill="none">
      <Ellipse cx={40} cy={87} rx={28} ry={4} fill="#4a3728" fillOpacity={0.12} />
      <Rect x={12} y={44} width={56} height={40} rx={4} fill="#e8c9a0" />
      <Path d="M6 46 L40 14 L74 46Z" fill="#c47a5a" />
      <Line x1={6} y1={46} x2={74} y2={46} stroke="#a85c40" strokeWidth={2.5} strokeLinecap="round" />
      <Rect x={52} y={22} width={10} height={18} rx={2} fill="#b86a4a" />
      <Rect x={50} y={20} width={14} height={5} rx={2} fill="#9a5535" />
      <Rect x={18} y={54} width={16} height={14} rx={3} fill="#89bdd3" stroke="#8a7060" strokeWidth={1.2} />
      <Rect x={33} y={58} width={14} height={26} rx={7} fill="#c4956a" stroke="#8a7060" strokeWidth={1.2} />
      <Rect x={46} y={54} width={16} height={14} rx={3} fill="#89bdd3" stroke="#8a7060" strokeWidth={1.2} />
    </Svg>
  );
}

export function BakeryIcon({ size = 40 }: Props) {
  const h = size * 1.1;
  return (
    <Svg width={size} height={h} viewBox="0 0 80 90" fill="none">
      <Ellipse cx={40} cy={87} rx={24} ry={4} fill="#4a3728" fillOpacity={0.12} />
      <Rect x={10} y={38} width={60} height={48} rx={4} fill="#f0d9b0" />
      <Path d="M8 38 Q40 28 72 38" fill="#c4956a" stroke="#a07040" strokeWidth={1.5} />
      <Rect x={20} y={42} width={40} height={12} rx={4} fill="#c47a5a" stroke="#a07040" strokeWidth={1.2} />
      <Rect x={14} y={58} width={52} height={20} rx={3} fill="#f8ecd8" stroke="#8a7060" strokeWidth={1.5} />
      <Ellipse cx={28} cy={68} rx={6} ry={4} fill="#c4956a" />
      <Ellipse cx={40} cy={68} rx={6} ry={4} fill="#e8c56a" />
      <Ellipse cx={52} cy={68} rx={6} ry={4} fill="#c4956a" />
      <Rect x={32} y={72} width={16} height={14} rx={4} fill="#c4956a" />
    </Svg>
  );
}

export function ParkIcon({ size = 40 }: Props) {
  const h = size;
  return (
    <Svg width={size} height={h} viewBox="0 0 80 80" fill="none">
      <Ellipse cx={40} cy={77} rx={30} ry={4} fill="#4a3728" fillOpacity={0.1} />
      <Ellipse cx={20} cy={55} rx={12} ry={14} fill="#7aba6a" />
      <Rect x={17} y={65} width={6} height={12} rx={2} fill="#8a6040" />
      <Ellipse cx={40} cy={48} rx={14} ry={16} fill="#8aca7a" />
      <Rect x={37} y={62} width={6} height={16} rx={2} fill="#8a6040" />
      <Ellipse cx={60} cy={55} rx={12} ry={14} fill="#6aaa5a" />
      <Rect x={57} y={65} width={6} height={12} rx={2} fill="#8a6040" />
      <Rect x={30} y={72} width={20} height={4} rx={2} fill="#c4a878" />
    </Svg>
  );
}

export function LibraryIcon({ size = 40 }: Props) {
  const h = size * 1.05;
  return (
    <Svg width={size} height={h} viewBox="0 0 80 84" fill="none">
      <Ellipse cx={40} cy={81} rx={28} ry={4} fill="#4a3728" fillOpacity={0.12} />
      <Rect x={10} y={30} width={60} height={50} rx={3} fill="#e8d4b0" />
      <Path d="M6 32 L40 10 L74 32Z" fill="#89bdd3" />
      <Rect x={16} y={20} width={8} height={14} fill="#89bdd3" />
      <Rect x={56} y={20} width={8} height={14} fill="#89bdd3" />
      <Rect x={22} y={44} width={10} height={20} fill="#c47a5a" />
      <Rect x={35} y={44} width={10} height={20} fill="#5a9ab5" />
      <Rect x={48} y={44} width={10} height={20} fill="#e8c56a" />
      <Rect x={34} y={64} width={12} height={16} rx={2} fill="#7a5a3a" />
    </Svg>
  );
}

export function PlazaIcon({ size = 40 }: Props) {
  const h = size * 0.95;
  return (
    <Svg width={size} height={h} viewBox="0 0 80 76" fill="none">
      <Ellipse cx={40} cy={73} rx={32} ry={4} fill="#4a3728" fillOpacity={0.1} />
      <Ellipse cx={40} cy={60} rx={30} ry={10} fill="#e8d8c4" stroke="#c4a878" strokeWidth={1.5} />
      <Rect x={34} y={20} width={12} height={30} rx={2} fill="#e8c9a0" />
      <Circle cx={40} cy={14} r={8} fill="#89bdd3" />
      <Path d="M28 50 Q40 42 52 50" stroke="#89bdd3" strokeWidth={2} fill="none" />
    </Svg>
  );
}

export function ClockTowerIcon({ size = 40 }: Props) {
  const h = size * 1.6;
  return (
    <Svg width={size} height={h} viewBox="0 0 60 96" fill="none">
      <Ellipse cx={30} cy={93} rx={20} ry={3.5} fill="#4a3728" fillOpacity={0.12} />
      <Rect x={14} y={40} width={32} height={52} rx={3} fill="#e8c9a0" />
      <Path d="M10 42 L30 14 L50 42Z" fill="#c47a5a" />
      <Circle cx={30} cy={54} r={11} fill="#f8ecd8" stroke="#8a7060" strokeWidth={1.5} />
      <Line x1={30} y1={54} x2={30} y2={47} stroke="#4a3728" strokeWidth={1.6} strokeLinecap="round" />
      <Line x1={30} y1={54} x2={35} y2={56} stroke="#4a3728" strokeWidth={1.6} strokeLinecap="round" />
      <Rect x={22} y={74} width={16} height={18} rx={4} fill="#c4956a" />
    </Svg>
  );
}

// id -> アイコン のマッピング（constants/buildings.ts, data/buildings.ts の id と対応）
export function BuildingIcon({ id, size = 40 }: { id: string; size?: number }) {
  switch (id) {
    case "tent":
      return <TentBuildingIcon size={size} />;
    case "tree":
    case "park":
      return id === "park" ? <ParkIcon size={size} /> : <TreeBuildingIcon size={size} />;
    case "flower_field":
    case "flower":
      return <FlowerFieldIcon size={size} />;
    case "farm":
      return <FarmBuildingIcon size={size} />;
    case "small_house":
      return <SmallHouseIcon size={size} />;
    case "bakery":
      return <BakeryIcon size={size} />;
    case "library":
      return <LibraryIcon size={size} />;
    case "plaza":
      return <PlazaIcon size={size} />;
    case "clock_tower":
      return <ClockTowerIcon size={size} />;
    default:
      return <SmallHouseIcon size={size} />;
  }
}

export default BuildingIcon;
