import { useState, useCallback } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import { isEnglish } from "../../src/utils/language";
import { PlayerQuest } from "../../src/types/quest";
import {
  getTodayQuests,
  addQuest,
  createQuestFromRecommended,
  createCustomQuest,
  removeQuest,
  completeQuest,
  clearTodayQuests,
  MAX_QUESTS,
  QUEST_XP,
  startAdventure,
  completeAdventure,
  abortAdventure,
  checkAndResetDaily,
  allQuestsCompleted,
} from "../../src/services/questService";
import { addXP, loadState } from "../../src/services/levelService";
import { AdventureStatus } from "../../src/services/databaseService";
import QuestSelectionView from "../../src/components/QuestSelectionView";
import QuestExecutionView from "../../src/components/QuestExecutionView";
import { SparkleIcon } from "../../src/components/icons/Icons";
import { colors, fonts, radius } from "../../src/theme/theme";

export default function QuestScreen() {
  const [quests, setQuests] = useState<PlayerQuest[]>([]);
  const [adventureStatus, setAdventureStatus] = useState<AdventureStatus>("NOT_STARTED");
  const [currentXP, setCurrentXP] = useState(0);

  // 画面がフォーカスされるたびに状態を再読み込み
  useFocusEffect(
    useCallback(() => {
      (async () => {
        // デイリーリセットチェック
        const status = await checkAndResetDaily();
        setAdventureStatus(status);
        setQuests(getTodayQuests());

        // XP読み込み
        try {
          const state = await loadState();
          setCurrentXP(state.currentXp);
        } catch (e) {
          // ignore
        }
      })();
    }, [])
  );

  // おすすめクエストを追加
  const handleAddRecommended = (questId: string, title: string) => {
    const quest = createQuestFromRecommended(questId, title);
    if (addQuest(quest)) {
      setQuests(getTodayQuests());
    }
  };

  // 自作クエストを追加
  const handleAddCustom = (title: string) => {
    const quest = createCustomQuest(title);
    if (addQuest(quest)) {
      setQuests(getTodayQuests());
    }
  };

  // クエストを削除
  const handleRemove = (questId: string) => {
    removeQuest(questId);
    setQuests(getTodayQuests());
  };

  // クエストを達成/未達成に切り替え
  const handleToggle = async (questId: string) => {
    const result = completeQuest(questId);
    if (result) {
      setQuests(getTodayQuests());

      // レベルサービス経由でXPを追加（DB保存+レベルアップ判定）
      await addXP(QUEST_XP);

      // 全て達成したらCOMPLETED
      if (allQuestsCompleted()) {
        await completeAdventure();
        setAdventureStatus("COMPLETED");
      }
    }
  };

  // 冒険を開始
  const handleStart = async () => {
    await startAdventure();
    setAdventureStatus("IN_PROGRESS");
  };

  // 途中でやめる（確認ダイアログ表示）
  const handleAbort = () => {
    Alert.alert(
      isEnglish ? "Abort Quest?" : "クエストを中止しますか？",
      isEnglish
        ? "You can keep the XP from completed quests. Unfinished quests will end."
        : "達成済みのクエストのXPは獲得できます。未達成のクエストは終了します。",
      [
        {
          text: isEnglish ? "Cancel" : "キャンセル",
          style: "cancel",
        },
        {
          text: isEnglish ? "Abort" : "中止する",
          style: "destructive",
          onPress: async () => {
            // 達成済みクエストのXPは既に付与済みのため、XP処理は行わない（二重付与防止）
            await abortAdventure();
            // TERMINATED状態のため、その日は再受注不可
            setAdventureStatus("TERMINATED");
            setQuests(getTodayQuests());

            // XPを再読み込み（既に獲得したXPは維持される）
            try {
              const state = await loadState();
              setCurrentXP(state.currentXp);
            } catch (e) {
              // ignore
            }
          },
        },
      ]
    );
  };

  // クエスト選択に戻る（IN_PROGRESS状態では使用しない）
  const handleBack = () => {
    // IN_PROGRESS状態では選択画面に戻れない
    if (adventureStatus === "IN_PROGRESS" || adventureStatus === "COMPLETED") {
      return;
    }
  };

  return (
    <View style={styles.container}>
      {/* XPヘッダー */}
      <View style={styles.xpHeader}>
        <Text style={styles.xpLabel}>{isEnglish ? "Current XP" : "現在のXP"}</Text>
        <Text style={styles.xpValue}>{currentXP} XP</Text>
      </View>

      {/* 今日の冒険状態 */}
      <View style={styles.adventureStatusCard}>
        <Text style={styles.adventureStatusLabel}>{isEnglish ? "Today's Adventure" : "今日の冒険"}</Text>
        <Text style={styles.adventureStatusValue}>
          {quests.filter((q) => q.completed).length} / {quests.length} {isEnglish ? "Completed" : "完了"}
        </Text>
      </View>

      {/* 状態に応じて表示を切り替え */}
      {adventureStatus === "NOT_STARTED" ? (
        <QuestSelectionView
          selectedQuests={quests}
          onAddRecommended={handleAddRecommended}
          onAddCustom={handleAddCustom}
          onRemove={handleRemove}
          onStart={handleStart}
        />
      ) : adventureStatus === "TERMINATED" ? (
        /* 途中でやめた後の終了メッセージ（その日は再受注不可） */
        <View style={styles.terminatedContainer}>
          <View style={styles.terminatedIconWrap}>
            <SparkleIcon size={40} color={colors.danger} />
          </View>
          <Text style={styles.terminatedTitle}>
            {isEnglish ? "Today's quests are finished." : "今日のクエストは終了しました"}
          </Text>
          <Text style={styles.terminatedMessage}>
            {isEnglish
              ? "You can accept new quests tomorrow."
              : "新しいクエストは明日受注できます"}
          </Text>
        </View>
      ) : (
        <View style={styles.executionContainer}>
          {/* 完了メッセージ */}
          {adventureStatus === "COMPLETED" && (
            <View style={styles.completedBanner}>
              <SparkleIcon size={40} />
              <Text style={styles.completedText}>{isEnglish ? "Adventure Complete!" : "冒険完了！"}</Text>
              <Text style={styles.completedSubText}>{isEnglish ? "Great job today!" : "今日はお疲れさまでした！"}</Text>
            </View>
          )}

          <QuestExecutionView
            quests={quests}
            onToggle={handleToggle}
            showBack={false}
            // COMPLETED（通常完了）状態では「途中でやめる」を表示しない
            onAbort={adventureStatus === "COMPLETED" ? undefined : handleAbort}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  adventureStatusCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  adventureStatusLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.bodySemiBold,
  },
  adventureStatusValue: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.bodyExtraBold,
  },
  xpLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontFamily: fonts.bodySemiBold,
  },
  xpValue: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: fonts.bodyExtraBold,
  },
  executionContainer: {
    flex: 1,
  },
  completedBanner: {
    backgroundColor: colors.primarySurface,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    alignItems: "center",
  },
  completedText: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: fonts.display,
    textAlign: "center",
    marginTop: 8,
  },
  completedSubText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
    fontFamily: fonts.bodyRegular,
  },
  terminatedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  terminatedIconWrap: {
    marginBottom: 16,
  },
  terminatedTitle: {
    fontSize: 20,
    color: colors.foreground,
    textAlign: "center",
    marginBottom: 8,
    fontFamily: fonts.display,
  },
  terminatedMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    fontFamily: fonts.bodyRegular,
  },
});
