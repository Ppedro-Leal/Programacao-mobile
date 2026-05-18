import "react-native-gesture-handler";

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useEffect, useRef } from "react";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const ITEMS = [
  "Pizza",
  "Brócolis",
  "Praia",
  "Chuva",
  "Hambúrguer",
  "PDM",
];

const BOX_SIZE = 140;
const CARD_HEIGHT = 56;
const CARD_GAP = 14;
const CARD_WIDTH = width * 0.72;

const SNAPPED_W = BOX_SIZE - 16;
const SNAPPED_H = 24;
const SNAPPED_GAP = 4;

type Zone = "stack" | "like" | "dislike";

type ZoneBounds = { x: number; y: number; w: number; h: number };

// ─── Cartão ──────────────────────────────────────────────────────────────────

function DraggableCard({
  label,
  index,
  targetZone,
  stackIdx,
  onSnap,
  dislikeBounds,
  likeBounds,
  cardsAreaY, 
}: {
  label: string;
  index: number;
  targetZone: Zone;
  stackIdx: number;
  onSnap: (label: string, zone: Zone) => void;
  dislikeBounds: ZoneBounds | null;
  likeBounds: ZoneBounds | null;
  cardsAreaY: number;
}) {

  const originY = index * (CARD_HEIGHT + CARD_GAP);

  const tx = useSharedValue(0);
  const ty = useSharedValue(originY);
  const scale = useSharedValue(1);
  const cw = useSharedValue(CARD_WIDTH);
  const ch = useSharedValue(CARD_HEIGHT);

  const anchorX = useSharedValue(0);
  const anchorY = useSharedValue(originY);

  function computeSnapPos(zone: Zone, idx: number) {
    if (zone === "stack" || !dislikeBounds || !likeBounds) {
      return { x: 0, y: originY };
    }

    const bounds = zone === "dislike" ? dislikeBounds : likeBounds;

   const zoneCenterAbsX = bounds.x + bounds.w / 2;
    const snapX = zoneCenterAbsX - width / 2;

    const zoneCenterAbsY =
      bounds.y + 8 + idx * (SNAPPED_H + SNAPPED_GAP) + SNAPPED_H / 2;
    const snapY = zoneCenterAbsY - cardsAreaY;

    return { x: snapX, y: snapY };
  }

  useEffect(() => {
    if (!dislikeBounds || !likeBounds) return;

    const { x, y } = computeSnapPos(targetZone, stackIdx);
    tx.value = withSpring(x);
    ty.value = withSpring(y);
    anchorX.value = x;
    anchorY.value = y;

    if (targetZone === "stack") {
      cw.value = withSpring(CARD_WIDTH);
      ch.value = withSpring(CARD_HEIGHT);
    } else {
      cw.value = withSpring(SNAPPED_W);
      ch.value = withSpring(SNAPPED_H);
    }
  }, [targetZone, stackIdx, dislikeBounds, likeBounds, cardsAreaY]);

  const pan = Gesture.Pan()
    .onBegin(() => {
      scale.value = withSpring(1.05);
      cw.value = withSpring(CARD_WIDTH);
      ch.value = withSpring(CARD_HEIGHT);
    })
    .onUpdate((event) => {
      tx.value = anchorX.value + event.translationX;
      ty.value = anchorY.value + event.translationY;
    })
    .onEnd((event) => {
      scale.value = withSpring(1);

     const cardAbsX = width / 2 + anchorX.value + event.translationX;
      const cardAbsY = cardsAreaY + anchorY.value + event.translationY;

      const insideDislike =
        dislikeBounds != null &&
        cardAbsX >= dislikeBounds.x &&
        cardAbsX <= dislikeBounds.x + dislikeBounds.w &&
        cardAbsY >= dislikeBounds.y &&
        cardAbsY <= dislikeBounds.y + dislikeBounds.h;

      const insideLike =
        likeBounds != null &&
        cardAbsX >= likeBounds.x &&
        cardAbsX <= likeBounds.x + likeBounds.w &&
        cardAbsY >= likeBounds.y &&
        cardAbsY <= likeBounds.y + likeBounds.h;

      if (insideDislike) {
        runOnJS(onSnap)(label, "dislike");
      } else if (insideLike) {
        runOnJS(onSnap)(label, "like");
      } else {
        anchorX.value = 0;
        anchorY.value = originY;

        tx.value = withSpring(0);
        ty.value = withSpring(originY);

        scale.value = withSpring(1);

        runOnJS(onSnap)(label, "stack");
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: scale.value },
    ],
    width: cw.value,
    height: ch.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    fontSize: withSpring(ch.value <= SNAPPED_H ? 10 : 18),
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Animated.Text
          style={[styles.cardText, animatedTextStyle]}
          numberOfLines={1}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [zones, setZones] = useState<Record<string, Zone>>(() =>
    Object.fromEntries(ITEMS.map((item) => [item, "stack" as Zone])),
  );

  const [dislikeBounds, setDislikeBounds] = useState<ZoneBounds | null>(null);
  const [likeBounds, setLikeBounds] = useState<ZoneBounds | null>(null);
  const [cardsAreaY, setCardsAreaY] = useState(0);

  const dislikeRef = useRef<View>(null);
  const likeRef = useRef<View>(null);

  const measureZones = useCallback(() => {
    dislikeRef.current?.measure((fx, fy, w, h, px, py) => {
      setDislikeBounds({ x: px, y: py, w, h });
    });
    likeRef.current?.measure((fx, fy, w, h, px, py) => {
      setLikeBounds({ x: px, y: py, w, h });
    });
  }, []);

  const handleSnap = useCallback((label: string, zone: Zone) => {
    setZones((prev) => ({ ...prev, [label]: zone }));
  }, []);

 const getStackIdx = (label: string, zone: Zone) => {
    if (zone === "stack") return 0;
    let idx = 0;
    for (const item of ITEMS) {
      if (item === label) break;
      if (zones[item] === zone) idx++;
    }
    return idx;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Arraste o que eu gosto / não gosto</Text>

        <View style={styles.dropZones} onLayout={measureZones}>
          {/* NÃO GOSTO */}
          <View
            ref={dislikeRef}
            style={[styles.zone, styles.dislikeZone]}
            onLayout={measureZones}
          >
            <Text style={[styles.zoneText, { color: "#ff4d4d" }]}>
              NÃO{"\n"}GOSTO
            </Text>
          </View>

          {/* GOSTO */}
          <View
            ref={likeRef}
            style={[styles.zone, styles.likeZone]}
            onLayout={measureZones}
          >
            <Text style={[styles.zoneText, { color: "#36c96b" }]}>GOSTO</Text>
          </View>
        </View>

        <View
          style={styles.cardsArea}
          onLayout={(e: LayoutChangeEvent) => {
            e.target.measure?.((fx, fy, w, h, px, py) => {
              setCardsAreaY(py);
            });
          }}
        >
          {ITEMS.map((item, index) => (
            <DraggableCard
              key={item}
              label={item}
              index={index}
              targetZone={zones[item]}
              stackIdx={getStackIdx(item, zones[item])}
              onSnap={handleSnap}
              dislikeBounds={dislikeBounds}
              likeBounds={likeBounds}
              cardsAreaY={cardsAreaY}
            />
          ))}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  dropZones: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  zone: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderStyle: "dashed",
  },
  dislikeZone: {
    backgroundColor: "#fff2f2",
    borderColor: "#ff4d4d",
  },
  likeZone: {
    backgroundColor: "#f1fff4",
    borderColor: "#36c96b",
  },
  zoneText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardsArea: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    position: "absolute",
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardText: {
    fontWeight: "bold",
    color: "#222",
  },
});
