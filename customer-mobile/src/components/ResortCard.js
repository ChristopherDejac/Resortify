import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { colors, spacing, radii } from "../constants/theme";

export default function ResortCard({ resort, onPress, variant = "default" }) {
  const isWide = variant === "wide";
  const priceLabel = resort.price ? `₱${resort.price?.toLocaleString()} / night` : "From ₱3,500 / night";

  return (
    <TouchableOpacity
      style={[styles.card, isWide && styles.cardWide]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={[styles.imageBox, isWide && styles.imageBoxWide]}>
        <Text style={styles.imageEmoji}>🏖️</Text>
      </View>
      <View style={[styles.info, isWide && styles.infoWide]}>
        <Text style={styles.name} numberOfLines={1}>
          {resort?.name || "HanaPin Beach Resort"}
        </Text>
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>★★★★★</Text>
          <Text style={styles.ratingText}>{resort?.rating || "4.8"}</Text>
        </View>
        <Text style={styles.location}>📍 {resort?.location || "Siargao, Philippines"}</Text>
        <Text style={styles.price}>{priceLabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardWide: {
    flexDirection: "row",
  },
  imageBox: {
    height: 160,
    backgroundColor: "#D4E4E8",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBoxWide: {
    width: 120,
    height: 120,
  },
  imageEmoji: { fontSize: 40 },
  info: {
    padding: spacing.md,
    gap: 4,
  },
  infoWide: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stars: {
    fontSize: 13,
    color: colors.star,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.subtitle,
  },
  location: {
    fontSize: 12,
    color: colors.subtitle,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 2,
  },
});
