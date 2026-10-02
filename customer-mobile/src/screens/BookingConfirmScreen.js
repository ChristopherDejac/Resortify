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
import BookingProgress from "../components/BookingProgress";

export default function BookingConfirmScreen({ navigation }) {
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
        <Text style={styles.headerTitle}>Bookings</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.divider} />

      <BookingProgress current={2} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Success area */}
        <View style={styles.successArea}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={36} color={colors.white} />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successBody}>
            Your reservation at Costa Abril Resort has been secured. A
            confirmation email has been sent to juan.dc@example.com.
          </Text>
        </View>

        {/* Booking ID pill */}
        <View style={styles.idPill}>
          <Ionicons name="copy-outline" size={13} color={colors.deep} />
          <Text style={styles.idText}>BK-2026-09-001742</Text>
        </View>

        {/* Reservation card */}
        <View style={styles.resCard}>
          <LinearGradient
            colors={["#2AAE8E", "#0B5D5A"]}
            style={styles.resHero}
          >
            <Text style={styles.resHeroEmoji}>🏖️</Text>
          </LinearGradient>

          <View style={styles.resBody}>
            <Text style={styles.destLabel}>Destination</Text>
            <Text style={styles.resortName}>Costa Abril Resort</Text>

            <View style={styles.resDetails}>
              <View style={styles.resCol}>
                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color={colors.subtitle}
                />
                <Text style={styles.resDetailText}>Dec 12, 2026</Text>
              </View>
              <View style={styles.resCol}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={colors.subtitle}
                />
                <Text style={styles.resDetailText}>8:00 AM</Text>
              </View>
            </View>

            <View style={styles.resBottomRow}>
              <View style={styles.resAccom}>
                <View style={styles.resAccomIcon}>
                  <Ionicons
                    name="umbrella-outline"
                    size={16}
                    color={colors.deep}
                  />
                </View>
                <Text style={styles.resAccomText}>Umbrella Cottage</Text>
              </View>
              <View style={styles.reservedPill}>
                <Text style={styles.reservedText}>Reserved</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Total paid */}
        <View style={styles.paidArea}>
          <Text style={styles.paidLabel}>Total Amount Paid</Text>
          <Text style={styles.paidValue}>₱2,300.00</Text>
        </View>

        {/* Bottom CTAs */}
        <View style={styles.actionsWrap}>
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.88}
            onPress={() => navigation.navigate("MainTabs", { screen: "Bookings" })}
          >
            <Text style={styles.primaryBtnText}>View My Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            activeOpacity={0.88}
            onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
          >
            <Text style={styles.secondaryBtnText}>Return to Home</Text>
          </TouchableOpacity>
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

  /* Scroll */
  scrollView: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 36,
    alignItems: "center",
    paddingHorizontal: 18,
  },

  /* Success */
  successArea: {
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 12,
  },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontStyle: "italic",
    fontSize: 22,
    fontWeight: "700",
    color: colors.deep,
    marginBottom: 10,
  },
  successBody: {
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.subtitle,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  /* Booking ID */
  idPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderWidth: 1.5,
    borderColor: "#D5DBE0",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginBottom: 24,
  },
  idText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.deep,
    letterSpacing: 0.6,
  },

  /* Reservation card */
  resCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    overflow: "hidden",
  },
  resHero: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  resHeroEmoji: {
    fontSize: 44,
  },
  resBody: {
    padding: 16,
  },
  destLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  resortName: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 17,
    fontWeight: "700",
    color: colors.deep,
    marginBottom: 14,
  },
  resDetails: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 16,
  },
  resCol: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  resDetailText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  resBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E8ECF0",
    paddingTop: 14,
  },
  resAccom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  resAccomIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E3F0EF",
    alignItems: "center",
    justifyContent: "center",
  },
  resAccomText: {
    fontSize: 13.5,
    fontWeight: "600",
    color: colors.text,
  },
  reservedPill: {
    backgroundColor: "#DFF9EF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  reservedText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0B5D5A",
  },

  /* Total paid */
  paidArea: {
    alignItems: "center",
    marginTop: 28,
    gap: 4,
  },
  paidLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.subtitle,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  paidValue: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 26,
    fontWeight: "800",
    color: colors.deep,
  },

  /* CTAs */
  actionsWrap: {
    width: "100%",
    gap: 12,
    marginTop: 30,
  },
  primaryBtn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  secondaryBtn: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deep,
  },
});