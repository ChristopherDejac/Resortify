import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/theme";
import BottomTabBar from "../components/BottomTabBar";
import AIChatButton from "../components/AIChatButton";
import { resorts, mapResorts } from "../data";
import { exploreCategories as categories } from "../data";

const OSM_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  html, body { margin:0; padding:0; height:100%; }
  #map { height:100%; width:100%; background:#e9eee9; }
  .pin { display:flex; flex-direction:column; align-items:center; line-height:0; }
  .bubble { display:flex; align-items:center; gap:5px; background:#fff; border-radius:10px; padding:4px 8px 4px 8px; margin-bottom:3px; font-family:Helvetica, Arial, sans-serif; font-size:11px; font-weight:600; color:#18353C; white-space:nowrap; box-shadow:0 1px 5px rgba(0,0,0,.28); border:1.5px solid transparent; }
  .marker-active .bubble { border-color:#0B5D5A; }
  .price { background:#55E8B0; color:#004C55; font-weight:700; font-size:10px; border-radius:6px; padding:2px 5px; }
  .dot { width:32px; height:32px; border-radius:50%; background:#0B5D5A; border:2px solid #fff; box-shadow:0 1px 5px rgba(0,0,0,.35); display:flex; align-items:center; justify-content:center; font-size:15px; color:#fff; }
  .marker-active .dot { background:#2AAE8E; }
</style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map', { zoomControl: false, attributionControl: true }).setView([14.7353, 121.1267], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
  var RESORTS = ${JSON.stringify(mapResorts)};
  var MARKERS = {};
  RESORTS.forEach(function (r) {
    var icon = L.divIcon({
      className: '',
      html: '<div class="pin" id="pin-' + r.id + '"><div class="bubble"><span>' + r.name + '</span><span class="price">\u20B1' + r.price + '</span></div><div class="dot">\u{1F4A7}</div></div>',
      iconSize: [150, 84],
      iconAnchor: [75, 84]
    });
    var m = L.marker([r.lat, r.lng], { icon: icon }).addTo(map);
    MARKERS[r.id] = m;
    m.on('click', function () {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'select', id: r.id }));
      }
    });
  });
  window.__updateSelected = function (id) {
    for (var k in MARKERS) {
      var el = MARKERS[k]._icon;
      if (el) {
        if (k === id) el.classList.add('marker-active');
        else el.classList.remove('marker-active');
      }
    }
  };
</script>
</body>
</html>`;

function FeaturedResortCard({ resort, onViewDetails }) {
  if (!resort) return null;
  return (
    <View style={styles.featuredCard}>
      <View style={styles.featuredImage}>
        <LinearGradient
          colors={["#2AAE8E", "#0B5D5A"]}
          style={styles.featuredGradient}
        >
          <Text style={styles.featuredEmoji}>🏖️</Text>
        </LinearGradient>
        {resort.topRated && (
          <View style={styles.topRatedBadge}>
            <Ionicons name="star" size={9} color={colors.deep} />
            <Text style={styles.topRatedText}>TOP RATED</Text>
          </View>
        )}
      </View>

      <View style={styles.featuredBody}>
        <View style={styles.featuredTitleRow}>
          <Text style={styles.featuredName} numberOfLines={1}>
            {resort.name}
          </Text>
          <Pressable style={styles.heartBtn} hitSlop={8}>
            <Ionicons name="heart-outline" size={18} color={colors.textMuted} />
          </Pressable>
        </View>

        <View style={styles.featuredRatingRow}>
          <Ionicons name="star" size={13} color={colors.star} />
          <Text style={styles.featuredRating}>{resort.rating}</Text>
          <Text style={styles.featuredReviewCount}>({resort.reviewCount} reviews)</Text>
        </View>

        <View style={styles.featuredLocRow}>
          <Ionicons name="location" size={12} color={colors.textMuted} />
          <Text style={styles.featuredLoc} numberOfLines={1}>
            {resort.location}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.detailsBtn}
          activeOpacity={0.85}
          onPress={onViewDetails}
        >
          <Text style={styles.detailsBtnText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ExploreScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("1");
  const [activeCategory, setActiveCategory] = useState(0);
  const webRef = useRef(null);

  const featuredResort =
    resorts.find((r) => r.id === selectedId) || resorts[0];

  useEffect(() => {
    webRef.current?.injectJavaScript(
      `try { window.__updateSelected && window.__updateSelected(${JSON.stringify(
        selectedId
      )}); } catch (e) {} true;`
    );
  }, [selectedId]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logoLeaf}>🌿</Text>
          <Text style={styles.logoText}>HanaPin</Text>
        </View>
        <TouchableOpacity
          style={styles.bellBtn}
          activeOpacity={0.7}
          onPress={() => navigation.getParent().navigate("Notifications")}
        >
          <Ionicons name="notifications-outline" size={22} color={colors.deep} />
        </TouchableOpacity>
      </View>

      {/* Search bar (floating) */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() =>
            navigation.navigate("ResortResult", { q: search })
          }
          returnKeyType="search"
          placeholder="Search resorts in Montalban"
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          style={styles.filterBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Filter")}
        >
          <Ionicons name="options-outline" size={17} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Map area */}
      <View style={styles.mapArea}>
        {/* OpenStreetMap */}
        <WebView
          ref={webRef}
          style={styles.mapWeb}
          originWhitelist={["*"]}
          source={{ html: OSM_HTML }}
          javaScriptEnabled
          domStorageEnabled
          onMessage={(event) => {
            try {
              const data = JSON.parse(event.nativeEvent.data);
              if (data.type === "select") setSelectedId(data.id);
            } catch (e) {}
          }}
        />

        {/* Category chips */}
        <View style={styles.chipsRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContent}
          >
            {categories.map((cat, i) => {
              const active = activeCategory === i;
              return (
                <TouchableOpacity
                  key={cat.label}
                  style={[styles.chip, active && styles.chipActive]}
                  activeOpacity={0.7}
                  onPress={() => setActiveCategory(i)}
                >
                  <Ionicons
                    name={active ? cat.activeIcon : cat.icon}
                    size={13}
                    color={active ? colors.white : colors.deep}
                  />
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Floating controls */}
        <View style={styles.floatingControls}>
          <TouchableOpacity style={styles.floatBtn} activeOpacity={0.85}>
            <Ionicons name="layers-outline" size={18} color={colors.deep} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatBtn} activeOpacity={0.85}>
            <MaterialCommunityIcons name="star-four-points" size={18} color={colors.deep} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatBtn} activeOpacity={0.85}>
            <Ionicons name="navigate-outline" size={18} color={colors.deep} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatBtn} activeOpacity={0.85}>
            <Ionicons name="locate-outline" size={18} color={colors.deep} />
          </TouchableOpacity>
        </View>

        {/* Featured resort card */}
        <FeaturedResortCard
          resort={featuredResort}
          onViewDetails={() =>
            navigation.navigate("ResortDetail", { resort: featuredResort })
          }
        />

        {/* AI chatbot floating button */}
        <AIChatButton navigation={navigation} bottomOffset={282} />
      </View>

      {/* Bottom navigation */}
      <BottomTabBar
        active="Home"
        onSelect={(key) => {
          if (key === "Home") {
            navigation.pop();
          } else {
            navigation.navigate("MainTabs", { screen: key });
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E3E7EA",
    paddingHorizontal: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  logoLeaf: {
    fontSize: 18,
  },
  logoText: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 20,
    fontWeight: "700",
    color: colors.deep,
    letterSpacing: 0.5,
  },
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrap: {
    height: 46,
    marginHorizontal: 14,
    marginTop: 6,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingLeft: 14,
    paddingRight: 6,
    gap: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  mapArea: {
    flex: 1,
  },
  mapWeb: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  chipsRow: {
    position: "absolute",
    top: 14,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  chipsContent: {
    paddingHorizontal: 14,
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    height: 36,
    paddingHorizontal: 13,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.deep,
  },
  chipTextActive: {
    color: colors.white,
  },
  floatingControls: {
    position: "absolute",
    top: 66,
    right: 14,
    gap: 10,
    zIndex: 10,
  },
  floatBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  featuredCard: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 16,
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 10,
    gap: 12,
    elevation: 6,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  featuredImage: {
    width: 84,
    height: 118,
    borderRadius: 12,
    overflow: "hidden",
  },
  featuredGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredEmoji: {
    fontSize: 34,
  },
  topRatedBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colors.mint,
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  topRatedText: {
    fontSize: 8,
    fontWeight: "800",
    color: colors.deep,
    letterSpacing: 0.3,
  },
  featuredBody: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
  },
  featuredTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  featuredName: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  heartBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F3F5",
  },
  featuredRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  featuredRating: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  featuredReviewCount: {
    fontSize: 12,
    color: colors.subtitle,
  },
  featuredLocRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  featuredLoc: {
    fontSize: 11,
    color: colors.textMuted,
  },
  detailsBtn: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginTop: 2,
  },
  detailsBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
  },
});