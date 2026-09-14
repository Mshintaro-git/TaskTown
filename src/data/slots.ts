import { SlotPosition } from "../types";

// 10個のスロット位置（固定・アイソメトリック風配置）
// x, y は画面サイズに対する%位置
export const SLOT_POSITIONS: SlotPosition[] = [
  { slotNumber: 1, x: 50, y: 12 },   // 最上段・中央
  { slotNumber: 2, x: 30, y: 25 },   // 上段・左
  { slotNumber: 3, x: 70, y: 25 },   // 上段・右
  { slotNumber: 4, x: 15, y: 38 },   // 中上段・左端
  { slotNumber: 5, x: 50, y: 38 },   // 中上段・中央
  { slotNumber: 6, x: 85, y: 38 },   // 中上段・右端
  { slotNumber: 7, x: 30, y: 52 },   // 中下段・左
  { slotNumber: 8, x: 70, y: 52 },   // 中下段・右
  { slotNumber: 9, x: 50, y: 65 },   // 下段・中央
  { slotNumber: 10, x: 50, y: 80 },  // 最下段・中央（街の入り口）
];

// スロットのサイズ（画面幅に対する%）
export const SLOT_SIZE = 18;