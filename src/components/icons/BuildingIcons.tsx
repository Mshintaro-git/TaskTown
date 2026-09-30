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

// ─── Premium Buildings ───────────────────────────────────────────────────────

export function CafeBuildingIcon({ size = 40 }: Props) {
  const h = size * 1.1;

  return (
    <Svg width={size} height={h} viewBox="0 0 80 88" fill="none">
      {/* drop shadow */}
      <Ellipse
        cx={40}
        cy={85}
        rx={27}
        ry={4}
        fill="#4a3728"
        fillOpacity={0.13}
      />

      {/* roof */}
      <Path d="M7 47 L40 18 L73 47Z" fill="#a06845" />
      <Path
        d="M7 47 L73 47"
        stroke="#7a4828"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M7 47 L40 18 L40 47Z"
        fill="#8a5835"
        fillOpacity={0.18}
      />

      {/* chimney */}
      <Rect x={53} y={28} width={8} height={17} rx={2} fill="#b87848" />
      <Rect x={51} y={26} width={12} height={4.5} rx={2} fill="#9a6035" />

      {/* chimney steam */}
      <Path
        d="M55 24 Q57 20 55 16"
        stroke="#c8b8b0"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <Path
        d="M59 25 Q61 21 59 17"
        stroke="#c8b8b0"
        strokeWidth={1.4}
        strokeLinecap="round"
      />

      {/* building body */}
      <Rect
        x={12}
        y={45}
        width={56}
        height={40}
        rx={4}
        fill="#f2e4c8"
      />

      {/* brick hint */}
      <Line
        x1={12}
        y1={57}
        x2={68}
        y2={57}
        stroke="#c4956a"
        strokeWidth={0.6}
        strokeOpacity={0.35}
      />
      <Line
        x1={12}
        y1={65}
        x2={68}
        y2={65}
        stroke="#c4956a"
        strokeWidth={0.6}
        strokeOpacity={0.35}
      />
      <Line
        x1={12}
        y1={73}
        x2={68}
        y2={73}
        stroke="#c4956a"
        strokeWidth={0.6}
        strokeOpacity={0.35}
      />

      {/* awning */}
      <Path
        d="M13 52 L67 52 L65 60
           Q62 64 59 60
           Q56 64 53 60
           Q50 64 47 60
           Q44 64 41 60
           Q38 64 35 60
           Q32 64 29 60
           Q26 64 23 60
           Q20 64 17 60
           Q15 64 13 60
           Z"
        fill="#c87850"
      />

      {/* awning highlights */}
      <Path
        d="M20 52 L18 60 L22 60 L24 52Z"
        fill="white"
        fillOpacity={0.22}
      />
      <Path
        d="M34 52 L32 60 L36 60 L38 52Z"
        fill="white"
        fillOpacity={0.22}
      />
      <Path
        d="M48 52 L46 60 L50 60 L52 52Z"
        fill="white"
        fillOpacity={0.22}
      />
      <Path
        d="M62 52 L60 60 L64 60 L66 52Z"
        fill="white"
        fillOpacity={0.22}
      />

      <Line
        x1={13}
        y1={52}
        x2={67}
        y2={52}
        stroke="#a06030"
        strokeWidth={1.2}
      />

      {/* window */}
      <Rect
        x={14}
        y={62}
        width={27}
        height={19}
        rx={3}
        fill="#f8e898"
      />
      <Rect
        x={14}
        y={62}
        width={27}
        height={19}
        rx={3}
        stroke="#8a6040"
        strokeWidth={1.5}
      />
      <Line
        x1={27.5}
        y1={62}
        x2={27.5}
        y2={81}
        stroke="#8a6040"
        strokeWidth={1}
      />
      <Line
        x1={14}
        y1={71.5}
        x2={41}
        y2={71.5}
        stroke="#8a6040"
        strokeWidth={1}
      />

      {/* coffee cup */}
      <Rect
        x={18}
        y={73.5}
        width={7}
        height={5.5}
        rx={1.5}
        fill="#b08048"
      />
      <Path
        d="M25 75 Q28 75 28 77.5 Q28 80 25 80"
        stroke="#b08048"
        strokeWidth={1.2}
        strokeLinecap="round"
      />

      {/* cup steam */}
      <Path
        d="M20.5 72.5 Q21.5 69.5 20.5 67"
        stroke="#c0afa8"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <Path
        d="M23.5 73 Q24.5 70 23.5 67.5"
        stroke="#c0afa8"
        strokeWidth={1.2}
        strokeLinecap="round"
      />

      {/* chalkboard */}
      <Rect
        x={30}
        y={64}
        width={9}
        height={6}
        rx={1.5}
        fill="#506050"
      />
      <Line
        x1={32}
        y1={66.5}
        x2={37}
        y2={66.5}
        stroke="white"
        strokeWidth={0.9}
        strokeLinecap="round"
      />
      <Line
        x1={32}
        y1={68.5}
        x2={36}
        y2={68.5}
        stroke="white"
        strokeWidth={0.9}
        strokeLinecap="round"
      />

      {/* door */}
      <Rect
        x={47}
        y={61}
        width={19}
        height={24}
        rx={4}
        fill="#c4956a"
      />
      <Rect
        x={47}
        y={61}
        width={19}
        height={24}
        rx={4}
        stroke="#8a6040"
        strokeWidth={1.5}
      />

      {/* door window */}
      <Path
        d="M51 67 Q56.5 61 62 67 L62 74 L51 74Z"
        fill="#d4eef8"
      />
      <Path
        d="M51 67 Q56.5 61 62 67"
        stroke="#8a6040"
        strokeWidth={1}
      />

      {/* knob */}
      <Circle cx={63} cy={75} r={1.6} fill="#8a6040" />

      {/* plant */}
      <Rect
        x={42}
        y={79}
        width={7}
        height={5}
        rx={1.5}
        fill="#c4956a"
      />
      <Ellipse
        cx={45.5}
        cy={78.5}
        rx={5.5}
        ry={4.5}
        fill="#6aaa5a"
      />
      <Ellipse
        cx={43}
        cy={76.5}
        rx={3.5}
        ry={3}
        fill="#7aba6a"
      />
    </Svg>
  );
}


export function OnsenBuildingIcon({ size = 40 }: Props) {
  const h = size * 1.1;

  return (
    <Svg width={size} height={h} viewBox="0 0 80 88" fill="none">
      {/* drop shadow */}
      <Ellipse
        cx={40}
        cy={85}
        rx={27}
        ry={4}
        fill="#4a3728"
        fillOpacity={0.13}
      />

      {/* steam */}
      <Path
        d="M28 20 Q30 14 28 9"
        stroke="#c8d8e8"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Path
        d="M40 17 Q42 11 40 6"
        stroke="#c8d8e8"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      <Path
        d="M52 20 Q54 14 52 9"
        stroke="#c8d8e8"
        strokeWidth={2.2}
        strokeLinecap="round"
      />

      {/* Japanese roof */}
      <Path
        d="M5 46 Q8 34 40 22 Q72 34 75 46 Q40 52 5 46Z"
        fill="#7a6248"
      />
      <Path
        d="M5 46 Q8 34 40 22 L40 46Z"
        fill="black"
        fillOpacity={0.1}
      />

      {/* roof ridge */}
      <Line
        x1={26}
        y1={25}
        x2={54}
        y2={25}
        stroke="#5a4030"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* roof tiles */}
      <Line
        x1={11}
        y1={36}
        x2={69}
        y2={36}
        stroke="#5a4030"
        strokeWidth={0.9}
        strokeOpacity={0.4}
      />
      <Line
        x1={7}
        y1={43}
        x2={73}
        y2={43}
        stroke="#5a4030"
        strokeWidth={0.9}
        strokeOpacity={0.4}
      />

      {/* eaves */}
      <Path
        d="M5 46 Q3 44 5 41"
        stroke="#5a4030"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M75 46 Q77 44 75 41"
        stroke="#5a4030"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* body */}
      <Rect
        x={12}
        y={44}
        width={56}
        height={38}
        rx={3}
        fill="#d8b880"
      />

      {/* wood planks */}
      <Line
        x1={12}
        y1={53}
        x2={68}
        y2={53}
        stroke="#b89858"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Line
        x1={12}
        y1={62}
        x2={68}
        y2={62}
        stroke="#b89858"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Line
        x1={12}
        y1={71}
        x2={68}
        y2={71}
        stroke="#b89858"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />

      {/* left shoji */}
      <Rect
        x={14}
        y={48}
        width={17}
        height={14}
        rx={2}
        fill="#f5f0e4"
      />
      <Rect
        x={14}
        y={48}
        width={17}
        height={14}
        rx={2}
        stroke="#8a6840"
        strokeWidth={1.5}
      />
      <Line
        x1={22.5}
        y1={48}
        x2={22.5}
        y2={62}
        stroke="#8a6840"
        strokeWidth={1}
      />
      <Line
        x1={14}
        y1={55}
        x2={31}
        y2={55}
        stroke="#8a6840"
        strokeWidth={1}
      />

      {/* right shoji */}
      <Rect
        x={49}
        y={48}
        width={17}
        height={14}
        rx={2}
        fill="#f5f0e4"
      />
      <Rect
        x={49}
        y={48}
        width={17}
        height={14}
        rx={2}
        stroke="#8a6840"
        strokeWidth={1.5}
      />
      <Line
        x1={57.5}
        y1={48}
        x2={57.5}
        y2={62}
        stroke="#8a6840"
        strokeWidth={1}
      />
      <Line
        x1={49}
        y1={55}
        x2={66}
        y2={55}
        stroke="#8a6840"
        strokeWidth={1}
      />

      {/* noren */}
      <Rect
        x={30}
        y={44}
        width={20}
        height={2}
        rx={1}
        fill="#8a6040"
      />
      <Rect
        x={31}
        y={46}
        width={5}
        height={16}
        rx={2.5}
        fill="#c04040"
      />
      <Rect
        x={37.5}
        y={46}
        width={5}
        height={14}
        rx={2.5}
        fill="#c04040"
      />
      <Rect
        x={44}
        y={46}
        width={5}
        height={16}
        rx={2.5}
        fill="#c04040"
      />

      {/* noren dots */}
      <Circle cx={33.5} cy={52} r={1} fill="white" fillOpacity={0.45} />
      <Circle cx={40} cy={52} r={1} fill="white" fillOpacity={0.45} />
      <Circle cx={46.5} cy={52} r={1} fill="white" fillOpacity={0.45} />

      {/* bath */}
      <Path
        d="M8 78 Q40 73 72 78 L72 84 Q40 82 8 84Z"
        fill="#a09080"
      />
      <Ellipse cx={40} cy={77} rx={22} ry={5} fill="#8abccc" />
      <Ellipse
        cx={40}
        cy={77}
        rx={22}
        ry={5}
        stroke="#6aaac4"
        strokeWidth={1}
      />
      <Ellipse
        cx={40}
        cy={77}
        rx={14}
        ry={3}
        fill="none"
        stroke="white"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />

      {/* rocks */}
      <Ellipse cx={18} cy={78} rx={5} ry={3} fill="#8a8070" />
      <Ellipse cx={62} cy={78} rx={5} ry={3} fill="#8a8070" />
      <Ellipse cx={12} cy={80} rx={4} ry={2.5} fill="#9a9080" />
      <Ellipse cx={68} cy={80} rx={4} ry={2.5} fill="#9a9080" />
    </Svg>
  );
}


export function ObservatoryBuildingIcon({ size = 40 }: Props) {
  const h = size * 1.15;

  return (
    <Svg width={size} height={h} viewBox="0 0 80 92" fill="none">
      {/* drop shadow */}
      <Ellipse
        cx={40}
        cy={89}
        rx={26}
        ry={4}
        fill="#4a3728"
        fillOpacity={0.13}
      />

      {/* hill */}
      <Ellipse cx={40} cy={86} rx={34} ry={7} fill="#7aba6a" />
      <Ellipse cx={40} cy={83} rx={28} ry={6} fill="#8aca7a" />

      {/* stone base */}
      <Rect
        x={14}
        y={54}
        width={52}
        height={30}
        rx={5}
        fill="#ddd4c0"
      />

      <Line
        x1={14}
        y1={64}
        x2={66}
        y2={64}
        stroke="#b8a888"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Line
        x1={14}
        y1={74}
        x2={66}
        y2={74}
        stroke="#b8a888"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Line
        x1={34}
        y1={64}
        x2={34}
        y2={84}
        stroke="#b8a888"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Line
        x1={52}
        y1={54}
        x2={52}
        y2={64}
        stroke="#b8a888"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Line
        x1={28}
        y1={54}
        x2={28}
        y2={64}
        stroke="#b8a888"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />

      {/* base shading */}
      <Rect
        x={14}
        y={54}
        width={14}
        height={30}
        rx={3}
        fill="black"
        fillOpacity={0.06}
      />

      {/* doorway */}
      <Path
        d="M31 84 L31 70 Q40 62 49 70 L49 84Z"
        fill="#c4b898"
      />
      <Path
        d="M31 70 Q40 62 49 70"
        stroke="#a09070"
        strokeWidth={1.5}
      />
      <Line
        x1={40}
        y1={62}
        x2={40}
        y2={84}
        stroke="#a09070"
        strokeWidth={1}
        strokeOpacity={0.6}
      />

      {/* windows */}
      <Path
        d="M17 72 L17 65 Q23 60 29 65 L29 72Z"
        fill="#c8d8e8"
      />
      <Path
        d="M17 65 Q23 60 29 65"
        stroke="#a09070"
        strokeWidth={1.2}
      />

      <Path
        d="M51 72 L51 65 Q57 60 63 65 L63 72Z"
        fill="#c8d8e8"
      />
      <Path
        d="M51 65 Q57 60 63 65"
        stroke="#a09070"
        strokeWidth={1.2}
      />

      {/* dome collar */}
      <Rect
        x={18}
        y={46}
        width={44}
        height={12}
        rx={4}
        fill="#c8c0b0"
      />
      <Line
        x1={18}
        y1={52}
        x2={62}
        y2={52}
        stroke="#a8a090"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />

      {/* dome */}
      <Path
        d="M16 54 Q16 22 40 18 Q64 22 64 54Z"
        fill="#9ab8d8"
      />
      <Path
        d="M16 54 Q16 22 40 18 L40 54Z"
        fill="black"
        fillOpacity={0.12}
      />
      <Path
        d="M40 18 Q58 22 64 44 L56 54 L40 54Z"
        fill="white"
        fillOpacity={0.14}
      />

      {/* dome panel lines */}
      <Path
        d="M40 18 L40 54"
        stroke="#7898b8"
        strokeWidth={0.8}
        strokeOpacity={0.5}
      />
      <Path
        d="M40 18 Q50 26 56 54"
        stroke="#7898b8"
        strokeWidth={0.8}
        strokeOpacity={0.4}
      />
      <Path
        d="M40 18 Q30 26 24 54"
        stroke="#7898b8"
        strokeWidth={0.8}
        strokeOpacity={0.4}
      />

      {/* dome outline */}
      <Path
        d="M16 54 Q16 22 40 18 Q64 22 64 54"
        stroke="#6888a8"
        strokeWidth={1.5}
      />
      <Line
        x1={16}
        y1={54}
        x2={64}
        y2={54}
        stroke="#6888a8"
        strokeWidth={1.5}
      />

      {/* dome opening */}
      <Path
        d="M36 26 Q36 22 40 20 Q44 22 44 26 L44 50 L36 50Z"
        fill="#2a3848"
      />
      <Path
        d="M36 26 Q36 22 40 20 Q44 22 44 26"
        stroke="#4a5868"
        strokeWidth={1}
      />

      {/* telescope */}
      <Rect
        x={38}
        y={24}
        width={10}
        height={4}
        rx={2}
        transform="rotate(-38 38 24)"
        fill="#788090"
      />
      <Rect
        x={38}
        y={24}
        width={6}
        height={3}
        rx={1.5}
        transform="rotate(-38 38 24)"
        fill="#909aa8"
      />
      <Circle cx={50} cy={18} r={2.5} fill="#6878a0" />
      <Circle cx={50} cy={18} r={1.5} fill="#8898c0" />

      {/* stars */}
      <Path
        d="M9 28 L10.2 31.5 L14 32.5 L10.2 33.5 L9 37 L7.8 33.5 L4 32.5 L7.8 31.5Z"
        fill="#e8c84a"
        fillOpacity={0.9}
      />
      <Path
        d="M68 18 L68.8 20.5 L71.5 21 L68.8 21.5 L68 24 L67.2 21.5 L64.5 21 L67.2 20.5Z"
        fill="#e8c84a"
        fillOpacity={0.8}
      />
      <Path
        d="M72 36 L72.5 37.5 L74.2 38 L72.5 38.5 L72 40 L71.5 38.5 L69.8 38 L71.5 37.5Z"
        fill="#e8c84a"
        fillOpacity={0.7}
      />
      <Path
        d="M6 14 L6.4 15.4 L8 15.8 L6.4 16.2 L6 17.6 L5.6 16.2 L4 15.8 L5.6 15.4Z"
        fill="#e8c84a"
        fillOpacity={0.6}
      />

      {/* crescent moon */}
      <Path
        d="M13 15 Q18 10 22 15 Q18 12 13 15Z"
        fill="#e8c84a"
        fillOpacity={0.55}
      />
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

case "cafe":
  return <CafeBuildingIcon size={size} />;

case "onsen":
  return <OnsenBuildingIcon size={size} />;

case "observatory":
  return <ObservatoryBuildingIcon size={size} />;

default:
  return <SmallHouseIcon size={size} />;
  }
}

export default BuildingIcon;
