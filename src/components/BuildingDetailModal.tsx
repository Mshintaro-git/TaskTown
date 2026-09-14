import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { getBuildingById } from "../constants/buildings";
import { BuildingIcon } from "./icons/BuildingIcons";
import { isEnglish } from "../utils/language";
import { colors, fonts, radius, shadow } from "../theme/theme";

type PlayerBuilding = {
  id: number;
  buildingId: string;
  slotNumber: number;
  builtAt: string;
};

type Props = {
  visible: boolean;
  building: PlayerBuilding | null;
  onClose: () => void;
};

export default function BuildingDetailModal({
  visible,
  building,
  onClose,
}: Props) {
  // 建物がない場合は何も表示しない
  if (!building) return null;

  // マスターデータから建物情報を取得
  const buildingType = getBuildingById(building.buildingId);
  if (!buildingType) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={() => {}}>
          {/* 建物アイコン */}
          <View style={styles.iconWrap}>
            <BuildingIcon id={buildingType.id} size={64} />
          </View>

          {/* 建物名 */}
          <Text style={styles.name}>{isEnglish ? buildingType.nameEn : buildingType.nameJa}</Text>

          {/* 説明 */}
            <Text style={styles.description}>{isEnglish ? buildingType.descriptionEn : buildingType.descriptionJa}</Text>

          {/* 情報一覧 */}
          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{isEnglish ? "Built on" : "完成日"}</Text>
              <Text style={styles.infoValue}>
                {new Date(building.builtAt).toLocaleDateString(isEnglish ? "en-US" : "ja-JP")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{isEnglish ? "Slot" : "スロット"}</Text>
              <Text style={styles.infoValue}>No.{building.slotNumber}</Text>
            </View>
          </View>

          {/* 閉じるボタン */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{isEnglish ? "Close" : "閉じる"}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: radius.xxl,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  iconWrap: {
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    color: colors.foreground,
    marginBottom: 8,
    fontFamily: fonts.display,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
    fontFamily: fonts.bodyRegular,
  },
  infoList: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.muted,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textMuted,
    fontFamily: fonts.bodySemiBold,
  },
  infoValue: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.bodyBold,
  },
  closeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: radius.pill,
  },
  closeButtonText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontFamily: fonts.bodyBold,
  },
});
