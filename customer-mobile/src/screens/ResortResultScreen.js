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
import { resorts } from "../data";

function ResortCard({ resort, navigation }) {
  const [fav, setFav] = useState(false);

  return (
    <View style={styles.card}>
      {/* Hero image */}
      <View style={styles.hero}>
        <LinearGradient colors={resort.gradient} style={styles.heroGradient}>
          <Text style={styles.heroEmoji}>{resort.emoji}</Text>
        </LinearGradient>
        <LinearGradient
          colors={["transparent", "rgba(10, 25, 30, 0.7)"]}
          style={styles.heroFade}
          pointerEvents="none"
        />

        {resort.topRated && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>POPULAR</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.heartBtn}
          activeOpacity={0.7}
          onPress={() => setFav((p) => !p)}
        >
          <Ionicons
            name={fav ? "heart" : "heart-outline"}
            size={18}
            color={fav ? colors.danger : "#2B2F33"}
          />
        </TouchableOpacity>

        <View style={styles.heroLocRow}>
          <Ionicons name="location" size={12} color={colors.white} />
          <Text style={styles.heroLoc}>{resort.location}</Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.cardBody}>
        <View style={styles.titleRow}>
          <Text style={styles.resortName} numberOfLines={1}>
            {resort.name}
          </Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#2B2F33" />
            <Text style={styles.ratingText}>{resort.rating}</Text>
            <Text style={styles.reviewCount}>({resort.reviewCount} reviews)</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {resort.description}
        </Text>

        <View style={styles.cardDivider} />

        <TouchableOpacity
          style={styles.detailsBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("ResortDetail", { resort })}
        >
          <Text style={styles.detailsBtnText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ResortResultScreen({ navigation, route }) {
  const query = (route.params?.q || "").trim().toLowerCase();
  const results = query
    ? resorts.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.location.toLowerCase().includes(query)
      )
    : resorts;

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
        <Text style={styles.headerTitle}>Resort Result</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.divider} />

      {/* Result info bar */}
      <View style={styles.infoBar}>
        {query ? (
          <Text style={styles.infoText}>
            {results.length} result{results.length === 1 ? "" : "s"} for "
            {route.params.q}"
          </Text>
        ) : (
          <Text style={styles.infoText}>
            {results.length} resorts available
          </Text>
        )}
      </View>

      {/* Results list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {results.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>No resorts found</Text>
            <Text style={styles.emptySub}>Try a different search.</Text>
          </View>
        ) : (
          results.map((resort) => (
            <ResortCard key={resort.id} resort={resort} navigation={navigation} />
          ))
        )}
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
    backgroundColor: "#F7F8FA",
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
  infoBar: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 4,
  },
  infoText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.subtitle,
  },

  /* Cards */
  scroll: {
    padding: 16,
    paddingBottom: 32,
    gap: 18,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  hero: {
    height: 170,
  },
  heroGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroEmoji: {
    fontSize: 52,
  },
  heroFade: {
    ...StyleSheet.absoluteFillObject,
  },
  popularBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#52E6B0",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  popularText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: colors.deep,
    letterSpacing: 0.5,
  },
  heartBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroLocRow: {
    position: "absolute",
    bottom: 10,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  heroLoc: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  /* Card body */
  cardBody: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  resortName: {
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 18,
    fontWeight: "700",
    color: colors.deep,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2B2F33",
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textMuted,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.subtitle,
    marginTop: 8,
  },
  cardDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E8ECF0",
    marginVertical: 14,
  },
  detailsBtn: {
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsBtnText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },

  /* Empty state */
  empty: {
    alignItems: "center",
    paddingTop: 80,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  emptySub: {
    fontSize: 13,
    color: colors.subtitle,
  },
});