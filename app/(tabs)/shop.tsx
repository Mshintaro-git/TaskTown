import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { CartIcon } from "../../src/components/icons/Icons";
import BuildingIcon from "../../src/components/icons/BuildingIcons";
import { isEnglish } from "../../src/utils/language";
import { colors, fonts, radius } from "../../src/theme/theme";
import {
  getRevenueCatOfferings,
  purchasePremium,
} from "../../src/lib/revenueCat";

export default function ShopScreen() {
  const [offering, setOffering] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const loadOfferings = async () => {
      const offerings = await getRevenueCatOfferings();

      // RevenueCatの「default」ではなく、
      // Task Town用に作成した「tasktown_premium」を使用する
      const premiumOffering = offerings?.all?.tasktown_premium;

      if (premiumOffering) {
        setOffering(premiumOffering);
      }

      setLoading(false);
    };

    loadOfferings();
  }, []);

  const handlePurchase = async () => {
    if (!offering) return;

    const packageToPurchase = Object.values(
      offering.availablePackages
    )[0] as any;

    if (!packageToPurchase) {
      Alert.alert(
        isEnglish ? "Unavailable" : "利用できません",
        isEnglish
          ? "The premium product is currently unavailable."
          : "現在、プレミアム商品を利用できません。"
      );
      return;
    }

    setPurchasing(true);

    try {
      const customerInfo = await purchasePremium(packageToPurchase);

      if (customerInfo) {
        Alert.alert(
          isEnglish
            ? "Premium Activated!"
            : "プレミアムが有効になりました！",
          isEnglish
            ? "Thank you for subscribing to Premium."
            : "プレミアムをご利用いただきありがとうございます。"
        );
      }
    } finally {
      setPurchasing(false);
    }
  };

  const monthlyPackage = offering
    ? (Object.values(offering.availablePackages)[0] as any)
    : null;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.iconWrap}>
        <CartIcon size={44} color={colors.primary} />
      </View>

      <Text style={styles.title}>
        {isEnglish ? "Shop" : "ショップ"}
      </Text>

      <View style={styles.premiumCard}>
        <Text style={styles.premiumBadge}>✦ PREMIUM</Text>

        <Text style={styles.premiumTitle}>
          {isEnglish ? "Task Town Premium" : "Task Town プレミアム"}
        </Text>

        <Text style={styles.premiumDescription}>
          {isEnglish
            ? "Enjoy your town even more with special Premium features."
            : "Premium限定機能で、街づくりをもっと自由に楽しもう。"}
        </Text>

        <View style={styles.buildings}>
          <View style={styles.buildingCard}>
            <BuildingIcon id="cafe" size={58} />
            <Text style={styles.buildingName}>
              {isEnglish ? "Cafe" : "カフェ"}
            </Text>
          </View>

          <View style={styles.buildingCard}>
            <BuildingIcon id="onsen" size={58} />
            <Text style={styles.buildingName}>
              {isEnglish ? "Hot Spring" : "温泉"}
            </Text>
          </View>

          <View style={styles.buildingCard}>
            <BuildingIcon id="observatory" size={58} />
            <Text style={styles.buildingName}>
              {isEnglish ? "Observatory" : "天文台"}
            </Text>
          </View>
        </View>

        <View style={styles.featureBox}>
          <Text style={styles.featureTitle}>
            {isEnglish ? "Premium Features" : "Premiumの特典"}
          </Text>

          <Text style={styles.featureText}>
            {isEnglish
              ? "• Freely place buildings on empty plots"
              : "• 空き地に好きな建物を自由に配置"}
          </Text>

          <Text style={styles.featureText}>
            {isEnglish
              ? "• Unlock special Premium buildings"
              : "• 特別なPremium建物を解放"}
          </Text>

          <Text style={styles.featureText}>
            {isEnglish
              ? "• Build the town at your own pace"
              : "• 自分のペースで街づくりを楽しめる"}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={styles.loading}
          />
        ) : monthlyPackage ? (
          <>
            <Text style={styles.price}>
              {monthlyPackage.product.priceString}
              {isEnglish ? " / month" : " / 月"}
            </Text>

            <View style={styles.buttonWrap}>
              <Button
                title={
                  purchasing
                    ? isEnglish
                      ? "Processing..."
                      : "購入処理中..."
                    : isEnglish
                    ? "Subscribe"
                    : "プレミアムにする"
                }
                onPress={handlePurchase}
                disabled={purchasing}
                color={colors.primary}
              />
            </View>
          </>
        ) : (
          <Text style={styles.unavailable}>
            {isEnglish
              ? "The Premium purchase is currently unavailable."
              : "現在、Premiumの購入を利用できません。"}
          </Text>
        )}
      </View>

      <Text style={styles.description}>
        {isEnglish
          ? "Take your time and build the town you want."
          : "自分のペースで、好きな街をつくろう。"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },

  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.xxl,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    color: colors.foreground,
    marginBottom: 16,
    fontFamily: fonts.display,
  },

  premiumCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: 20,
    alignItems: "center",
  },

  premiumBadge: {
    fontSize: 13,
    color: colors.primary,
    marginBottom: 8,
    fontFamily: fonts.bodySemiBold,
  },

  premiumTitle: {
    fontSize: 24,
    color: colors.foreground,
    marginBottom: 8,
    fontFamily: fonts.display,
    textAlign: "center",
  },

  premiumDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 18,
    fontFamily: fonts.bodyRegular,
  },

  buildings: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 20,
  },

  buildingCard: {
    flex: 1,
    minHeight: 110,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  buildingName: {
    marginTop: 6,
    fontSize: 13,
    color: colors.foreground,
    fontFamily: fonts.bodySemiBold,
  },

  featureBox: {
    width: "100%",
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 18,
  },

  featureTitle: {
    fontSize: 16,
    color: colors.foreground,
    marginBottom: 8,
    fontFamily: fonts.bodySemiBold,
  },

  featureText: {
    fontSize: 13,
    lineHeight: 22,
    color: colors.textSecondary,
    fontFamily: fonts.bodyRegular,
  },

  loading: {
    marginVertical: 14,
  },

  price: {
    fontSize: 24,
    color: colors.foreground,
    marginBottom: 14,
    fontFamily: fonts.display,
  },

  buttonWrap: {
    width: "100%",
  },

  unavailable: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
    fontFamily: fonts.bodyRegular,
  },

  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 18,
    fontFamily: fonts.bodyRegular,
  },
});