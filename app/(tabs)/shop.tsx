import { View, Text, StyleSheet } from "react-native";
import { CartIcon } from "../../src/components/icons/Icons";
import { isEnglish } from "../../src/utils/language";
import { colors, fonts, radius } from "../../src/theme/theme";

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <CartIcon size={48} color={colors.primary} />
      </View>
      <Text style={styles.title}>{isEnglish ? "Shop" : "ショップ画面"}</Text>
      <Text style={styles.description}>
        {isEnglish ? "Purchase buildings and items here." : "ここで建物やアイテムを購入できます。"}
      </Text>
      <Text style={styles.hint}>
        {isEnglish ? "Collect items to decorate your town!" : "街を彩るアイテムを集めよう！"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: radius.xxl,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: colors.foreground,
    marginBottom: 10,
    fontFamily: fonts.display,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 6,
    fontFamily: fonts.bodyRegular,
  },
  hint: {
    fontSize: 13,
    color: colors.primary,
    textAlign: "center",
    fontFamily: fonts.bodySemiBold,
  },
});
