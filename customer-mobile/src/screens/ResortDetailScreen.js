import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Share,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { WebView } from "react-native-webview";
import { colors } from "../constants/theme";
import { getResortById } from "../data";

const buildMapHTML = (lat, lng) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  html, body { margin:0; padding:0; height:100%; }
  #map { height:100%; width:100%; background:#e9eee9; }
  .pin { display:flex; align-items:center; justify-content:center; }
  .dot { width:22px; height:22px; border-radius:50% 50% 50% 0; background:#E74C3C; transform:rotate(-45deg); border:2.5px solid #fff; box-shadow:0 1px 5px rgba(0,0,0,.3); }
</style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map', { zoomControl: false, attributionControl: false, scrollWheelZoom: false }).setView([${lat}, ${lng}], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
  var icon = L.divIcon({ className: '', html: '<div class="pin"><div class="dot"></div></div>', iconSize: [26, 26], iconAnchor: [13, 26] });
  L.marker([${lat}, ${lng}], { icon: icon }).addTo(map);
</script>
</body>
</html>`;

export default function ResortDetailScreen({ navigation, route }) {
  const resort = route.params?.resort || {};
  const data = getResortById(resort.id);
  const [favorited, setFavorited] = useState(false);

  const mapLat = resort.lat ?? 14.7353;
  const mapLng = resort.lng ?? 121.1267;

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out ${resort.name} in ${resort.location} on HanaPin!`,
      });
    } catch (e) {}
  };

  const onOpenMaps = () => {
    const url =
      Platform.OS === "ios"
        ? `maps:0,0?q=${mapLat},${mapLng}`
        : `geo:${mapLat},${mapLng}?q=${mapLat},${mapLng}`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Hero ── */}
        <View style={styles.hero}>
          <LinearGradient
            colors={data.heroColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <Text style={styles.heroEmoji}>
              {data.emoji}
            </Text>
            <Text style={styles.heroName}>{resort.name}</Text>
          </LinearGradient>

          {/* Fade toward bottom */}
          <LinearGradient
            colors={["transparent", "rgba(8, 63, 74, 0.55)"]}
            style={styles.heroFade}
            pointerEvents="none"
          />

          {/* Floating navigation pill */}
          <View style={styles.floatingNav}>
            <TouchableOpacity
              style={styles.navBtn}
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color={colors.deep} />
            </TouchableOpacity>
            <View style={styles.navRight}>
              <TouchableOpacity style={styles.navBtn} activeOpacity={0.7} onPress={onShare}>
                <Ionicons name="share-outline" size={19} color={colors.deep} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navBtn}
                activeOpacity={0.7}
                onPress={() => setFavorited((p) => !p)}
              >
                <Ionicons
                  name={favorited ? "heart" : "heart-outline"}
                  size={20}
                  color={favorited ? colors.danger : colors.deep}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── Resort summary card (overlaps hero) ── */}
        <View style={styles.summaryCard}>
          <Text style={styles.resortName}>{data.fullName}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color={colors.deep} />
              <Text style={styles.ratingText}>{data.rating}</Text>
            </View>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{data.category}</Text>
            </View>
          </View>

          <View style={styles.locRow}>
            <Ionicons name="location" size={14} color={colors.textMuted} />
            <Text style={styles.locText}>
              {data.location}
            </Text>
          </View>
        </View>

        {/* ── Opening Hours ── */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Opening Hours</Text>
          <View style={styles.hoursRow}>
            <Ionicons name="time-outline" size={15} color={colors.subtitle} />
            <Text style={styles.hoursText}>{data.hours}</Text>
          </View>
        </View>

        {/* ── Price Preview ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Price Preview</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Pricing")}
            >
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          {data.offers.map((offer) => (
            <View key={offer.label} style={styles.priceRow}>
              <Text style={styles.priceLabel}>{offer.label}</Text>
              <Text style={styles.priceValue}>{offer.price}</Text>
            </View>
          ))}
        </View>

        {/* ── About ── */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>About</Text>
          <Text style={styles.aboutText}>
            {data.about}
          </Text>
        </View>

        {/* ── Amenities ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Amenities</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Amenities")}
            >
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.amenityGrid}>
            {data.amenities.map((a) => (
              <View key={a.label} style={styles.amenityCard}>
                <Ionicons name={a.icon} size={24} color={colors.deep} />
                <Text style={styles.amenityLabel}>{a.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Location ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Location</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={onOpenMaps}>
              <Text style={styles.viewAll}>Open Maps</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mapWrap}>
            <WebView
              style={styles.mapPreview}
              originWhitelist={["*"]}
              source={{ html: buildMapHTML(mapLat, mapLng) }}
              javaScriptEnabled
              domStorageEnabled
              scrollEnabled={false}
            />
          </View>
          <View style={styles.addressRow}>
            <Ionicons name="location" size={15} color={colors.accent} />
            <Text style={styles.addressText}>
              {data.address}
            </Text>
          </View>
        </View>

        {/* ── Gallery ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Gallery</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Gallery")}
            >
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryContent}
          >
            {data.gallery.map((item, i) => (
              <View
                key={i}
                style={[styles.galleryTile, i === 0 && styles.galleryTileFirst]}
              >
                <LinearGradient colors={item.colors} style={styles.galleryGradient}>
                  <Text style={styles.galleryEmoji}>{item.emoji}</Text>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ── Reviews ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Reviews</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Reviews")}
            >
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          {data.reviews.map((review) => (
            <View key={review.name} style={styles.reviewCard}>
              <View style={styles.reviewTopRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{review.initials}</Text>
                </View>
                <View style={styles.reviewMeta}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
              <View style={styles.reviewStars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Ionicons key={i} name="star" size={14} color={colors.accent} />
                ))}
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ── Book Now bar ── */}
      <View style={styles.bookBar}>
        <TouchableOpacity
          style={styles.bookBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("BookingForm")}
        >
          <Text style={styles.bookBtnText}>Book Now</Text>
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
  scroll: {
    paddingBottom: 40,
  },

  /* Hero */
  hero: {
    height: 300,
  },
  heroGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
    gap: 8,
  },
  heroEmoji: {
    fontSize: 72,
  },
  heroName: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 22,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.5,
  },
  heroFade: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingNav: {
    position: "absolute",
    top: 10,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    borderRadius: 26,
    paddingVertical: 6,
    paddingHorizontal: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
  },
  navRight: {
    flexDirection: "row",
    gap: 6,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Summary card */
  summaryCard: {
    marginTop: -42,
    marginHorizontal: 18,
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    padding: 18,
    marginBottom: 26,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  resortName: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 24,
    fontWeight: "700",
    color: colors.deep,
    letterSpacing: 0.2,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#52E6B0",
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.deep,
  },
  categoryPill: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: colors.white,
  },
  locRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locText: {
    fontSize: 13,
    color: colors.subtitle,
  },

  /* Sections */
  section: {
    marginBottom: 26,
    paddingHorizontal: 18,
  },
  sectionHeading: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 17,
    fontWeight: "700",
    color: colors.deep,
    marginBottom: 12,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  viewAll: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.accent,
    marginBottom: 12,
  },

  /* Opening Hours */
  hoursRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hoursText: {
    fontSize: 14,
    color: colors.subtitle,
  },

  /* Price Preview */
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#DDE2E6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.text,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deep,
  },

  /* Gallery */
  galleryContent: {
    paddingLeft: 18,
    paddingRight: 44,
    gap: 10,
  },
  galleryTile: {
    width: 150,
    height: 120,
    borderRadius: 14,
    overflow: "hidden",
  },
  galleryTileFirst: {
    width: 200,
  },
  galleryGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  galleryEmoji: {
    fontSize: 40,
  },

  /* About */
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.subtitle,
  },

  /* Amenities */
  amenityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  amenityCard: {
    width: "48%",
    flexGrow: 1,
    backgroundColor: "#F1F3F5",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  amenityLabel: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.text,
  },

  /* Location */
  mapWrap: {
    height: 160,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E3E7EA",
  },
  mapPreview: {
    flex: 1,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  addressText: {
    fontSize: 13,
    color: colors.subtitle,
  },

  /* Reviews */
  reviewCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E8ECF0",
    borderRadius: 14,
    padding: 16,
  },
  reviewTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#52E6B0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.deep,
  },
  reviewMeta: {
    flex: 1,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  reviewStars: {
    flexDirection: "row",
    gap: 3,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.subtitle,
  },

  /* Book Now bar */
  bookBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F7F8FA",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#DDE2E6",
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  bookBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },
  bookBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
});