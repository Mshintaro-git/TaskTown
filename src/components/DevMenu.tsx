import { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert, ScrollView } from "react-native";
import { addXP } from "../services/levelService";
import {
  resetDailyAdventure,
  resetLevel,
  resetBuildings,
  resetAllData,
  getDebugInfo,
  skipToNextDay,
} from "../services/databaseService";
import { clearTodayQuests, checkAndResetDaily } from "../services/questService";
import { colors, fonts, radius } from "../theme/theme";

type Props = {
  onDataChanged: () => void;
};

export default function DevMenu({ onDataChanged }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [debugInfo, setDebugInfo] = useState<{
    level: number;
    currentXp: number;
    totalXp: number;
    lastPlayDate: string | null;
    adventureStatus: string;
    buildingCount: number;
  } | null>(null);

  // デバッグ情報を読み込み
  const loadDebugInfo = async () => {
    const info = await getDebugInfo();
    setDebugInfo({
      ...info,
      adventureStatus: info.adventureStatus,
    });
  };

  // 今日の冒険をリセット
  const handleResetDaily = async () => {
    Alert.alert("確認", "今日の冒険をリセットしますか？", [
      { text: "キャンセル", style: "cancel" },
      {
        text: "リセット",
        style: "destructive",
        onPress: async () => {
          await resetDailyAdventure();
          onDataChanged();
          loadDebugInfo();
        },
      },
    ]);
  };

  // XP追加
  const handleAddXP = async (amount: number) => {
    await addXP(amount);
    onDataChanged();
    loadDebugInfo();
  };

  // レベルリセット
  const handleResetLevel = async () => {
    Alert.alert("確認", "レベルをLv1にリセットしますか？建物は維持されます。", [
      { text: "キャンセル", style: "cancel" },
      {
        text: "リセット",
        style: "destructive",
        onPress: async () => {
          await resetLevel();
          onDataChanged();
          loadDebugInfo();
        },
      },
    ]);
  };

  // 建物リセット
  const handleResetBuildings = async () => {
    Alert.alert("確認", "建物を全て削除しますか？レベルは維持されます。", [
      { text: "キャンセル", style: "cancel" },
      {
        text: "削除",
        style: "destructive",
        onPress: async () => {
          await resetBuildings();
          onDataChanged();
          loadDebugInfo();
        },
      },
    ]);
  };

  // 全データ削除
  const handleResetAll = async () => {
    Alert.alert(
      "確認",
      "全てのデータを削除しますか？この操作は取り消せません。",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "削除",
          style: "destructive",
          onPress: async () => {
            await resetAllData();
            onDataChanged();
            loadDebugInfo();
          },
        },
      ]
    );
  };

  // 翌日にスキップ
  const handleSkipToNextDay = async () => {
    Alert.alert("確認", "翌日にスキップしますか？", [
      { text: "キャンセル", style: "cancel" },
      {
        text: "スキップ",
        onPress: async () => {
          await skipToNextDay();
          // メモリ内のクエストをクリア
          clearTodayQuests();
          // デイリーリセットを実行
          await checkAndResetDaily();
          onDataChanged();
          loadDebugInfo();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <Pressable
        style={styles.header}
        onPress={() => {
          setExpanded(!expanded);
          if (!expanded) {
            loadDebugInfo();
          }
        }}
      >
        <Text style={styles.headerText}>開発者メニュー</Text>
        <Text style={styles.expandText}>{expanded ? "▼" : "▶"}</Text>
      </Pressable>

      {/* コンテンツ */}
      {expanded && (
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {/* デバッグ情報 */}
          {debugInfo && (
            <View style={styles.debugSection}>
              <Text style={styles.debugTitle}>現在の状態</Text>
              <Text style={styles.debugText}>レベル: Lv{debugInfo.level}</Text>
              <Text style={styles.debugText}>
                XP: {debugInfo.currentXp} / 累積: {debugInfo.totalXp}
              </Text>
              <Text style={styles.debugText}>
                今日の状態: {debugInfo.adventureStatus}
              </Text>
              <Text style={styles.debugText}>
                建築数: {debugInfo.buildingCount}
              </Text>
            </View>
          )}

          {/* 機能ボタン */}
          <View style={styles.buttonSection}>
            <Text style={styles.sectionTitle}>操作</Text>

            {/* 翌日にスキップ */}
            <Pressable style={styles.button} onPress={handleSkipToNextDay}>
              <Text style={styles.buttonText}>翌日にスキップ</Text>
            </Pressable>

            {/* 今日の冒険リセット */}
            <Pressable style={styles.button} onPress={handleResetDaily}>
              <Text style={styles.buttonText}>今日の冒険をリセット</Text>
            </Pressable>

            {/* XP追加 */}
            <View style={styles.row}>
              <Pressable
                style={[styles.button, styles.xpButton]}
                onPress={() => handleAddXP(30)}
              >
                <Text style={styles.buttonText}>+30 XP</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.xpButton]}
                onPress={() => handleAddXP(100)}
              >
                <Text style={styles.buttonText}>+100 XP</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.xpButton]}
                onPress={() => handleAddXP(500)}
              >
                <Text style={styles.buttonText}>+500 XP</Text>
              </Pressable>
            </View>

            {/* レベルリセット */}
            <Pressable style={styles.button} onPress={handleResetLevel}>
              <Text style={styles.buttonText}>レベルリセット (Lv1)</Text>
            </Pressable>

            {/* 建物リセット */}
            <Pressable style={styles.button} onPress={handleResetBuildings}>
              <Text style={styles.buttonText}>建物リセット</Text>
            </Pressable>

            {/* 全データ削除 */}
            <Pressable
              style={[styles.button, styles.dangerButton]}
              onPress={handleResetAll}
            >
              <Text style={styles.buttonText}>全データ削除</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 15,
    color: colors.secondary,
    fontFamily: fonts.bodyExtraBold,
  },
  expandText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  content: {
    maxHeight: 400,
  },
  contentContainer: {
    gap: 16,
    paddingBottom: 20,
  },
  debugSection: {
    backgroundColor: colors.cardAlt,
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  debugTitle: {
    fontSize: 13,
    color: colors.primary,
    marginBottom: 8,
    fontFamily: fonts.bodyExtraBold,
  },
  debugText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
    fontFamily: fonts.bodyRegular,
  },
  buttonSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 4,
    fontFamily: fonts.bodyExtraBold,
  },
  button: {
    backgroundColor: colors.cardAlt,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  xpButton: {
    flex: 1,
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  dangerButton: {
    backgroundColor: colors.dangerSurface,
    borderColor: colors.danger,
  },
  buttonText: {
    color: colors.foreground,
    fontSize: 14,
    fontFamily: fonts.bodySemiBold,
  },
});