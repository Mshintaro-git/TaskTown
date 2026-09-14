import { View, Text, Pressable, StyleSheet } from "react-native";
import { PlayerQuest } from "../types/quest";
import { CheckIcon } from "./icons/Icons";
import { colors, fonts, radius, shadow } from "../theme/theme";

type Props = {
  quest: PlayerQuest;
  onPress?: (questId: string) => void;
  onToggle?: (questId: string) => void;
  selected?: boolean;
  showCheckbox?: boolean;
};

export default function QuestCard({
  quest,
  onPress,
  onToggle,
  selected,
  showCheckbox,
}: Props) {
  return (
    <Pressable
      onPress={() => onPress?.(quest.id)}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        quest.completed && styles.cardCompleted,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.content}>
        {/* チェックボックス（実行状態の場合） */}
        {showCheckbox && (
          <Pressable
            onPress={() => onToggle?.(quest.id)}
            style={[
              styles.checkbox,
              quest.completed && styles.checkboxChecked,
            ]}
          >
            {quest.completed && <CheckIcon size={14} color={colors.onPrimary} />}
          </Pressable>
        )}

        {/* クエスト情報 */}
        <View style={styles.info}>
          <Text
            style={[
              styles.title,
              quest.completed && styles.titleCompleted,
            ]}
            numberOfLines={1}
          >
            {quest.title}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.xpBadge}>{quest.xp} XP</Text>
            <Text style={styles.typeLabel}>
              {quest.type === "recommended" ? "おすすめ" : "自作"}
            </Text>
          </View>
        </View>

        {/* 選択状態のインジケーター（達成とは別の表示） */}
        {selected && !showCheckbox && <View style={styles.selectedDot} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.soft,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySurface,
  },
  cardCompleted: {
    backgroundColor: colors.primarySurface,
    borderColor: colors.primary,
  },
  cardPressed: {
    opacity: 0.85,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
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
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: colors.foreground,
    marginBottom: 4,
    fontFamily: fonts.bodySemiBold,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: colors.textMuted,
  },
  meta: {
    flexDirection: "row",
    gap: 8,
  },
  xpBadge: {
    fontSize: 11,
    color: colors.accentDark,
    fontFamily: fonts.bodyBold,
  },
  typeLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontFamily: fonts.bodyRegular,
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});
