import { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform,
  PanResponder,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import {
  barangays,
  distances,
  priceCategories,
  resortTypes,
  accommodations,
  priceRange,
} from "../data";

const MIN_PRICE = priceRange.min;
const MAX_PRICE = priceRange.max;

function RangeSlider({ min, max, minVal, maxVal, onMinChange, onMaxChange }) {
  const trackWidth = useRef(0);

  const clamp = (val, lo, hi) => Math.min(Math.max(val, lo), hi);

  const pctFromX = (x) => clamp((x / trackWidth.current) * (max - min) + min, min, max);

  const panMin = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 2,
      onPanResponderMove: (_, g) => {
        const absX = clamp(g.x0 + g.dx - 20, 0, trackWidth.current);
        const val = Math.round(pctFromX(absX) / 25) * 25;
        if (val <= maxVal) onMinChange(val);
      },
    })
  ).current;

  const panMax = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 2,
      onPanResponderMove: (_, g) => {
        const absX = clamp(g.x0 + g.dx - 20, 0, trackWidth.current);
        const val = Math.round(pctFromX(absX) / 25) * 25;
        if (val >= minVal) onMaxChange(val);
      },
    })
  ).current;

  const minPct = ((minVal - min) / (max - min)) * 100;
  const maxPct = ((maxVal - min) / (max - min)) * 100;

  return (
    <View>
      <View
        style={sliderStyles.trackBg}
        onLayout={(e) => {
          trackWidth.current = e.nativeEvent.layout.width;
        }}
      >
        <View
          style={[
            sliderStyles.trackFill,
            { left: `${minPct}%`, width: `${maxPct - minPct}%` },
          ]}
        />
        <View
          style={[sliderStyles.thumb, { left: `${minPct}%`, transform: [{ translateX: -12 }] }]}
          {...panMin.panHandlers}
        >
          <View style={sliderStyles.thumbInner} />
        </View>
        <View
          style={[sliderStyles.thumb, { left: `${maxPct}%`, transform: [{ translateX: -12 }] }]}
          {...panMax.panHandlers}
        >
          <View style={sliderStyles.thumbInner} />
        </View>
      </View>
      <View style={sliderStyles.labels}>
        <Text style={sliderStyles.labelText}>₱{minVal.toLocaleString()}</Text>
        <Text style={sliderStyles.labelText}>₱{maxVal >= 1000 ? "1,000+" : maxVal.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const sliderStyles = StyleSheet.create({
  trackBg: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E5EA",
    position: "relative",
    marginVertical: 14,
  },
  trackFill: {
    position: "absolute",
    top: 0,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  thumb: {
    position: "absolute",
    top: -7,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  thumbInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.deep,
  },
});

export default function FilterScreen({ navigation, route }) {
  const [barangay, setBarangay] = useState(null);
  const [showBarangay, setShowBarangay] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedPriceCat, setSelectedPriceCat] = useState(null);
  const [priceMin, setPriceMin] = useState(MIN_PRICE);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [mostReviewed, setMostReviewed] = useState(false);
  const [highestRated, setHighestRated] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAccom, setSelectedAccom] = useState([]);

  const toggleArrayItem = (arr, setArr, item) => {
    setArr((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );
  };

  const clearAll = () => {
    setBarangay(null);
    setSelectedDistance(null);
    setSelectedPriceCat(null);
    setPriceMin(MIN_PRICE);
    setPriceMax(MAX_PRICE);
    setSelectedRatings([]);
    setMostReviewed(false);
    setHighestRated(false);
    setSelectedTypes([]);
    setSelectedAccom([]);
  };

  const toggleRating = (star) => {
    setSelectedRatings((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const activeFilterCount =
    (barangay ? 1 : 0) +
    (selectedDistance ? 1 : 0) +
    (selectedPriceCat ? 1 : 0) +
    (priceMin > MIN_PRICE || priceMax < MAX_PRICE ? 1 : 0) +
    selectedRatings.length +
    (mostReviewed ? 1 : 0) +
    (highestRated ? 1 : 0) +
    selectedTypes.length +
    selectedAccom.length;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filter</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />

      {/* Scrollable content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Location ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>

          <TouchableOpacity
            style={styles.dropdown}
            activeOpacity={0.8}
            onPress={() => setShowBarangay((p) => !p)}
          >
            <Text style={barangay ? styles.dropdownText : styles.dropdownPlaceholder}>
              {barangay || "Select Barangay"}
            </Text>
            <Ionicons
              name={showBarangay ? "chevron-up" : "chevron-down"}
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          {showBarangay && (
            <View style={styles.dropdownList}>
              {barangays.map((b) => (
                <TouchableOpacity
                  key={b}
                  style={[
                    styles.dropdownItem,
                    barangay === b && styles.dropdownItemActive,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setBarangay(b);
                    setShowBarangay(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      barangay === b && styles.dropdownItemTextActive,
                    ]}
                  >
                    {b}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.subLabel}>Distance</Text>
          <View style={styles.pillRow}>
            {distances.map((d) => {
              const active = selectedDistance === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[styles.pill, active && styles.pillActive]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedDistance(active ? null : d)}
                >
                  <Text style={[styles.pillText, active && styles.pillTextActive]}>
                    {d}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Price Filters ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Filters</Text>

          <View style={styles.pillRow}>
            {priceCategories.map((cat) => {
              const active = selectedPriceCat === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.pill, active && styles.pillActive]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedPriceCat(active ? null : cat)}
                >
                  <Text style={[styles.pillText, active && styles.pillTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.subLabel, { marginTop: 18 }]}>Budget Range</Text>
          <RangeSlider
            min={MIN_PRICE}
            max={MAX_PRICE}
            minVal={priceMin}
            maxVal={priceMax}
            onMinChange={setPriceMin}
            onMaxChange={setPriceMax}
          />
        </View>

        {/* ── Ratings ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ratings</Text>

          <View style={styles.ratingList}>
            {[5, 4, 3, 2, 1].map((star) => {
              const active = selectedRatings.includes(star);
              return (
                <TouchableOpacity
                  key={star}
                  style={[styles.ratingRow, active && styles.ratingRowActive]}
                  activeOpacity={0.7}
                  onPress={() => toggleRating(star)}
                >
                  <View style={[styles.checkbox, active && styles.checkboxActive]}>
                    {active && <Ionicons name="checkmark" size={14} color={colors.white} />}
                  </View>
                  <View style={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Ionicons
                        key={i}
                        name={i < star ? "star" : "star-outline"}
                        size={16}
                        color={i < star ? colors.star : colors.border}
                      />
                    ))}
                  </View>
                  <Text style={styles.ratingLabel}>& Up</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.checkRow}
            activeOpacity={0.7}
            onPress={() => setMostReviewed((p) => !p)}
          >
            <View style={[styles.checkbox, mostReviewed && styles.checkboxActive]}>
              {mostReviewed && <Ionicons name="checkmark" size={14} color={colors.white} />}
            </View>
            <Text style={styles.checkLabel}>Most Reviewed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkRow}
            activeOpacity={0.7}
            onPress={() => setHighestRated((p) => !p)}
          >
            <View style={[styles.checkbox, highestRated && styles.checkboxActive]}>
              {highestRated && <Ionicons name="checkmark" size={14} color={colors.white} />}
            </View>
            <Text style={styles.checkLabel}>Highest Rated</Text>
          </TouchableOpacity>
        </View>

        {/* ── Resort Type ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resort Type</Text>
          <View style={styles.chipGrid}>
            {resortTypes.map((t) => {
              const active = selectedTypes.includes(t);
              return (
                <TouchableOpacity
                  key={t}
                  style={[styles.chip, active && styles.chipActive]}
                  activeOpacity={0.7}
                  onPress={() => toggleArrayItem(selectedTypes, setSelectedTypes, t)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Accommodation ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accommodation</Text>
          <View style={styles.accomGrid}>
            {accommodations.map((a) => {
              const active = selectedAccom.includes(a.label);
              return (
                <TouchableOpacity
                  key={a.label}
                  style={[styles.accomCard, active && styles.accomCardActive]}
                  activeOpacity={0.7}
                  onPress={() =>
                    toggleArrayItem(selectedAccom, setSelectedAccom, a.label)
                  }
                >
                  <View style={[styles.checkbox, active && styles.checkboxActive]}>
                    {active && <Ionicons name="checkmark" size={14} color={colors.white} />}
                  </View>
                  <Ionicons
                    name={a.icon}
                    size={18}
                    color={active ? colors.white : colors.deep}
                  />
                  <Text style={[styles.accomLabel, active && styles.accomLabelActive]}>
                    {a.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.clearBtn}
          activeOpacity={0.8}
          onPress={clearAll}
        >
          <Text style={styles.clearBtnText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.applyBtnText}>
            Apply Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </Text>
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
    paddingHorizontal: 18,
    backgroundColor: "#F7F8FA",
  },
  headerTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 22,
    fontWeight: "700",
    color: colors.deep,
    letterSpacing: 0.3,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF1F3",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#DDE2E6",
    marginHorizontal: 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 17,
    fontWeight: "700",
    color: colors.deep,
    marginBottom: 14,
  },
  subLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.subtitle,
    marginBottom: 8,
    marginTop: 4,
  },

  /* Dropdown */
  dropdown: {
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#DDE2E6",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: colors.text,
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: colors.textMuted,
  },
  dropdownList: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#DDE2E6",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#EEF1F3",
  },
  dropdownItemActive: {
    backgroundColor: "#EDF7F6",
  },
  dropdownItemText: {
    fontSize: 14,
    color: colors.text,
  },
  dropdownItemTextActive: {
    color: colors.deep,
    fontWeight: "600",
  },

  /* Pills */
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDE2E6",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.deep,
  },
  pillTextActive: {
    color: colors.white,
  },

  /* Ratings */
  ratingList: {
    gap: 10,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 42,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDE2E6",
    backgroundColor: colors.white,
  },
  ratingRowActive: {
    borderColor: colors.accent,
    backgroundColor: "#EDF7F6",
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  ratingLabel: {
    fontSize: 13,
    color: colors.subtitle,
    marginLeft: 2,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 42,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDE2E6",
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#C5CDD3",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  checkboxActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "500",
  },

  /* Resort Type chips */
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#DDE2E6",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.deep,
  },
  chipTextActive: {
    color: colors.white,
  },

  /* Accommodation cards */
  accomGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  accomCard: {
    width: "47.5%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDE2E6",
    backgroundColor: colors.white,
  },
  accomCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  accomLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    flexShrink: 1,
  },
  accomLabelActive: {
    color: colors.white,
  },

  /* Bottom bar */
  bottomBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 12,
    backgroundColor: "#F7F8FA",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E5EA",
  },
  clearBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  applyBtn: {
    flex: 1.5,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
});
