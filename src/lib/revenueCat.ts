import Purchases, {
  PurchasesPackage,
  CustomerInfo,
} from "react-native-purchases";

export async function getRevenueCatOfferings() {
  try {
    const offerings = await Purchases.getOfferings();

    console.log("RevenueCat Offerings:", offerings);

    return offerings;
  } catch (error) {
    console.error("RevenueCat Offerings Error:", error);
    return null;
  }
}

export async function purchasePremium(
  packageToPurchase: PurchasesPackage
): Promise<CustomerInfo | null> {
  try {
    const { customerInfo } = await Purchases.purchasePackage(
      packageToPurchase
    );

    console.log("RevenueCat Purchase Success:", customerInfo);

    return customerInfo;
  } catch (error: any) {
    // ユーザーが購入画面をキャンセルした場合
    if (error?.userCancelled) {
      console.log("Purchase cancelled");
      return null;
    }

    console.error("RevenueCat Purchase Error:", error);
    return null;
  }
}

export async function getCustomerInfo() {
  try {
    const customerInfo = await Purchases.getCustomerInfo();

    console.log("RevenueCat CustomerInfo:", customerInfo);

    return customerInfo;
  } catch (error) {
    console.error("RevenueCat CustomerInfo Error:", error);
    return null;
  }
}

export async function isPremiumUser(): Promise<boolean> {
  // 開発中の実機確認用
  // 本番公開前には必ず削除する
  const DEV_PREMIUM = false;

  if (DEV_PREMIUM) {
    return true;
  }

  try {
    const customerInfo = await Purchases.getCustomerInfo();

    return customerInfo.entitlements.active["premium"] !== undefined;
  } catch (error) {
    console.error("Premium Check Error:", error);
    return false;
  }
}