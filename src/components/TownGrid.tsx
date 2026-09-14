import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { SLOT_POSITIONS } from "../data/slots";
import { getBuildingById } from "../constants/buildings";
import SlotView from "./SlotView";
import BuildingDetailModal from "./BuildingDetailModal";
import { PathIllustration } from "./icons/Icons";

type PlayerBuilding = {
  id: number;
  buildingId: string;
  slotNumber: number;
  builtAt: string;
};

type Props = {
  buildings: PlayerBuilding[];
};

export default function TownGrid({ buildings }: Props) {
  // 詳細表示する建物の状態
  const [selectedBuilding, setSelectedBuilding] = useState<PlayerBuilding | null>(null);

  // スロットタップ処理
  const handleSlotPress = (slotNumber: number) => {
    const building = buildings.find((b) => b.slotNumber === slotNumber) ?? null;
    setSelectedBuilding(building);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setSelectedBuilding(null);
  };

  return (
    <View style={styles.container}>
      {/* 道の装飾 */}
      <View style={styles.pathWrap} pointerEvents="none">
        <PathIllustration width={360} />
      </View>

      {/* スロットを配置 */}
      {SLOT_POSITIONS.map((slot) => {
        const building = buildings.find((b) => b.slotNumber === slot.slotNumber) ?? null;
        return (
          <SlotView
            key={slot.slotNumber}
            slot={slot}
            building={building ? getBuildingById(building.buildingId) ?? null : null}
            onPress={() => handleSlotPress(slot.slotNumber)}
          />
        );
      })}

      {/* 建物詳細モーダル */}
      <BuildingDetailModal
        visible={selectedBuilding !== null}
        building={selectedBuilding}
        onClose={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  pathWrap: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    opacity: 0.6,
  },
});
