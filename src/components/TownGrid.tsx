import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SLOT_POSITIONS } from "../data/slots";
import { getBuildingById } from "../constants/buildings";
import SlotView from "./SlotView";
import BuildingDetailModal from "./BuildingDetailModal";
import PremiumBuildingModal from "./PremiumBuildingModal";
import { PathIllustration } from "./icons/Icons";
import { isPremiumUser } from "../lib/revenueCat";
import { getPlayerBuildings } from "../services/buildingService";

type PlayerBuilding = {
  id: number;
  buildingId: string;
  slotNumber: number;
  builtAt: string;
};

type Props = {
  buildings: PlayerBuilding[];
};

export default function TownGrid({ buildings }: Props) {
  // 街画面に表示する建物
  const [displayBuildings, setDisplayBuildings] =
    useState<PlayerBuilding[]>(buildings);

  // 詳細表示する建物
  const [selectedBuilding, setSelectedBuilding] =
    useState<PlayerBuilding | null>(null);

  // Premium建物選択モーダル
  const [premiumModalVisible, setPremiumModalVisible] = useState(false);

  // Premium建物を配置するスロット
  const [selectedSlotNumber, setSelectedSlotNumber] = useState<number | null>(
    null
  );

  // Premium状態確認中
  const [checkingPremium, setCheckingPremium] = useState(false);

  // TownScreenから建物一覧が更新されたら反映
  useEffect(() => {
    setDisplayBuildings(buildings);
  }, [buildings]);

  // スロットタップ処理
  const handleSlotPress = async (slotNumber: number) => {
    const building =
      displayBuildings.find((b) => b.slotNumber === slotNumber) ?? null;

    // 建物がある場合
    // → 今まで通り詳細モーダルを表示
    if (building) {
      setSelectedBuilding(building);
      return;
    }

    // 空き地の場合
    // → Premiumユーザーだけ建物選択画面を表示
    if (checkingPremium) {
      return;
    }

    setCheckingPremium(true);

    try {
      const premium = await isPremiumUser();

      if (!premium) {
        // 無料ユーザーは空き地に建築できない
        return;
      }

      // 建築する空き地を保存
      setSelectedSlotNumber(slotNumber);

      // 建物選択モーダルを表示
      setPremiumModalVisible(true);
    } catch (error) {
      console.error("Premium check failed:", error);
    } finally {
      setCheckingPremium(false);
    }
  };

  // 建物詳細モーダルを閉じる
  const handleCloseBuildingDetail = () => {
    setSelectedBuilding(null);
  };

  // Premium建物選択モーダルを閉じる
  const handleClosePremiumModal = () => {
    setPremiumModalVisible(false);
    setSelectedSlotNumber(null);
  };

  // Premium建築完了後
  const handlePremiumBuildingBuilt = async () => {
    try {
      // 最新の建物一覧を取得
      const updatedBuildings = await getPlayerBuildings();

      // 街に即座に反映
      setDisplayBuildings(updatedBuildings);
    } catch (error) {
      console.error("Failed to refresh buildings:", error);
    }

    // モーダルを閉じる
    setPremiumModalVisible(false);
    setSelectedSlotNumber(null);
  };

  return (
    <View style={styles.container}>
      {/* 道の装飾 */}
      <View style={styles.pathWrap} pointerEvents="none">
        <PathIllustration width={360} />
      </View>

      {/* スロットを配置 */}
      {SLOT_POSITIONS.map((slot) => {
        const building =
          displayBuildings.find(
            (b) => b.slotNumber === slot.slotNumber
          ) ?? null;

        return (
          <SlotView
            key={slot.slotNumber}
            slot={slot}
            building={
              building
                ? getBuildingById(building.buildingId) ?? null
                : null
            }
            onPress={() => handleSlotPress(slot.slotNumber)}
          />
        );
      })}

      {/* 建物詳細モーダル */}
      <BuildingDetailModal
        visible={selectedBuilding !== null}
        building={selectedBuilding}
        onClose={handleCloseBuildingDetail}
      />

      {/* Premium建物選択モーダル */}
      <PremiumBuildingModal
        visible={premiumModalVisible}
        slotNumber={selectedSlotNumber}
        onClose={handleClosePremiumModal}
        onBuildingBuilt={handlePremiumBuildingBuilt}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  pathWrap: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    opacity: 0.6,
  },
});