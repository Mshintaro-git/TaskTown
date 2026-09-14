import { useState, useEffect } from "react";
import { View, Text, Modal, Pressable, StyleSheet, Animated } from "react-native";
import { isEnglish } from "../utils/language";
import { getBuildingCandidates, buildBuilding } from "../services/buildingService";
import { BuildingIcon } from "./icons/BuildingIcons";
import { SparkleIcon, CloseIcon } from "./icons/Icons";
import { colors, fonts, radius, shadow } from "../theme/theme";

type Props = {
  visible: boolean;
  oldLevel: number;
  newLevel: number;
  onClose: () => void;
  onBuildingBuilt: () => void;
};

type BuildingCandidate = {
  building: {
    id: string;
    nameJa: string;
    nameEn: string;
    descriptionJa: string;
    descriptionEn: string;
    icon: string;
  };
  slotNumber: number;
};

export default function LevelUpModal({
  visible,
  oldLevel,
  newLevel,
  onClose,
  onBuildingBuilt,
}: Props) {
  const [candidates, setCandidates] = useState<BuildingCandidate[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [building, setBuilding] = useState(false);
  const [showCandidates, setShowCandidates] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [completedBuildingId, setCompletedBuildingId] = useState("");
  const [completedBuildingName, setCompletedBuildingName] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];
  const completeAnim = useState(new Animated.Value(0))[0];

  // アニメーション再生
  useEffect(() => {
    if (visible) {
      setShowCandidates(false);
      setCandidates([]);
      setSelected(null);
      setBuilding(false);
      setShowComplete(false);
      setCompletedBuildingName("");
      setCompletedBuildingId("");
      completeAnim.setValue(0);

      // レベルアップ演出アニメーション（シンプルなフェードイン）
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // 少し待ってから建物選択へ
        setTimeout(() => {
          setShowCandidates(true);
          loadCandidates();
        }, 1200);
      });
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const loadCandidates = async () => {
    const result = await getBuildingCandidates(newLevel);
    setCandidates(result);
  };

  // 建物を選択
  const handleSelect = async (buildingId: string) => {
    setSelected(buildingId);
    setBuilding(true);

    await buildBuilding(buildingId);

    setBuilding(false);

    // 建築完了演出
    const buildingType = candidates.find((c) => c.building.id === buildingId);
    setCompletedBuildingId(buildingType?.building.id ?? "");
    setCompletedBuildingName(
      isEnglish
        ? (buildingType?.building.nameEn ?? "")
        : (buildingType?.building.nameJa ?? "")
    );
    setShowComplete(true);

    // アニメーションを再生（コールバックに依存せず、必ずonCloseを呼ぶ）
    Animated.timing(completeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // 必ずモーダルを閉じる（アニメーション完了を待たない）
    setTimeout(() => {
      onBuildingBuilt();
      onClose();
    }, 1800);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* レベルアップ演出 */}
          {!showCandidates && (
            <Animated.View
              style={[
                styles.celebrationContainer,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              <View style={styles.celebrationIconWrap}>
                <SparkleIcon size={64} />
              </View>
              <Text style={styles.celebrationTitle}>{isEnglish ? "Level Up!" : "レベルアップ！"}</Text>
              <Text style={styles.celebrationMessage}>
                {isEnglish ? "Congratulations!" : "おめでとうございます！"}
              </Text>
              <Text style={styles.celebrationLevel}>
                {`Lv${oldLevel} → Lv${newLevel}`}
              </Text>
              <Text style={styles.celebrationSubMessage}>
                {isEnglish ? "Your adventure experience has grown." : "あなたの冒険経験が成長しました。"}
              </Text>
            </Animated.View>
          )}

          {/* 建築完了演出 */}
          {showComplete && (
            <Animated.View
              style={[
                styles.completeContainer,
                {
                  opacity: completeAnim,
                  transform: [{ scale: completeAnim }],
                },
              ]}
            >
              <View style={styles.completeIconWrap}>
                <BuildingIcon id={completedBuildingId} size={64} />
              </View>
              <Text style={styles.completeTitle}>{isEnglish ? "Building Complete!" : "建築完了！"}</Text>
              <Text style={styles.completeMessage}>
                {isEnglish
                  ? `${completedBuildingName} was built in your town.`
                  : `${completedBuildingName}が街に完成しました。`}
              </Text>
            </Animated.View>
          )}

          {/* 建物選択 */}
          {showCandidates && !showComplete && (
            <View style={styles.buildingSelectionContainer}>
              <Text style={styles.buildingSelectionTitle}>
                {isEnglish ? "Select a new building" : "新しい建物を選択できます"}
              </Text>

              {/* 建物候補 */}
              {showCandidates && candidates.length > 0 ? (
                <View style={styles.candidatesSection}>
                  <View style={styles.candidatesRow}>
                    {candidates.map((candidate) => (
                      <Pressable
                        key={candidate.building.id}
                        style={[
                          styles.candidateButton,
                          selected === candidate.building.id && styles.candidateSelected,
                          building && styles.candidateDisabled,
                        ]}
                        onPress={() => handleSelect(candidate.building.id)}
                        disabled={building}
                      >
                        <View style={styles.candidateIconWrap}>
                          <BuildingIcon id={candidate.building.id} size={40} />
                        </View>
                        <Text style={styles.candidateName}>
                          {isEnglish ? candidate.building.nameEn : candidate.building.nameJa}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                  {building && (
                    <Text style={styles.buildingText}>{isEnglish ? "Building..." : "建築中..."}</Text>
                  )}
                </View>
              ) : showCandidates && candidates.length === 0 ? (
                <View style={styles.noCandidatesSection}>
                  <View style={styles.noCandidatesIconWrap}>
                    <SparkleIcon size={40} />
                  </View>
                  <Text style={styles.noCandidatesTitle}>{isEnglish ? "No buildings available" : "建築できる建物はありません"}</Text>
                  <Text style={styles.noCandidatesMessage}>
                    {isEnglish
                      ? "Your town has built all available buildings."
                      : "あなたの街は現在建築できる建物をすべて建てました。"}
                  </Text>
                </View>
              ) : null}

              {/* 候補が0件の場合のみ閉じるボタンを表示 */}
              {showCandidates && candidates.length === 0 && (
                <Pressable style={styles.closeButton} onPress={onClose}>
                  <CloseIcon size={18} color={colors.textSecondary} />
                </Pressable>
              )}
            </View>
          )}
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
    padding: 32,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: radius.xxl,
    padding: 32,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.primary,
    ...shadow.card,
  },
  celebrationContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  celebrationIconWrap: {
    marginBottom: 16,
  },
  celebrationTitle: {
    fontSize: 26,
    color: colors.goldDark,
    marginBottom: 12,
    textAlign: "center",
    fontFamily: fonts.display,
  },
  celebrationMessage: {
    fontSize: 16,
    color: colors.foreground,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: fonts.bodyRegular,
  },
  celebrationLevel: {
    fontSize: 22,
    color: colors.primary,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: fonts.display,
  },
  celebrationSubMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 8,
    fontFamily: fonts.bodyRegular,
  },
  completeContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  completeIconWrap: {
    marginBottom: 16,
  },
  completeTitle: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 12,
    textAlign: "center",
    fontFamily: fonts.display,
  },
  completeMessage: {
    fontSize: 16,
    color: colors.foreground,
    textAlign: "center",
    lineHeight: 24,
    fontFamily: fonts.bodyRegular,
  },
  buildingSelectionContainer: {
    alignItems: "center",
    width: "100%",
  },
  buildingSelectionTitle: {
    fontSize: 17,
    color: colors.foreground,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: fonts.display,
  },
  candidatesSection: {
    width: "100%",
    alignItems: "center",
  },
  candidatesRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  candidateButton: {
    backgroundColor: colors.cardAlt,
    borderRadius: radius.lg,
    padding: 14,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.border,
    minWidth: 84,
  },
  candidateSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySurface,
  },
  candidateDisabled: {
    opacity: 0.5,
  },
  candidateIconWrap: {
    marginBottom: 8,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  candidateName: {
    fontSize: 13,
    color: colors.foreground,
    fontFamily: fonts.bodySemiBold,
  },
  buildingText: {
    color: colors.primary,
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
    fontFamily: fonts.bodySemiBold,
  },
  noCandidatesSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noCandidatesIconWrap: {
    marginBottom: 12,
  },
  noCandidatesTitle: {
    fontSize: 16,
    color: colors.foreground,
    marginBottom: 12,
    textAlign: "center",
    fontFamily: fonts.display,
  },
  noCandidatesMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16,
    fontFamily: fonts.bodyRegular,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
});