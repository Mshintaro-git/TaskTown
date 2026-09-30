import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import {
  BUILDINGS,
  BuildingMaster,
  LevelBuildingChoices,
} from "../constants/buildings";
import {
  buildBuildingAtSlot,
  getPlayerBuildings,
} from "../services/buildingService";
import { loadPlayerState } from "../services/databaseService";
import { BuildingIcon } from "./icons/BuildingIcons";
import { CloseIcon } from "./icons/Icons";
import { isEnglish } from "../utils/language";
import { colors, fonts, radius, shadow } from "../theme/theme";

type Props = {
  visible: boolean;
  slotNumber: number | null;
  onClose: () => void;
  onBuildingBuilt: () => void;
};

export default function PremiumBuildingModal({
  visible,
  slotNumber,
  onClose,
  onBuildingBuilt,
}: Props) {
  const [buildings, setBuildings] = useState<BuildingMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const [building, setBuilding] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!visible || slotNumber === null) {
      return;
    }

    loadAvailableBuildings();
  }, [visible, slotNumber]);

  const loadAvailableBuildings = async () => {
    setLoading(true);
    setSelectedBuildingId(null);

    try {
      // 現在のプレイヤー状態を取得
      const playerState = await loadPlayerState();
      const currentLevel = playerState.level;

      // すでに建築済みの建物を取得
      const playerBuildings = await getPlayerBuildings();

      const builtIds = new Set(
        playerBuildings.map((building) => building.buildingId)
      );

      // 現在のレベルまでに登場した建物IDを取得
      const unlockedIds = new Set<string>();

      for (let level = 1; level <= currentLevel; level++) {
        const choices = LevelBuildingChoices[level] ?? [];

        choices.forEach((buildingId) => {
          unlockedIds.add(buildingId);
        });
      }

      // 通常建物：
      // 現在のレベルまでに解放されている建物
      //
      // Premium建物：
      // premium: true の建物
      //
      // すでに建築済みのものは除外
      const availableBuildings = BUILDINGS.filter((building) => {
        if (builtIds.has(building.id)) {
          return false;
        }

        if (building.premium) {
          return true;
        }

        return unlockedIds.has(building.id);
      });

      setBuildings(availableBuildings);
    } catch (error) {
      console.error("Failed to load premium buildings:", error);
      setBuildings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBuild = async (buildingId: string) => {
    if (slotNumber === null || building) {
      return;
    }

    setSelectedBuildingId(buildingId);
    setBuilding(true);

    try {
      const result = await buildBuildingAtSlot(buildingId, slotNumber);

      if (!result) {
        console.warn("Failed to build at selected slot.");
        return;
      }

      // 建築完了
      onBuildingBuilt();
    } catch (error) {
      console.error("Premium building failed:", error);
    } finally {
      setBuilding(false);
      setSelectedBuildingId(null);
    }
  };

  const handleClose = () => {
    if (building) {
      return;
    }

    setSelectedBuildingId(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* ヘッダー */}
          <View style={styles.header}>
            <View style={styles.headerTextWrap}>
              <Text style={styles.title}>
                {isEnglish ? "Build here" : "ここに建てる"}
              </Text>

              <Text style={styles.subtitle}>
                {isEnglish
                  ? `Choose a building for Slot No.${slotNumber}`
                  : `スロット No.${slotNumber} に建てる建物を選択`}
              </Text>
            </View>

            <Pressable
              style={styles.closeButton}
              onPress={handleClose}
              disabled={building}
            >
              <CloseIcon size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          {/* 建物一覧 */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="large"
                color={colors.primary}
              />

              <Text style={styles.loadingText}>
                {isEnglish ? "Loading..." : "読み込み中..."}
              </Text>
            </View>
          ) : buildings.length > 0 ? (
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.buildingsGrid}
              showsVerticalScrollIndicator={false}
            >
              {buildings.map((buildingType) => {
                const selected =
                  selectedBuildingId === buildingType.id;

                return (
                  <Pressable
                    key={buildingType.id}
                    style={({ pressed }) => [
                      styles.buildingCard,
                      selected && styles.buildingCardSelected,
                      pressed && styles.buildingCardPressed,
                      building && styles.buildingCardDisabled,
                    ]}
                    onPress={() => handleBuild(buildingType.id)}
                    disabled={building}
                  >
                    <View style={styles.iconWrap}>
                      <BuildingIcon
                        id={buildingType.id}
                        size={48}
                      />
                    </View>

                    <Text
                      style={styles.buildingName}
                      numberOfLines={1}
                    >
                      {isEnglish
                        ? buildingType.nameEn
                        : buildingType.nameJa}
                    </Text>

                    <Text
                      style={styles.buildingDescription}
                      numberOfLines={2}
                    >
                      {isEnglish
                        ? buildingType.descriptionEn
                        : buildingType.descriptionJa}
                    </Text>

                    {buildingType.premium && (
                      <View style={styles.premiumBadge}>
                        <Text style={styles.premiumBadgeText}>
                          PREMIUM
                        </Text>
                      </View>
                    )}

                    {selected && building && (
                      <View style={styles.buildingLoading}>
                        <ActivityIndicator
                          size="small"
                          color={colors.primary}
                        />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                {isEnglish
                  ? "No buildings available"
                  : "建築できる建物がありません"}
              </Text>

              <Text style={styles.emptyMessage}>
                {isEnglish
                  ? "There are no unbuilt buildings available for your town."
                  : "現在建築できる未建築の建物はありません。"}
              </Text>
            </View>
          )}

          {/* キャンセル */}
          <Pressable
            style={styles.cancelButton}
            onPress={handleClose}
            disabled={building}
          >
            <Text style={styles.cancelButtonText}>
              {isEnglish ? "Cancel" : "キャンセル"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalContent: {
    backgroundColor: colors.card,
    borderRadius: radius.xxl,
    width: "100%",
    maxWidth: 360,
    maxHeight: "80%",
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  headerTextWrap: {
    flex: 1,
    paddingRight: 12,
  },

  title: {
    fontSize: 21,
    color: colors.foreground,
    fontFamily: fonts.display,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    fontFamily: fonts.bodyRegular,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    flexGrow: 0,
  },

  buildingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingBottom: 8,
  },

  buildingCard: {
    width: "48%",
    minHeight: 170,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  buildingCardSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },

  buildingCardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },

  buildingCardDisabled: {
    opacity: 0.7,
  },

  iconWrap: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  buildingName: {
    fontSize: 14,
    color: colors.foreground,
    textAlign: "center",
    fontFamily: fonts.bodyBold,
    marginBottom: 4,
  },

  buildingDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
    textAlign: "center",
    fontFamily: fonts.bodyRegular,
  },

  premiumBadge: {
    position: "absolute",
    top: 7,
    right: 7,
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },

  premiumBadgeText: {
    fontSize: 8,
    color: colors.onPrimary,
    fontFamily: fonts.bodyExtraBold,
  },

  buildingLoading: {
    position: "absolute",
    right: 8,
    bottom: 8,
  },

  loadingContainer: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: fonts.bodyRegular,
  },

  emptyContainer: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 17,
    color: colors.foreground,
    fontFamily: fonts.display,
    textAlign: "center",
    marginBottom: 8,
  },

  emptyMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    fontFamily: fonts.bodyRegular,
    textAlign: "center",
  },

  cancelButton: {
    marginTop: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.muted,
    paddingVertical: 12,
    borderRadius: radius.pill,
  },

  cancelButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.bodyBold,
  },
});