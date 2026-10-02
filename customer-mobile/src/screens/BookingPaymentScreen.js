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
import { colors } from "../constants/theme";
import BookingProgress from "../components/BookingProgress";

const reviewRows = [
  { label: "Stay", value: "Day Time Stay" },
  { label: "Date", value: "Dec 12, 2026" },
  { label: "Arrival", value: "8:00 AM" },
  { label: "Guests", value: "2 Adults" },
];

const priceItems = [
  { label: "Adult Entrance (×2)", value: "₱700" },
  { label: "Umbrella Cottage", value: "₱1,500" },
  { label: "Resort Fee", value: "₱100" },
];

const methods = [
  {
    key: "gcash",
    name: "GCash",
    icon: "phone-portrait-outline",
    sub: "Pay via mobile wallet",
    badge: "Included",
  },
  {
    key: "maya",
    name: "Maya",
    icon: "wallet-outline",
    sub: "Pay via digital bank",
    badge: null,
  },
  {
    key: "card",
    name: "Credit/Debit Card",
    icon: "card-outline",
    sub: "Visa, Mastercard, JCB",
    badge: null,
  },
];

export default function BookingPaymentScreen({ navigation }) {
  const [method, setMethod] = useState("gcash");

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

      <BookingProgress current={1} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Review Booking */}
        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionHeading}>Review Booking</Text>
          <TouchableOpacity
            style={styles.editBtn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("BookingForm")}
          >
            <Ionicons name="pencil-outline" size={16} color={colors.deep} />
          </TouchableOpacity>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.resortName}>Costa Abril Resort</Text>
          <View style={styles.reviewAccom}>
            <View style={styles.reviewAccomIcon}>
              <Ionicons name="umbrella-outline" size={16} color={colors.deep} />
            </View>
            <Text style={styles.reviewAccomText}>Umbrella Cottage</Text>
            <View style={styles.includedBadge}>
              <Text style={styles.includedText}>Included</Text>
            </View>
          </View>
          {reviewRows.map((row, i) => (
            <View key={row.label}>
              {i > 0 && <View style={styles.rowDivider} />}
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>{row.label}</Text>
                <Text style={styles.reviewValue}>{row.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Price Summary */}
        <Text style={[styles.sectionHeading, styles.priceHeading]}>Price Summary</Text>
        <View style={styles.priceCard}>
          {priceItems.map((item, i) => (
            <View key={item.label}>
              {i > 0 && <View style={styles.rowDivider} />}
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>{item.label}</Text>
                <Text style={styles.priceValue}>{item.value}</Text>
              </View>
            </View>
          ))}
          <View style={styles.priceDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₱2,300</Text>
          </View>
        </View>

        {/* Payment Method */}
        <Text style={[styles.sectionHeading, styles.payHeading]}>Payment Method</Text>
        <View style={styles.payWrap}>
          {methods.map((m) => {
            const selected = method === m.key;
            return (
              <TouchableOpacity
                key={m.key}
                style={[styles.payCard, selected && styles.payCardActive]}
                activeOpacity={0.85}
                onPress={() => setMethod(m.key)}
              >
                <View style={[styles.payIcon, selected && styles.payIconActive]}>
                  <Ionicons name={m.icon} size={20} color={colors.deep} />
                </View>
                <View style={styles.payTexts}>
                  <View style={styles.payNameRow}>
                    <Text style={styles.payName}>{m.name}</Text>
                    {m.badge ? (
                      <View style={styles.payBadge}>
                        <Text style={styles.payBadgeText}>{m.badge}</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.paySub}>{m.sub}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioActive]}>
                  {selected && <Ionicons name="checkmark" size={11} color={colors.white} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.totalWrap}>
          <Text style={styles.totalLabelSmall}>Total Amount</Text>
          <Text style={styles.totalValueBold}>₱ 2,300.00</Text>
        </View>
        <TouchableOpacity
          style={styles.ctaBtn}
          activeOpacity={0.88}
          onPress={() => navigation.navigate("BookingConfirm")}
        >
          <Text style={styles.ctaText}>Continue to Confirm</Text>
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
    paddingTop: 4,
    paddingBottom: 28,
    paddingHorizontal: 18,
  },

  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 14,
  },
  sectionHeading: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 17,
    fontWeight: "700",
    color: colors.deep,
  },
  editBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E3F0EF",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Review card */
  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  resortName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 10,
  },
  reviewAccom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingBottom: 12,
    marginBottom: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E8ECF0",
  },
  reviewAccomIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E3F0EF",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewAccomText: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: "600",
    color: colors.text,
  },
  includedBadge: {
    backgroundColor: "#DFF9EF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  includedText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0B5D5A",
  },
  reviewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
  },
  reviewLabel: {
    fontSize: 13,
    color: colors.subtitle,
  },
  reviewValue: {
    fontSize: 13.5,
    fontWeight: "600",
    color: colors.text,
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E8ECF0",
  },

  /* Price summary */
  priceHeading: {
    marginTop: 24,
    marginBottom: 14,
  },
  priceCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
  },
  priceLabel: {
    fontSize: 13.5,
    color: "#3C4447",
  },
  priceValue: {
    fontSize: 13.5,
    fontWeight: "600",
    color: colors.text,
  },
  priceDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E0E5EA",
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalLabel: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 16,
    fontWeight: "700",
    color: colors.deep,
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.deep,
  },

  /* Payment methods */
  payHeading: {
    marginTop: 24,
    marginBottom: 14,
  },
  payWrap: {
    gap: 12,
  },
  payCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E3E7EA",
    paddingHorizontal: 15,
    paddingVertical: 13,
  },
  payCardActive: {
    borderColor: colors.deep,
  },
  payIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E3F0EF",
    alignItems: "center",
    justifyContent: "center",
  },
  payIconActive: {
    backgroundColor: colors.secondary,
  },
  payTexts: {
    flex: 1,
    gap: 3,
  },
  payNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  payName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deep,
  },
  payBadge: {
    backgroundColor: "#DFF9EF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  payBadgeText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: "#0B5D5A",
  },
  paySub: {
    fontSize: 12.5,
    color: colors.subtitle,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#C4CCD2",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: colors.deep,
    backgroundColor: colors.deep,
  },

  /* Bottom CTA */
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E5EA",
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 6,
  },
  totalWrap: {
    gap: 2,
  },
  totalLabelSmall: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.subtitle,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  totalValueBold: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.deep,
  },
  ctaBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  ctaText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: colors.white,
  },
});