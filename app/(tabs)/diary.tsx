import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { isEnglish } from "../../src/utils/language";
import { getTodayDiary, getPastDiaries, AdventureDiary } from "../../src/services/adventureDiaryService";
import { BookIcon, CheckIcon, HomeIcon } from "../../src/components/icons/Icons";
import { colors, fonts, radius, shadow } from "../../src/theme/theme";

export default function DiaryScreen() {
  const [todayDiary, setTodayDiary] = useState<AdventureDiary | null>(null);
  const [pastDiaries, setPastDiaries] = useState<AdventureDiary[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<AdventureDiary | null>(null);

  // 画面がフォーカスされるたびにデータを再読み込み
  useFocusEffect(
    useCallback(() => {
      loadDiaries();
    }, [])
  );

  const loadDiaries = async () => {
    const today = await getTodayDiary();
    setTodayDiary(today);

    const past = await getPastDiaries();
    setPastDiaries(past.filter((d) => d.date !== today?.date));
  };

  // 日記を選択
  const handleSelectDiary = (diary: AdventureDiary) => {
    setSelectedDiary(diary);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setSelectedDiary(null);
  };

  // 日付をフォーマット（YYYY-MM-DD → YYYY/MM/DD）
  const formatDate = (date: string): string => {
    return date.replace(/-/g, "/");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* 今日の冒険 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{isEnglish ? "【Today's Adventure】" : "【今日の冒険】"}</Text>

          {todayDiary ? (
            <View style={[styles.diaryCard, styles.todayCard]}>
              {/* 日付表示 */}
              <View style={styles.dateHeader}>
                <BookIcon size={20} />
                <Text style={styles.dateText}>{formatDate(todayDiary.date)}</Text>
                <View style={styles.todayBadge}>
                  <Text style={styles.todayBadgeText}>{isEnglish ? "Today" : "今日"}</Text>
                </View>
              </View>

              {/* クエスト履歴 */}
              <View style={styles.questSection}>
                <Text style={styles.questTitle}>{isEnglish ? "Quest History" : "クエスト履歴"}</Text>
                {todayDiary.questData.split("\n").map((quest, index) => (
                  <View key={index} style={styles.questItemRow}>
                    <CheckIcon size={13} color={colors.primary} />
                    <Text style={styles.questItem}>{quest}</Text>
                  </View>
                ))}
              </View>

              {/* 獲得XP */}
              <View style={styles.xpSection}>
                <Text style={styles.xpText}>{isEnglish ? `+${todayDiary.earnedXp} XP` : `+${todayDiary.earnedXp} XP`}</Text>
              </View>

              {/* 街の成果 */}
              <View style={styles.buildingSection}>
                <Text style={styles.buildingTitle}>{isEnglish ? "Town Achievement" : "街の成果"}</Text>
                {todayDiary.builtBuildingId ? (
                  <View style={styles.questItemRow}>
                    <HomeIcon size={16} color={colors.primary} />
                    <Text style={styles.buildingText}>
                      {isEnglish ? "Building completed today" : "今日完成した建物"}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.buildingText}>
                    {isEnglish ? "No new changes in town today" : "今日は街に新しい変化はありませんでした"}
                  </Text>
                )}
              </View>

              {/* 冒険日記本文 */}
              <View style={styles.diaryTextSection}>
                <Text style={styles.diaryText}>{todayDiary.diaryText}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <BookIcon size={32} />
              <Text style={styles.emptyText}>
                {isEnglish ? "Today's adventure diary has not been generated yet." : "今日の冒険日記はまだ生成されていません。"}
              </Text>
              <Text style={styles.emptyHint}>
                {isEnglish ? "Complete 3 quests to generate your adventure diary." : "クエストを3つ達成すると、冒険日記が生成されます。"}
              </Text>
            </View>
          )}
        </View>

        {/* 過去の冒険日記 */}
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <BookIcon size={18} />
            <Text style={styles.sectionTitle}>{isEnglish ? "Adventure Diary" : "冒険日記"}</Text>
          </View>

          {pastDiaries.length === 0 ? (
            <Text style={styles.noHistoryText}>{isEnglish ? "No past adventure diaries." : "過去の冒険日記はありません。"}</Text>
          ) : (
            pastDiaries.map((diary) => (
              <Pressable
                key={diary.id}
                style={styles.historyItem}
                onPress={() => handleSelectDiary(diary)}
              >
                <View style={styles.historyDateRow}>
                  <BookIcon size={14} />
                  <Text style={styles.historyDate}>{formatDate(diary.date)}</Text>
                </View>
                <Text style={styles.historyPreview} numberOfLines={1}>
                  {diary.diaryText.split("\n")[0]}
                </Text>
                <View style={styles.historyMeta}>
                  <Text style={styles.historyXp}>{isEnglish ? `+${diary.earnedXp} XP` : `+${diary.earnedXp} XP`}</Text>
                  {diary.builtBuildingId && (
                    <View style={styles.historyBuildingRow}>
                      <HomeIcon size={12} color={colors.primary} />
                      <Text style={styles.historyBuilding}>{isEnglish ? "Building completed today" : "今日完成した建物"}</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>

      {/* 過去日記詳細モーダル（ネイティブModalで完全にレイヤー分離） */}
      <Modal
        visible={selectedDiary !== null}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        {selectedDiary && (
          <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
            <Pressable style={styles.modalContent} onPress={() => {}}>
              <View style={styles.modalDateRow}>
                <BookIcon size={20} />
                <Text style={styles.modalDate}>{formatDate(selectedDiary.date)}</Text>
              </View>

              <ScrollView>
                {/* クエスト履歴 */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>{isEnglish ? "Quest History" : "クエスト履歴"}</Text>
                  {selectedDiary.questData.split("\n").map((quest, index) => (
                    <View key={index} style={styles.questItemRow}>
                      <CheckIcon size={12} color={colors.textSecondary} />
                      <Text style={styles.modalQuestItem}>{quest}</Text>
                    </View>
                  ))}
                </View>

                {/* 獲得XP */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalXpText}>{isEnglish ? `+${selectedDiary.earnedXp} XP` : `+${selectedDiary.earnedXp} XP`}</Text>
                </View>

                {/* 冒険日記本文 */}
                <View style={styles.modalSection}>
                  <Text style={styles.modalDiaryText}>{selectedDiary.diaryText}</Text>
                </View>
              </ScrollView>

              {/* 閉じるボタン */}
              <Pressable style={styles.closeButton} onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>{isEnglish ? "Close" : "閉じる"}</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.foreground,
    marginBottom: 12,
    fontFamily: fonts.display,
  },
  diaryCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.soft,
  },
  todayCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  dateHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateText: {
    fontSize: 17,
    color: colors.foreground,
    flex: 1,
    fontFamily: fonts.bodyBold,
  },
  todayBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  todayBadgeText: {
    color: colors.onPrimary,
    fontSize: 12,
    fontFamily: fonts.bodyBold,
  },
  questSection: {
    marginBottom: 16,
  },
  questTitle: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
    fontFamily: fonts.bodyExtraBold,
  },
  questItemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  questItem: {
    fontSize: 14,
    color: colors.foreground,
    fontFamily: fonts.bodyRegular,
  },
  xpSection: {
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  xpText: {
    fontSize: 17,
    color: colors.goldDark,
    textAlign: "center",
    fontFamily: fonts.display,
  },
  buildingSection: {
    marginBottom: 16,
  },
  buildingTitle: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
    fontFamily: fonts.bodyExtraBold,
  },
  buildingText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.bodyRegular,
  },
  diaryTextSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  diaryText: {
    fontSize: 14,
    color: colors.foreground,
    lineHeight: 22,
    fontFamily: fonts.bodyRegular,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    fontFamily: fonts.bodyBold,
  },
  emptyHint: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    fontFamily: fonts.bodyRegular,
  },
  noHistoryText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    paddingVertical: 20,
    fontFamily: fonts.bodyRegular,
  },
  historyItem: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.bodyBold,
  },
  historyPreview: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
    fontFamily: fonts.bodyRegular,
  },
  historyMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.muted,
    paddingTop: 8,
  },
  historyXp: {
    fontSize: 12,
    color: colors.goldDark,
    fontFamily: fonts.bodyBold,
  },
  historyBuildingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  historyBuilding: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.bodySemiBold,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    maxWidth: 400,
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  modalDateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  modalDate: {
    fontSize: 17,
    color: colors.primary,
    textAlign: "center",
    fontFamily: fonts.display,
  },
  modalSection: {
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 15,
    color: colors.foreground,
    marginBottom: 8,
    fontFamily: fonts.bodyExtraBold,
  },
  modalQuestItem: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.bodyRegular,
  },
  modalXpText: {
    fontSize: 17,
    color: colors.goldDark,
    textAlign: "center",
    fontFamily: fonts.display,
  },
  modalDiaryText: {
    fontSize: 14,
    color: colors.foreground,
    lineHeight: 22,
    fontFamily: fonts.bodyRegular,
  },
  closeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: radius.pill,
    marginTop: 16,
  },
  closeButtonText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontFamily: fonts.bodyBold,
  },
});
