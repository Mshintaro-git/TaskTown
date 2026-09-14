import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { PlayerQuest } from "../types/quest";
import { BackIcon, CheckIcon } from "./icons/Icons";
import { isEnglish } from "../utils/language";
import { colors, fonts, radius, shadow } from "../theme/theme";

type Props = {
  quests: PlayerQuest[];
  onToggle: (questId: string) => void;
  onBack?: () => void;
  showBack?: boolean;
  onAbort?: () => void;
};

export default function QuestExecutionView({
  quests,
  onToggle,
  onBack,
  showBack = true,
  onAbort,
}: Props) {
  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <View style={styles.container}>
      {/* 戻るボタン（表示する場合のみ） */}
      {showBack && onBack && (
        <Pressable style={styles.backButton} onPress={onBack}>
          <BackIcon size={16} color={colors.textSecondary} />
          <Text style={styles.backButtonText}>{isEnglish ? "Back" : "戻る"}</Text>
        </Pressable>
      )}

      {/* 進捗バー */}
      <View style={styles.progressSection}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width:
                  quests.length > 0
                    ? `${(completedCount / quests.length) * 100}%`
                    : "0%",
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {completedCount} / {quests.length} {isEnglish ? "Completed" : "達成"}
        </Text>
      </View>

      {/* クエストリスト */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {quests.map((quest) => (
          <Pressable
            key={quest.id}
            style={[
              styles.questCard,
              quest.completed && styles.questCardCompleted,
            ]}
            onPress={() => onToggle(quest.id)}
          >
            <View
              style={[
                styles.checkbox,
                quest.completed && styles.checkboxChecked,
              ]}
            >
              {quest.completed && <CheckIcon size={14} color={colors.onPrimary} />}
            </View>
            <Text
              style={[
                styles.questTitle,
                quest.completed && styles.questTitleCompleted,
              ]}
            >
              {quest.title}
            </Text>
            <Text style={styles.questXp}>+30 XP</Text>
          </Pressable>
        ))}

        {/* 途中でやめるボタン */}
        {onAbort && (
          <Pressable
            style={({ pressed }) => [
              styles.abortButton,
              pressed && styles.abortButtonPressed,
            ]}
            onPress={onAbort}
          >
            <Text style={styles.abortButtonText}>
              {isEnglish ? "Abort Quest" : "途中でやめる"}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButtonText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.bodySemiBold,
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  progressBarBg: {
    height: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.muted,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
    fontFamily: fonts.bodyBold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  questCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.soft,
  },
  questCardCompleted: {
    backgroundColor: colors.primarySurface,
    borderColor: colors.primary,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  questTitle: {
    flex: 1,
    fontSize: 15,
    color: colors.foreground,
    fontFamily: fonts.bodySemiBold,
  },
  questTitleCompleted: {
    textDecorationLine: "line-through",
    color: colors.textMuted,
  },
  questXp: {
    fontSize: 12,
    color: colors.accentDark,
    fontFamily: fonts.bodyBold,
  },
  abortButton: {
    backgroundColor: colors.dangerSurface,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: radius.lg,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  abortButtonPressed: {
    opacity: 0.7,
  },
  abortButtonText: {
    fontSize: 14,
    color: colors.danger,
    fontFamily: fonts.bodyBold,
  },
});
