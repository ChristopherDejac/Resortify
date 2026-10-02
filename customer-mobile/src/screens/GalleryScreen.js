import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/theme";
import { galleryCategories as categories, galleryItems } from "../data";

function GalleryCard({ item }) {
  return (
    <View style={styles.card}>
      <LinearGradient colors={item.gradient} style={styles.cardGradient}>
        <Text style={styles.cardEmoji}>{item.emoji}</Text>
      </LinearGradient>
      <LinearGradient
        colors={["transparent", "rgba(8, 20, 25, 0.6)"]}
        style={styles.cardFade}
        pointerEvents="none"
      />
      <Text style={styles.cardLabel} numberOfLines={1}>
        {item.label.toUpperCase()}
      </Text>
    </View>
  );
}

export default function GalleryScreen({ navigation }) {
  const [active, setActive] = useState("All");

  const items =
    active === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.type === active);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.deep} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gallery</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.divider} />

      {/* Category pills */}
      <View style={styles.pillsWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsContent}
        >
          {categories.map((cat) => {
            const selected = active === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.pill, selected && styles.pillActive]}
                activeOpacity={0.7}
                onPress={() => setActive(cat)}
              >
                <Text style={[styles.pillText, selected && styles.pillTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 2-column grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      >
        {items.map((item) => (
          <GalleryCard key={item.label} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    backgroundColor: colors.white,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 20,
    fontWeight: "700",
    color: colors.deep,
    letterSpacing: 0.3,
  },
  headerRight: {
    width: 34,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E0E5EA",
  },

  /* Pills */
  pillsWrap: {
    paddingVertical: 12,
  },
  pillsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    height: 34,
    paddingHorizontal: 18,
    borderRadius: 17,
    backgroundColor: "#EEF1F3",
    borderWidth: 1,
    borderColor: "#E3E7EA",
    alignItems: "center",
    justifyContent: "center",
  },
  pillActive: {
    backgroundColor: colors.deep,
    borderColor: colors.deep,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  pillTextActive: {
    color: colors.white,
  },

  /* Grid */
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: "48%",
    height: 140,
    borderRadius: 14,
    overflow: "hidden",
  },
  cardGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: {
    fontSize: 40,
  },
  cardFade: {
    ...StyleSheet.absoluteFillObject,
  },
  cardLabel: {
    position: "absolute",
    left: 12,
    bottom: 10,
    right: 8,
    fontSize: 11,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.8,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});