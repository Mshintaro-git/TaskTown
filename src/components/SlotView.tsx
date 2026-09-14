import { View, Text, Pressable, StyleSheet } from "react-native";
import { SlotPosition } from "../types";
import { BuildingMaster } from "../constants/buildings";
import { SLOT_SIZE } from "../data/slots";
import { BuildingIcon } from "./icons/BuildingIcons";
import { isEnglish } from "../utils/language";
import { colors, fonts, radius } from "../theme/theme";

type Props = {
  slot: SlotPosition;
  building: BuildingMaster | null;
  onPress: (slotNumber: number) => void;
};

export default function SlotView({ slot, building, onPress }: Props) {
  // 建物がある場合は情報を表示
  const buildingType = building;

  return (
    <View
      style={[
        styles.slotContainer,
        {
          left: `${slot.x - SLOT_SIZE / 2}%`,
          top: `${slot.y}%`,
          width: `${SLOT_SIZE}%`,
        },
      ]}
    >
      <Pressable
        onPress={() => onPress(slot.slotNumber)}
        style={({ pressed }) => [
          styles.slot,
          pressed && styles.slotPressed,
        ]}
      >
        {buildingType ? (
          // 建物がある場合
          <View style={styles.buildingContent}>
            <BuildingIcon id={buildingType.id} size={34} />
            <Text style={styles.buildingName} numberOfLines={1}>
              {isEnglish ? buildingType.nameEn : buildingType.nameJa}
            </Text>
          </View>
        ) : (
          // 空き地の場合は何も表示しない
          null
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  slotContainer: {
    position: "absolute",
    aspectRatio: 1,
  },
  slot: {
    flex: 1,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  slotPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    transform: [{ scale: 0.95 }],
  },
  buildingContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  buildingName: {
    fontSize: 10,
    color: colors.foreground,
    marginTop: 2,
    textAlign: "center",
    fontFamily: fonts.bodyBold,
  },
});
