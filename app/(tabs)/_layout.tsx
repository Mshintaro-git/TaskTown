import { Tabs } from "expo-router";
import { HomeIcon, ScrollIcon, BookIcon, CartIcon, GearIcon } from "../../src/components/icons/Icons";
import { colors, fonts } from "../../src/theme/theme";
import { isEnglish } from "../../src/utils/language";

export default function TabLayout() {
  const tabTitles = {
    town: isEnglish ? "Town" : "街",
    quest: isEnglish ? "Quests" : "クエスト",
    diary: isEnglish ? "Adventure Diary" : "冒険日記",
    shop: isEnglish ? "Shop" : "ショップ",
    settings: isEnglish ? "Settings" : "設定",
  };

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerShadowVisible: false,
        headerTintColor: colors.foreground,
        headerTitleStyle: {
          fontFamily: fonts.display,
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: tabTitles.town,
          tabBarIcon: ({ color }) => (
            <HomeIcon size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="quest"
        options={{
          title: tabTitles.quest,
          tabBarIcon: ({ color }) => (
            <ScrollIcon size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="diary"
        options={{
          title: tabTitles.diary,
          tabBarIcon: ({ color }) => (
            <BookIcon size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: tabTitles.shop,
          tabBarIcon: ({ color }) => (
            <CartIcon size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: tabTitles.settings,
          tabBarIcon: ({ color }) => (
            <GearIcon size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}