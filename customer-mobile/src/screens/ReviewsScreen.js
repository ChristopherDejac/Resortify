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
import { reviewDistribution as distribution, reviews, reviewFilters as filters } from "../data";

function RatingSummary() {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryTop}>
        <View style={styles.summaryScoreWrap}>
          <Text style={styles.summaryScore}>4.9</Text>
          <View style={styles.summaryStars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Ionicons key={i} name="star" size={14} color={colors.deep} />
            ))}
          </View>
          <Text style={styles.summaryCount}>124 reviews</Text>
        </View>
        <View style={styles.barsWrap}>
          {distribution.map((d) => (
            <View key={d.stars} style={styles.barRow}>
              <Text style={styles.barLabel}>{d.stars}</Text>
              <Ionicons name="star" size={10} color={colors.deep} />
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${d.pct}%` }]} />
              </View>
              <Text style={styles.barPct}>{d.pct}%</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function ReviewCard({ review }) {
  return (
    <View style={styles.reviewCard}>
      {/* Header */}
      <View style={styles.reviewHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{review.initials}</Text>
        </View>
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{review.name}</Text>
          <Text style={styles.reviewerDate}>{review.date}</Text>
        </View>
        <View style={styles.reviewStars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Ionicons
              key={i}
              name={i <= review.rating ? "star" : "star-outline"}
              size={13}
              color={i <= review.rating ? colors.deep : "#DDE2E6"}
            />
          ))}
        </View>
      </View>

      {/* Body */}
      <Text style={styles.reviewText}>{review.text}</Text>

      {/* Photo attachments */}
      {review.photos.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.photosRow}
        >
          {review.photos.map((emoji, i) => (
            <LinearGradient
              key={i}
              colors={["#2AAE8E", "#0B5D5A"]}
              style={styles.photoThumb}
            >
              <Text style={styles.photoEmoji}>{emoji}</Text>
            </LinearGradient>
          ))}
        </ScrollView>
      )}

      {/* Property response */}
      {review.response && (
        <View style={styles.responseBox}>
          <View style={styles.responseAccent} />
          <View style={styles.responseBody}>
            <Text style={styles.responseLabel}>Response from HanaPin Team</Text>
            <Text style={styles.responseText}>{review.response}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default function ReviewsScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState("All Reviews");

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
        <Text style={styles.headerTitle}>Reviews & Ratings</Text>
        <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7}>
          <Ionicons name="options-outline" size={18} color={colors.deep} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Summary */}
        <RatingSummary />

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsContent}
        >
          {filters.map((f) => {
            const selected = activeFilter === f;
            return (
              <TouchableOpacity
                key={f}
                style={[styles.pill, selected && styles.pillActive]}
                activeOpacity={0.7}
                onPress={() => setActiveFilter(f)}
              >
                <Text style={[styles.pillText, selected && styles.pillTextActive]}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Reviews */}
        <View style={styles.reviewsWrap}>
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </View>
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
    fontSize: 18,
    fontWeight: "700",
    color: colors.deep,
    letterSpacing: 0.3,
  },
  filterBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF1F3",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E0E5EA",
  },

  scroll: {
    paddingTop: 16,
    paddingBottom: 32,
  },

  /* Summary card */
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    borderRadius: 16,
    padding: 18,
  },
  summaryTop: {
    flexDirection: "row",
    gap: 20,
  },
  summaryScoreWrap: {
    alignItems: "center",
    gap: 4,
  },
  summaryScore: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.deep,
    lineHeight: 42,
  },
  summaryStars: {
    flexDirection: "row",
    gap: 2,
  },
  summaryCount: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  barsWrap: {
    flex: 1,
    justifyContent: "center",
    gap: 6,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  barLabel: {
    width: 10,
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
    textAlign: "right",
  },
  barTrack: {
    flex: 1,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#E8ECF0",
    overflow: "hidden",
  },
  barFill: {
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.deep,
  },
  barPct: {
    width: 28,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: "right",
  },

  /* Pills */
  pillsContent: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 18,
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

  /* Reviews */
  reviewsWrap: {
    paddingHorizontal: 16,
    gap: 14,
  },
  reviewCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    borderRadius: 14,
    padding: 16,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#52E6B0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.deep,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  reviewerDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  reviewStars: {
    flexDirection: "row",
    gap: 2,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#2C3437",
    marginBottom: 12,
  },

  /* Photos */
  photosRow: {
    gap: 8,
    marginBottom: 12,
  },
  photoThumb: {
    width: 62,
    height: 58,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  photoEmoji: {
    fontSize: 26,
  },

  /* Response */
  responseBox: {
    flexDirection: "row",
    backgroundColor: "#F4F6F8",
    borderRadius: 10,
    overflow: "hidden",
  },
  responseAccent: {
    width: 3,
    backgroundColor: colors.deep,
  },
  responseBody: {
    flex: 1,
    padding: 12,
  },
  responseLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.deep,
    marginBottom: 4,
  },
  responseText: {
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 19,
    color: colors.subtitle,
  },
});