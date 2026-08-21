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
import { useTheme } from "../context/ThemeContext";

const TABS = ["Upcoming", "Completed", "Cancelled"];

const bookingsData = {
  Upcoming: [
    {
      id: 1,
      resort: "HanaPin Beach Resort",
      location: "Siargao, Philippines",
      dates: "Aug 25 - Aug 28, 2026",
      status: "Confirmed",
      statusColor: "mint",
      emoji: "🏖️",
    },
    {
      id: 2,
      resort: "Mountain View Lodge",
      location: "Benguet, Philippines",
      dates: "Sep 5 - Sep 7, 2026",
      status: "Confirmed",
      statusColor: "mint",
      emoji: "🏔️",
    },
  ],
  Completed: [
    {
      id: 3,
      resort: "Coral Bay Retreat",
      location: "Palawan, Philippines",
      dates: "Jul 10 - Jul 14, 2026",
      status: "Completed",
      statusColor: "blue",
      emoji: "🐠",
    },
  ],
  Cancelled: [
    {
      id: 4,
      resort: "Tropical Haven Resort",
      location: "Batangas, Philippines",
      dates: "Jun 1 - Jun 3, 2026",
      status: "Cancelled",
      statusColor: "gray",
      emoji: "🌴",
    },
  ],
};

function BookingCard({ booking, statusColor, colors }) {
  const badgeBg =
    statusColor === "mint"
      ? colors.secondary
      : statusColor === "blue"
      ? "#D6EEF8"
      : "#ECEEF0";
  const badgeText =
    statusColor === "mint"
      ? colors.deep
      : statusColor === "blue"
      ? "#1A7A8A"
      : colors.subtitle;

  const getActions = () => {
    if (statusColor === "mint") {
      return (
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.deep }]} activeOpacity={0.7}>
            <Text style={[styles.actionBtnText, { color: colors.white }]}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: colors.deep }]} activeOpacity={0.7}>
            <Text style={[styles.actionBtnText, { color: colors.deep }]}>Directions</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (statusColor === "blue") {
      return (
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.deep }]} activeOpacity={0.7}>
            <Text style={[styles.actionBtnText, { color: colors.white }]}>Rate & Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: colors.deep }]} activeOpacity={0.7}>
            <Text style={[styles.actionBtnText, { color: colors.deep }]}>Receipt</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.deep }]} activeOpacity={0.7}>
          <Text style={[styles.actionBtnText, { color: colors.white }]}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline, { borderColor: colors.deep }]} activeOpacity={0.7}>
          <Text style={[styles.actionBtnText, { color: colors.deep }]}>Rebook</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.imageBox}>
        <Text style={styles.imageEmoji}>{booking.emoji}</Text>
        <View style={[styles.badge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.badgeText, { color: badgeText }]}>{booking.status}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={[styles.resortName, { color: colors.text }]}>{booking.resort}</Text>
        <View style={styles.datesRow}>
          <Text style={styles.datesLabel}>DATES</Text>
          <Text style={[styles.datesValue, { color: colors.text }]}>{booking.dates}</Text>
        </View>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={colors.subtitle} />
          <Text style={[styles.locationText, { color: colors.subtitle }]}>{booking.location}</Text>
        </View>
        {getActions()}
      </View>
    </View>
  );
}

export default function BookingsScreen({ navigation }) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState("Upcoming");

  const bookings = bookingsData[activeTab] || [];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["top"]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <Text style={styles.logoLeaf}>🌿</Text>
          <Text style={[styles.logoText, { color: colors.deep }]}>HanaPin</Text>
        </View>
        <TouchableOpacity
          style={styles.bellBtn}
          activeOpacity={0.7}
          onPress={() => navigation.getParent().navigate("Notifications")}
        >
          <Ionicons name="notifications-outline" size={22} color={colors.deep} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsWrap, { backgroundColor: colors.background }]}>
        <View style={[styles.tabsContainer, { backgroundColor: "#E8ECF0" }]}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, isActive && { backgroundColor: colors.card }]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, { color: isActive ? colors.deep : colors.subtitle, fontWeight: isActive ? "700" : "500" }]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Booking List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {bookings.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={[styles.emptyText, { color: colors.text }]}>No {activeTab.toLowerCase()} bookings</Text>
            <Text style={[styles.emptySub, { color: colors.subtitle }]}>Start planning your getaway!</Text>
          </View>
        ) : (
          bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              statusColor={booking.statusColor}
              colors={colors}
            />
          ))
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
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
    letterSpacing: 0.5,
  },
  bellBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  tabsWrap: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 3,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabText: {
    fontSize: 13,
  },
  scroll: {
    padding: 14,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  imageBox: {
    height: 150,
    backgroundColor: "#D4E4E8",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  imageEmoji: {
    fontSize: 48,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  cardBody: {
    padding: 14,
    gap: 6,
  },
  resortName: {
    fontSize: 16,
    fontWeight: "700",
  },
  datesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  datesLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#9AA8B2",
    letterSpacing: 0.5,
  },
  datesValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionBtnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: "600",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 56,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
  },
  emptySub: {
    fontSize: 14,
  },
});
