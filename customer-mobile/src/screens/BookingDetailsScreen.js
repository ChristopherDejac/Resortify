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
import { getBookingById, getResortById } from "../data";

export default function BookingDetailsScreen({ navigation, route }) {
  const booking = getBookingById(route.params?.bookingId);
  const resort = getResortById(booking.resortId);
  const [inDay, inTime] = booking.checkIn.split(" · ");
  const [outDay, outTime] = booking.checkOut.split(" · ");
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.deep} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Ionicons name="share-outline" size={20} color={colors.deep} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.deep} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Booking status header */}
        <View style={styles.statusCard}>
          <View style={styles.statusTopRow}>
            <Text style={styles.reference}>{booking.bookingRef}</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>{booking.statusSubtitle}</Text>
            </View>
          </View>
          <View style={styles.statusRow}>
            <Ionicons name="checkmark-circle" size={16} color="#22A06B" />
            <Text style={styles.statusText}>{booking.statusNote}</Text>
          </View>
        </View>

        {/* Resort image */}
        <View style={styles.imageCard}>
          <LinearGradient colors={booking.gradient} style={styles.imageGradient}>
            <Text style={styles.imageEmoji}>{booking.emoji}</Text>
          </LinearGradient>
          <View style={[styles.imagePill, styles.ratingPill]}>
            <Ionicons name="star" size={12} color={colors.star} />
            <Text style={styles.imagePillText}>{booking.rating}</Text>
          </View>
          <View style={[styles.imagePill, styles.categoryPill]}>
            <Text style={styles.imagePillText}>{booking.categoryPill}</Text>
          </View>
        </View>

        {/* Resort info */}
        <Text style={styles.resortName}>{booking.resort}</Text>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={15} color={colors.subtitle} />
          <Text style={styles.addressText}>
            {booking.address}
          </Text>
        </View>
        <View style={styles.resortActions}>
          <TouchableOpacity
            style={styles.viewResortBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("ResortDetail", { resort })}
          >
            <Text style={styles.viewResortText}>View Resort</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.directionsBtn}
            activeOpacity={0.85}
          >
            <Ionicons name="navigate-outline" size={15} color={colors.deep} />
            <Text style={styles.directionsText}>Directions</Text>
          </TouchableOpacity>
        </View>

        {/* Stay itinerary */}
        <View style={styles.itineraryCard}>
          <View style={styles.itineraryHeader}>
            <Ionicons name="calendar-outline" size={17} color={colors.deep} />
            <Text style={styles.itineraryTitle}>{booking.stayType} Stay</Text>
          </View>

          <View style={styles.checkRow}>
            <View style={styles.checkBox}>
              <Text style={styles.checkLabel}>Check-in</Text>
              <Text style={styles.checkDay}>{inDay}</Text>
              <Text style={styles.checkTime}>{inTime}</Text>
            </View>
            <View style={styles.checkBox}>
              <Text style={styles.checkLabel}>Check-out</Text>
              <Text style={styles.checkDay}>{outDay}</Text>
              <Text style={styles.checkTime}>{outTime}</Text>
            </View>
          </View>

          <View style={styles.itineraryDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Stay Type</Text>
            <Text style={styles.infoValue}>{booking.stayType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Reserved Guests</Text>
            <Text style={styles.infoValue}>{booking.guests}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Accommodation</Text>
            <View style={styles.accomWrap}>
              <View style={styles.accomIcon}>
                <Ionicons name="umbrella-outline" size={14} color={colors.deep} />
              </View>
              <Text style={styles.infoValue}>{booking.accommodation}</Text>
            </View>
          </View>
        </View>

        {/* Bottom actions */}
        <TouchableOpacity
          style={styles.receiptBtn}
          activeOpacity={0.88}
          onPress={() =>
            navigation.navigate("Receipt", { bookingId: booking.id })
          }
        >
          <Ionicons name="receipt-outline" size={17} color={colors.white} />
          <Text style={styles.receiptText}>View Official Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.85}>
          <Text style={styles.cancelText}>Cancel Reservation</Text>
        </TouchableOpacity>

        <Text style={styles.policyNote}>
          Free cancellation up to 48 hours before check-in. Late cancellations
          may be subject to a 50% fee of the total amount.
        </Text>
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
    paddingHorizontal: 10,
    backgroundColor: "#F7F8FA",
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 19,
    fontWeight: "700",
    color: colors.deep,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingBottom: 36,
  },

  /* Status card */
  statusCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 18,
    gap: 10,
  },
  statusTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reference: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.deep,
    letterSpacing: 0.4,
  },
  statusPill: {
    backgroundColor: "#DFF9EF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0B5D5A",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#22A06B",
  },

  /* Resort image */
  imageCard: {
    borderRadius: 18,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    marginBottom: 16,
  },
  imageGradient: {
    height: 190,
    alignItems: "center",
    justifyContent: "center",
  },
  imageEmoji: {
    fontSize: 56,
  },
  imagePill: {
    position: "absolute",
    bottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ratingPill: {
    left: 12,
  },
  categoryPill: {
    right: 12,
  },
  imagePillText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.deep,
  },

  /* Resort info */
  resortName: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 21,
    fontWeight: "700",
    color: colors.deep,
    marginBottom: 6,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 14,
  },
  addressText: {
    flex: 1,
    fontSize: 13,
    color: colors.subtitle,
  },
  resortActions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 22,
  },
  viewResortBtn: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },
  viewResortText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.white,
  },
  directionsBtn: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  directionsText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.deep,
  },

  /* Itinerary */
  itineraryCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    padding: 16,
    marginBottom: 24,
  },
  itineraryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  itineraryTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 16,
    fontWeight: "700",
    color: colors.deep,
  },
  checkRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  checkBox: {
    flex: 1,
    backgroundColor: "#F4F6F7",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    padding: 12,
    gap: 3,
  },
  checkLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  checkDay: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginTop: 2,
  },
  checkTime: {
    fontSize: 12.5,
    color: colors.subtitle,
  },
  itineraryDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E8ECF0",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.subtitle,
  },
  infoValue: {
    fontSize: 13.5,
    fontWeight: "600",
    color: colors.text,
  },
  accomWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  accomIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E3F0EF",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Bottom actions */
  receiptBtn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.deep,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  receiptText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  cancelBtn: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.danger,
  },
  policyNote: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textMuted,
    textAlign: "center",
    paddingHorizontal: 8,
  },
});