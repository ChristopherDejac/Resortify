import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/theme";

const STAR_LABELS = ["Terrible", "Poor", "Good", "Excellent", "Outstanding"];

const initialCategories = [
  { key: "clean", name: "Cleanliness & Facilities", icon: "sparkles-outline", value: 5 },
  { key: "staff", name: "Hospitality & Staff", icon: "people-outline", value: 4 },
  { key: "value", name: "Value for Money", icon: "pricetag-outline", value: 4 },
  { key: "location", name: "Location & Scenic View", icon: "leaf-outline", value: 5 },
];

const TAG_OPTIONS = [
  "Stunning Mountain View",
  "Sparkling Pool",
  "Peaceful & Quiet",
  "Friendly Lifeguards",
  "Delicious Food",
  "Pet Friendly",
  "Fast WiFi",
];

function Stars({ value, onChange, size }) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <TouchableOpacity key={i} activeOpacity={0.7} onPress={() => onChange(i)}>
          <Ionicons
            name={i <= value ? "star" : "star-outline"}
            size={size}
            color={i <= value ? colors.star : "#D3D9DD"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Switch({ value, onToggle }) {
  return (
    <TouchableOpacity
      style={[styles.track, value && styles.trackOn]}
      activeOpacity={0.8}
      onPress={onToggle}
    >
      <View style={[styles.knob, value && styles.knobOn]} />
    </TouchableOpacity>
  );
}

export default function RateReviewScreen({ navigation, route }) {
  const resort = route.params?.resort || "Costa Abril Resort";

  const [overall, setOverall] = useState(4);
  const [categories, setCategories] = useState(initialCategories);
  const [review, setReview] = useState(
    "Costa Abril was absolutely wonderful! The staff were super welcoming and the pools were spotless. We loved the calm vibe and how well-kept the facilities were. The changing rooms were clean and parking was easy. Highly recommend the resort for family day trips."
  );
  const [tags, setTags] = useState(["Stunning Mountain View", "Peaceful & Quiet"]);
  const [publicPost, setPublicPost] = useState(true);

  const setCategory = (key, value) =>
    setCategories((prev) =>
      prev.map((c) => (c.key === key ? { ...c, value } : c))
    );

  const toggleTag = (tag) =>
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const onSubmit = () =>
    Alert.alert("Review Submitted", "Thank you for your feedback!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);

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
        <Text style={styles.headerTitle}>Rate &amp; Review</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.divider} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* STAY COMPLETED */}
        <Text style={styles.completedLabel}>STAY COMPLETED</Text>

        {/* Verified stay card */}
        <View style={styles.stayCard}>
          <LinearGradient
            colors={["#2AAE8E", "#0B5D5A"]}
            style={styles.stayThumb}
          >
            <Text style={styles.stayEmoji}>🏖️</Text>
          </LinearGradient>
          <View style={styles.stayBody}>
            <View style={styles.verifiedRow}>
              <View style={styles.verifiedPill}>
                <Ionicons name="checkmark-circle" size={11} color="#0B5D5A" />
                <Text style={styles.verifiedText}>VERIFIED STAY</Text>
              </View>
            </View>
            <Text style={styles.stayName}>{resort}</Text>
            <Text style={styles.stayDesc} numberOfLines={1}>
              Nature park resort with crystal pools
            </Text>
            <View style={styles.stayDateRow}>
              <Ionicons name="calendar-outline" size={13} color={colors.subtitle} />
              <Text style={styles.stayDate}>Dec 12 – 13, 2026 · 2 Adults</Text>
            </View>
          </View>
        </View>

        {/* Overall rating */}
        <View style={styles.card}>
          <View style={styles.overallIcon}>
            <Ionicons name="star" size={22} color="#FFFFFF" />
          </View>
          <Text style={styles.overallTitle}>How was your experience?</Text>
          <Text style={styles.overallSub}>
            Tap a star to rate your overall stay at {resort}.
          </Text>
          <Stars value={overall} onChange={setOverall} size={30} />
          <View style={styles.excellentPill}>
            <Text style={styles.excellentText}>
              {STAR_LABELS[overall - 1]} ({overall}.0)
            </Text>
          </View>
        </View>

        {/* Category ratings */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Category Ratings</Text>
            <Text style={styles.cardHint}>Tap to adjust</Text>
          </View>
          {categories.map((c) => (
            <View key={c.key} style={styles.catRow}>
              <View style={styles.catIcon}>
                <Ionicons name={c.icon} size={15} color={colors.deep} />
              </View>
              <Text style={styles.catName} numberOfLines={2}>
                {c.name}
              </Text>
              <Stars value={c.value} onChange={(v) => setCategory(c.key, v)} size={15} />
              <Text style={styles.catScore}>{c.value}/5</Text>
            </View>
          ))}
        </View>

        {/* Written review */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Your Review</Text>
            <Text style={styles.tipsLabel}>Helpful tips welcomed</Text>
          </View>
          <View style={styles.textareaBox}>
            <TextInput
              style={styles.textarea}
              value={review}
              onChangeText={setReview}
              multiline
              textAlignVertical="top"
              placeholder="Share more about your stay..."
              placeholderTextColor="#9AA8B2"
            />
          </View>
          <View style={styles.counterRow}>
            <Text style={styles.counterText}>{review.length} / 500</Text>
          </View>
          <Text style={styles.reviewPrompt}>
            Tip: mention local food you loved or staff who went the extra mile.
          </Text>
        </View>

        {/* Photos & videos */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Add Photos or Videos</Text>
            <Text style={styles.cardHint}>Optional · Up to 5 items</Text>
          </View>
          <View style={styles.mediaProgressRow}>
            <Text style={styles.mediaProgress}>2 of 5 added</Text>
          </View>
          <View style={styles.mediaRow}>
            <TouchableOpacity style={[styles.mediaTile, styles.uploadTile]} activeOpacity={0.85}>
              <Ionicons name="camera" size={22} color="#0B5D5A" />
              <Text style={styles.uploadText}>Upload</Text>
            </TouchableOpacity>
            <View style={styles.mediaTile}>
              <LinearGradient colors={["#7FBF9B", "#2AAE8E"]} style={styles.mediaInner}>
                <Text style={styles.mediaEmoji}>🌄</Text>
              </LinearGradient>
              <TouchableOpacity style={styles.removeBtn}>
                <Ionicons name="close" size={11} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.mediaTile}>
              <LinearGradient colors={["#4FB8E0", "#1E7FA8"]} style={styles.mediaInner}>
                <Text style={styles.mediaEmoji}>🏊</Text>
                <View style={styles.playBtn}>
                  <Ionicons name="play" size={14} color="#FFFFFF" />
                </View>
              </LinearGradient>
              <TouchableOpacity style={styles.removeBtn}>
                <Ionicons name="close" size={11} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Highlight tags */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>What did you love most?</Text>
          <View style={styles.tagsWrap}>
            {TAG_OPTIONS.map((tag) => {
              const selected = tags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  style={[styles.tagChip, selected && styles.tagChipSelected]}
                  activeOpacity={0.8}
                  onPress={() => toggleTag(tag)}
                >
                  <Ionicons
                    name={selected ? "checkmark" : "add"}
                    size={13}
                    color={selected ? "#0B5D5A" : colors.subtitle}
                  />
                  <Text
                    style={[
                      styles.tagText,
                      selected && styles.tagTextSelected,
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Public post */}
        <View style={styles.card}>
          <View style={styles.publicCard}>
            <View style={styles.publicIcon}>
              <Ionicons name="globe-outline" size={18} color={colors.deep} />
            </View>
            <View style={styles.publicTexts}>
              <Text style={styles.publicTitle}>Post review publicly</Text>
              <Text style={styles.publicSub}>
                Shown on your profile as Juan Dela Cruz
              </Text>
            </View>
            <Switch value={publicPost} onToggle={() => setPublicPost((p) => !p)} />
          </View>
        </View>
      </ScrollView>

      {/* Submit bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.88} onPress={onSubmit}>
          <Text style={styles.submitText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 19,
    fontWeight: "700",
    color: colors.deep,
  },
  headerRight: {
    width: 34,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E0E5EA",
  },

  scrollView: {
    flex: 1,
  },
  scroll: {
    padding: 18,
    paddingBottom: 28,
  },

  completedLabel: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: "#22A06B",
    letterSpacing: 1,
    marginBottom: 14,
    marginTop: 6,
  },

  /* Stay card */
  stayCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    padding: 12,
    marginBottom: 14,
  },
  stayThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  stayEmoji: {
    fontSize: 28,
  },
  stayBody: {
    flex: 1,
    gap: 3,
  },
  verifiedPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 4,
    backgroundColor: "#DFF9EF",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#0B5D5A",
    letterSpacing: 0.4,
  },
  stayName: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 16,
    fontWeight: "700",
    color: colors.deep,
  },
  stayDesc: {
    fontSize: 12,
    color: colors.subtitle,
  },
  stayDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 1,
  },
  stayDate: {
    fontSize: 12,
    color: colors.textMuted,
  },

  /* General cards */
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    padding: 16,
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deep,
  },
  cardHint: {
    fontSize: 11,
    color: colors.textMuted,
  },

  /* Overall rating */
  overallIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 12,
  },
  overallTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 18,
    fontWeight: "700",
    color: colors.deep,
    textAlign: "center",
    marginBottom: 5,
  },
  overallSub: {
    fontSize: 12.5,
    color: colors.subtitle,
    textAlign: "center",
    marginBottom: 14,
  },
  excellentPill: {
    alignSelf: "center",
    backgroundColor: "#DFF9EF",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 12,
  },
  excellentText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#0B5D5A",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
  },

  /* Category rows */
  catRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ECF0F2",
  },
  catIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: "#E3F0EF",
    alignItems: "center",
    justifyContent: "center",
  },
  catName: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.text,
  },
  catScore: {
    width: 26,
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.deep,
    textAlign: "right",
  },

  /* Review */
  tipsLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#22A06B",
  },
  textareaBox: {
    backgroundColor: "#F1F3F4",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  textarea: {
    minHeight: 116,
    fontSize: 13.5,
    lineHeight: 19,
    color: colors.text,
  },
  counterRow: {
    alignItems: "flex-end",
  },
  counterText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  reviewPrompt: {
    fontSize: 12,
    fontStyle: "italic",
    color: colors.textMuted,
    marginTop: 8,
  },

  /* Media */
  mediaProgressRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  mediaProgress: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#22A06B",
  },
  mediaRow: {
    flexDirection: "row",
    gap: 10,
  },
  mediaTile: {
    width: 88,
    height: 88,
    borderRadius: 12,
    overflow: "hidden",
  },
  uploadTile: {
    backgroundColor: "#DFF9EF",
    borderWidth: 1.5,
    borderColor: colors.accent,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  uploadText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#0B5D5A",
  },
  mediaInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mediaEmoji: {
    fontSize: 30,
  },
  removeBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 2,
  },

  /* Tags */
  tagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ECEEF0",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagChipSelected: {
    backgroundColor: "#DFF9EF",
  },
  tagText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.subtitle,
  },
  tagTextSelected: {
    color: "#0B5D5A",
    fontWeight: "700",
  },

  /* Public */
  publicCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  publicIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E3F0EF",
    alignItems: "center",
    justifyContent: "center",
  },
  publicTexts: {
    flex: 1,
    gap: 2,
  },
  publicTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  publicSub: {
    fontSize: 12,
    color: colors.subtitle,
  },
  track: {
    width: 48,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#E3E7EA",
    padding: 3,
    justifyContent: "center",
  },
  trackOn: {
    backgroundColor: colors.accent,
  },
  knob: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: colors.white,
  },
  knobOn: {
    alignSelf: "flex-end",
  },

  /* Submit */
  bottomBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E5EA",
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 6,
  },
  submitBtn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
});