import { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { isEnglish } from "../utils/language";
import { RECOMMENDED_QUESTS } from "../data/recommendedQuests";
import { MAX_QUESTS } from "../services/questService";
import { PlayerQuest, RecommendedQuest } from "../types/quest";
import AddQuestModal from "./AddQuestModal";
import { RecommendedQuestIcon, PlusIcon } from "./icons/Icons";
import { colors, fonts, radius } from "../theme/theme";

type Props = {
  selectedQuests: PlayerQuest[];
  onAddRecommended: (questId: string, title: string) => void;
  onAddCustom: (title: string) => void;
  onRemove: (questId: string) => void;
  onStart: () => void;
};

export default function QuestSelectionView({
  selectedQuests,
  onAddRecommended,
  onAddCustom,
  onRemove,
  onStart,
}: Props) {
  const [showAddModal, setShowAddModal] = useState(false);

  // 現在の言語（英語ならen、それ以外はja）
  const lang = isEnglish ? "en" : "ja";

  const remaining = MAX_QUESTS - selectedQuests.length;
  const selectedTitles = new Set(selectedQuests.map((q) => q.title));

  // おすすめクエストの選択状態を判定（現在の言語のタイトルで比較）
  const isSelected = (quest: RecommendedQuest) => selectedTitles.has(quest.title[lang]);

  // おすすめクエストをタップした時の処理
  const handleQuestPress = (quest: RecommendedQuest) => {
    if (isSelected(quest)) {
      // 既に選択済みなら解除
      const target = selectedQuests.find((q) => q.title === quest.title[lang]);
      if (target) onRemove(target.id);
    } else if (remaining > 0) {
      // 空きがあれば選択（現在の言語のタイトルで追加）
      onAddRecommended(quest.id, quest.title[lang]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.title}>{isEnglish ? "Choose Today's Adventure" : "今日の冒険を選ぼう"}</Text>
          <Text style={styles.subtitle}>
            {isEnglish ? `${remaining} slots remaining` : `残り ${remaining} 個選択できます`}
          </Text>
        </View>

        {/* おすすめクエスト一覧 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{isEnglish ? "Recommended Quests" : "おすすめクエスト"}</Text>
          {RECOMMENDED_QUESTS.map((quest) => {
            const selected = isSelected(quest);
            const full = remaining <= 0 && !selected;
            return (
              <Pressable
                key={quest.id}
                onPress={() => handleQuestPress(quest)}
                disabled={full}
                style={({ pressed }) => [
                  styles.questRow,
                  selected && styles.questRowSelected,
                  full && styles.questRowDisabled,
                  pressed && styles.questRowPressed,
                ]}
              >
                <View style={styles.questIconWrap}>
                  <RecommendedQuestIcon questId={quest.id} size={22} />
                </View>
                <View style={styles.questInfo}>
                  <Text style={styles.questTitle}>{quest.title[lang]}</Text>
                  <Text style={styles.questDesc}>{quest.description[lang]}</Text>
                </View>
                <View style={styles.questRight}>
                  <Text style={styles.questXp}>30 XP</Text>
                  {selected && <Text style={styles.selectedBadge}>{isEnglish ? "Selected" : "選択中"}</Text>}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* 自作クエスト追加 */}
        <Pressable
          style={[
            styles.addButton,
            remaining <= 0 && styles.addButtonDisabled,
          ]}
          onPress={() => setShowAddModal(true)}
          disabled={remaining <= 0}
        >
          <PlusIcon size={18} color={colors.primary} />
          <Text style={styles.addButtonText}>{isEnglish ? "Add Quest" : "クエスト追加"}</Text>
        </Pressable>

        {/* 今日の冒険を開始 */}
        {selectedQuests.length > 0 && (
          <Pressable
            style={styles.startButton}
            onPress={onStart}
          >
            <Text style={styles.startButtonText}>{isEnglish ? "Start Today's Adventure" : "今日の冒険を開始"}</Text>
            <Text style={styles.startButtonSub}>
              {isEnglish ? `Challenge ${selectedQuests.length} quests` : `${selectedQuests.length}個のクエストに挑戦`}
            </Text>
          </Pressable>
        )}
      </ScrollView>

      {/* 自作クエスト追加モーダル */}
      <AddQuestModal
        visible={showAddModal}
        onAdd={(title) => {
          onAddCustom(title);
          setShowAddModal(false);
        }}
        onClose={() => setShowAddModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 19,
    color: colors.foreground,
    marginBottom: 4,
    fontFamily: fonts.display,
  },
  subtitle: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.bodySemiBold,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: fonts.bodyExtraBold,
  },
  questRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySurface,
  },
  questRowDisabled: {
    opacity: 0.4,
  },
  questRowPressed: {
    opacity: 0.8,
  },
  questIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  questInfo: {
    flex: 1,
  },
  questTitle: {
    fontSize: 15,
    color: colors.foreground,
    marginBottom: 2,
    fontFamily: fonts.bodyBold,
  },
  questDesc: {
    fontSize: 12,
    color: colors.textMuted,
    fontFamily: fonts.bodyRegular,
  },
  questRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  questXp: {
    fontSize: 12,
    color: colors.accentDark,
    fontFamily: fonts.bodyBold,
  },
  selectedBadge: {
    fontSize: 11,
    color: colors.primary,
    backgroundColor: colors.primarySurface,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.sm,
    overflow: "hidden",
    fontFamily: fonts.bodyBold,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.cardAlt,
    borderRadius: radius.lg,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderStyle: "dashed",
    marginBottom: 20,
  },
  addButtonDisabled: {
    opacity: 0.4,
  },
  addButtonText: {
    fontSize: 15,
    color: colors.primary,
    fontFamily: fonts.bodyBold,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    paddingVertical: 16,
    alignItems: "center",
  },
  startButtonText: {
    color: colors.onPrimary,
    fontSize: 18,
    fontFamily: fonts.display,
  },
  startButtonSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginTop: 4,
    fontFamily: fonts.bodySemiBold,
  },
});
