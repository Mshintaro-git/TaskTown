import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { isEnglish } from "../../src/utils/language";
import TownGrid from "../../src/components/TownGrid";
import { setOnLevelUp } from "../../src/services/levelService";
import { getNextRequiredXp } from "../../src/constants/levels";
import { initDatabase, loadPlayerState } from "../../src/services/databaseService";
import { getPlayerBuildings } from "../../src/services/buildingService";
import { getTodayQuests } from "../../src/services/questService";
import LevelUpModal from "../../src/components/LevelUpModal";
import { CharacterAvatar } from "../../src/components/icons/Icons";
import { colors, fonts, radius, shadow } from "../../src/theme/theme";

export default function TownScreen() {
  const [buildings, setBuildings] = useState<any[]>([]);
  const [level, setLevel] = useState(1);
  const [currentXp, setCurrentXp] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [dbReady, setDbReady] = useState(false);
  const [todayQuestCount, setTodayQuestCount] = useState({ completed: 0, total: 0 });

  // レベルアップモーダル
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpOld, setLevelUpOld] = useState(1);
  const [levelUpNew, setLevelUpNew] = useState(1);

  // データベース初期化と状態読み込み
  useEffect(() => {
    (async () => {
      try {
        await initDatabase();
        await loadAllData();
        setDbReady(true);
      } catch (e) {
        console.warn("Database init failed, using defaults:", e);
        setDbReady(true);
      }
    })();
  }, []);

  // 全データ読み込み
  const loadAllData = async () => {
    try {
      const state = await loadPlayerState();
      setLevel(state.level);
      setCurrentXp(state.currentXp);
      setTotalXp(state.totalXp);

      const playerBuildings = await getPlayerBuildings();
      setBuildings(playerBuildings);

      const quests = getTodayQuests();
      setTodayQuestCount({
        completed: quests.filter((q) => q.completed).length,
        total: quests.length,
      });
    } catch (e) {
      console.warn("Failed to load data:", e);
    }
  };

  // レベルアップコールバックを登録
  useEffect(() => {
    setOnLevelUp((newLevel: number, oldLevel: number) => {
      setLevelUpOld(oldLevel);
      setLevelUpNew(newLevel);
      setShowLevelUp(true);
    });
  }, []);

  // 画面がフォーカスされるたびに状態を再読み込み
  useFocusEffect(
    useCallback(() => {
      if (!dbReady) return;
      (async () => {
        await loadAllData();
      })();
    }, [dbReady])
  );

  // XPバーの進捗率
  const nextRequired = getNextRequiredXp(level);
  const progress = nextRequired > 0 ? currentXp / nextRequired : 0;
  const barWidth = Math.min(progress * 100, 100);
  const xpToGo = Math.max(nextRequired - currentXp, 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ── プレイヤーヘッダー ── */}
        <View style={styles.playerHeader}>
          <View style={styles.avatarWrap}>
            <LinearGradient
              colors={[colors.primarySoft, colors.primaryLight]}
              style={styles.avatarBg}
            >
              <CharacterAvatar size={38} />
            </LinearGradient>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>{level}</Text>
            </View>
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.adventurerLabel}>{isEnglish ? "Town" : "街画面"}</Text>
            <View style={styles.xpRow}>
              <View style={styles.xpBarBg}>
                <LinearGradient
                  colors={[colors.accent, colors.accentDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.xpBarFill, { width: `${barWidth}%` }]}
                />
              </View>
              <Text style={styles.xpText}>
                {currentXp}/{nextRequired}
              </Text>
            </View>
            <Text style={styles.xpHint}>
              {isEnglish
                ? `Lv.${level} → Lv.${level + 1} need ${xpToGo} XP`
                : `Lv.${level} → Lv.${level + 1} まで ${xpToGo} XP`}
            </Text>
          </View>
        </View>

        {/* ── 街シーン（Figmaデザイン適用範囲） ── */}
        <View style={styles.sceneWrap}>
          <LinearGradient
            colors={[colors.sky, colors.skyLight, colors.grassLight, colors.grass]}
            locations={[0, 0.5, 0.72, 1]}
            style={styles.scene}
          >
            <View style={styles.sun} pointerEvents="none" />
            <View style={styles.gridContainer}>
              <TownGrid buildings={buildings} />
            </View>
            <View style={styles.townBadge} pointerEvents="none">
              <Text style={styles.townBadgeText}>Lv.{level}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* ── 今日の進捗サマリー（画面遷移は行わない情報表示のみ） ── */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryDotRow}>
            <View style={styles.summaryDot} />
            <Text style={styles.summaryLabel}>{isEnglish ? "Today's Progress" : "今日の進捗"}</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={styles.summaryValue}>
                {todayQuestCount.completed}/{todayQuestCount.total}
              </Text>
              <Text style={styles.summaryCaption}>{isEnglish ? "Quests" : "クエスト"}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryValue, { color: colors.accentDark }]}>
                {totalXp}
              </Text>
              <Text style={styles.summaryCaption}>{isEnglish ? "Total XP" : "累計 XP"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* レベルアップモーダル */}
      <LevelUpModal
        visible={showLevelUp}
        oldLevel={levelUpOld}
        newLevel={levelUpNew}
        onClose={() => setShowLevelUp(false)}
        onBuildingBuilt={async () => {
          // 建物建築後に即座にデータを再取得
          await loadAllData();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  playerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  avatarWrap: {
    position: "relative",
  },
  avatarBg: {
    width: 58,
    height: 58,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  levelBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.background,
  },
  levelBadgeText: {
    color: colors.onPrimary,
    fontSize: 10,
    fontFamily: fonts.bodyExtraBold,
  },
  headerInfo: {
    flex: 1,
  },
  adventurerLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: fonts.bodyBold,
    marginBottom: 4,
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  xpBarBg: {
    flex: 1,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.muted,
    overflow: "hidden",
  },
  xpBarFill: {
    height: "100%",
    borderRadius: radius.pill,
  },
  xpText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: fonts.bodyBold,
  },
  xpHint: {
    fontSize: 12,
    color: colors.accentDark,
    marginTop: 4,
    fontFamily: fonts.bodySemiBold,
  },
  sceneWrap: {
    borderRadius: radius.xxl,
    overflow: "hidden",
    marginBottom: 16,
    ...shadow.card,
  },
  scene: {
    height: 380,
    position: "relative",
  },
  sun: {
    position: "absolute",
    top: 12,
    right: 24,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f8d830",
    shadowColor: "#f8d830",
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  gridContainer: {
    flex: 1,
  },
  townBadge: {
    position: "absolute",
    top: 14,
    alignSelf: "center",
    backgroundColor: "rgba(253, 246, 236, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(196, 149, 106, 0.4)",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  townBadgeText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: fonts.bodyBold,
  },
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryDotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: fonts.bodyBold,
  },
  summaryStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  summaryStat: {
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 16,
    color: colors.foreground,
    fontFamily: fonts.display,
  },
  summaryCaption: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: fonts.bodySemiBold,
  },
  summaryDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },
});
