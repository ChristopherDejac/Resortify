import { useState, useRef } from "react";
import { Animated, PanResponder, StyleSheet, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

const FAB_SIZE = 56;
const EDGE = 8;
const TAB_BAR = 78;

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

export default function AIChatButton({ navigation, bottomOffset = 178 }) {
  const { width, height } = useWindowDimensions();
  const defaultX = width - FAB_SIZE - 14;
  const defaultY = height - bottomOffset - FAB_SIZE;

  const [dragging, setDragging] = useState(false);
  const pos = useRef({ x: defaultX, y: defaultY });
  const didDrag = useRef(false);
  const pan = useRef(new Animated.ValueXY({ x: defaultX, y: defaultY })).current;

  const bounds = () => ({
    minX: EDGE,
    maxX: width - FAB_SIZE - EDGE,
    minY: EDGE,
    maxY: height - TAB_BAR - FAB_SIZE - EDGE,
  });

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        didDrag.current = false;
        setDragging(true);
        pan.stopAnimation();
        pan.setValue(pos.current);
      },
      onPanResponderMove: (_, g) => {
        if (Math.abs(g.dx) > 3 || Math.abs(g.dy) > 3) didDrag.current = true;
        const { minX, maxX, minY, maxY } = bounds();
        pan.setValue({
          x: clamp(pos.current.x + g.dx, minX, maxX),
          y: clamp(pos.current.y + g.dy, minY, maxY),
        });
      },
      onPanResponderRelease: (_, g) => {
        const { minX, maxX, minY, maxY } = bounds();
        pos.current = {
          x: clamp(pos.current.x + g.dx, minX, maxX),
          y: clamp(pos.current.y + g.dy, minY, maxY),
        };
        Animated.spring(pan, {
          toValue: pos.current,
          useNativeDriver: false,
          friction: 8,
          tension: 40,
        }).start();
        setDragging(false);
        if (!didDrag.current) navigation.navigate("AIChat");
      },
    })
  ).current;

  return (
    <Animated.View
      {...responder.panHandlers}
      style={[
        styles.fab,
        dragging && styles.fabDragging,
        {
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { scale: dragging ? 1.06 : 1 },
          ],
        },
      ]}
    >
      <Ionicons name="sparkles" size={22} color={colors.white} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    top: 0,
    left: 0,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
  },
  fabDragging: {
    shadowOpacity: 0.32,
    shadowRadius: 12,
  },
});