import { View, Text, StyleSheet, Pressable, ScrollView, Linking } from "react-native";
import { isEnglish } from "../../src/utils/language";
import DevMenu from "../../src/components/DevMenu";
import { GearIcon } from "../../src/components/icons/Icons";
import { LINKS } from "../../src/constants/links";
import { colors, fonts, radius } from "../../src/theme/theme";

export default function SettingsScreen() {
  // 外部リンクを開く（端末の既定ブラウザで開く）
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.warn("Failed to open URL:", err);
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.iconWrap}>
        <GearIcon size={48} color={colors.primary} />
      </View>
      <Text style={styles.title}>{isEnglish ? "Settings" : "設定画面"}</Text>
      <Text style={styles.description}>
        {isEnglish ? "Change app settings." : "アプリの設定を変更できます。"}
      </Text>

      <View style={[styles.settingItem, styles.settingItemLast]}>
        <Text style={styles.settingLabel}>{isEnglish ? "Version" : "バージョン"}</Text>
        <Text style={styles.settingValue}>1.0.0</Text>
      </View>

      {/* 利用規約・プライバシーポリシー（Google Sitesへ遷移） */}
      <View style={styles.legalSection}>
        <Pressable
          style={styles.legalItem}
          onPress={() => openLink(LINKS.TERMS)}
        >
          <Text style={styles.legalItemText}>
            {isEnglish ? "📄 Terms of Service" : "📄 利用規約"}
          </Text>
          <Text style={styles.legalItemArrow}>›</Text>
        </Pressable>
        <Pressable
          style={styles.legalItem}
          onPress={() => openLink(LINKS.PRIVACY)}
        >
          <Text style={styles.legalItemText}>
            {isEnglish ? "🔒 Privacy Policy" : "🔒 プライバシーポリシー"}
          </Text>
          <Text style={styles.legalItemArrow}>›</Text>
        </Pressable>
      </View>

      {/* 開発者メニュー（__DEV__のみ表示） */}
      {__DEV__ && <DevMenu onDataChanged={() => {}} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  iconWrap: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    color: colors.foreground,
    textAlign: "center",
    marginBottom: 8,
    fontFamily: fonts.display,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 28,
    fontFamily: fonts.bodyRegular,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLabel: {
    fontSize: 15,
    color: colors.foreground,
    fontFamily: fonts.bodySemiBold,
  },
  settingValue: {
    fontSize: 15,
    color: colors.textMuted,
    fontFamily: fonts.bodyRegular,
  },
  legalSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  legalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  legalItemText: {
    fontSize: 15,
    color: colors.foreground,
    fontFamily: fonts.bodySemiBold,
  },
  legalItemArrow: {
    fontSize: 20,
    color: colors.textMuted,
  },
});