import { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

export default function SplashScreen({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const taglineAnim = useRef(new Animated.Value(0)).current;
  const loadDot1 = useRef(new Animated.Value(0)).current;
  const loadDot2 = useRef(new Animated.Value(0)).current;
  const loadDot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounceDot = (dot, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
        ])
      );

    Animated.parallel([
      bounceDot(loadDot1, 0),
      bounceDot(loadDot2, 120),
      bounceDot(loadDot3, 240),
    ]).start();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(1300),
    ]).start(() => onFinish?.());
  }, []);

  const dotBounce = (dot) =>
    dot.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -10],
    });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

      {/* Mint panel */}
      <View style={styles.panel} />

      {/* Centered logo block */}
      <Animated.View
        style={[
          styles.brand,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.logoBadge}>
          <Ionicons name="leaf" size={46} color={colors.white} style={styles.logoIcon} />
        </View>
        <Text style={styles.logoText}>HanaPin</Text>

        <Animated.View style={{ opacity: taglineAnim }}>
          <Text style={styles.tagline}>Naturally Refined</Text>
        </Animated.View>
      </Animated.View>

      {/* Loading dots at screen bottom */}
      <View style={styles.loadingRow}>
        {[loadDot1, loadDot2, loadDot3].map((d, i) => (
          <Animated.View
            key={i}
            style={[
              styles.loadDot,
              {
                transform: [{ translateY: dotBounce(d) }],
                opacity: d.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.4, 1],
                }),
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  panel: {
    position: "absolute",
    width: 340,
    height: 340,
    borderRadius: 88,
    backgroundColor: "rgba(191, 238, 219, 0.5)",
  },
  brand: {
    alignItems: "center",
    gap: 12,
    transform: [{ translateY: 42 }],
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  logoIcon: {
    marginTop: 1,
  },
  logoText: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 38,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 1,
  },
  tagline: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 16,
    fontStyle: "italic",
    color: colors.subtitle,
    letterSpacing: 2,
    marginTop: 6,
  },
  loadingRow: {
    position: "absolute",
    bottom: 44,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 14,
  },
  loadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
});