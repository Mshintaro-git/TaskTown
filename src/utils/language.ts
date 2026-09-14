// 端末言語の判定ユーティリティ
// i18next を使わず、端末言語を直接判定する

import * as Localization from "expo-localization";

// 端末言語が英語かどうかを判定
// 英語端末 → true / 日本語・その他 → false
export const isEnglish: boolean = (() => {
  try {
    const locales = Localization.getLocales();
    const lang = locales[0]?.languageCode || "ja";
    return lang === "en";
  } catch (e) {
    return false;
  }
})();