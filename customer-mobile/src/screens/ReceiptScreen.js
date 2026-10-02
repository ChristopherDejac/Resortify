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
import { getBookingById, peso } from "../data";

const BARCODE_BARS = [2, 1, 4, 1, 1, 3, 2, 1, 5, 1, 2, 3, 1, 4, 2, 1, 3, 1];

export default function ReceiptScreen({ navigation, route }) {
  const booking = getBookingById(route.params?.bookingId);
  const methodLabel =
    booking.payment.method === "GCash"
      ? "GCash Reference"
      : booking.payment.method === "Maya"
      ? "Maya Reference"
      : "Card Reference";

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
        <Text style={styles.headerTitle}>Receipt</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Ionicons name="download-outline" size={19} color={colors.deep} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
            <Ionicons name="share-outline" size={18} color={colors.deep} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Status row */}
        <View style={styles.statusRow}>
          <View style={styles.verifyIcon}>
            <Ionicons name="shield-checkmark" size={16} color="#22A06B" />
          </View>
          <Text style={styles.statusTitle}>Official Booking Receipt</Text>
        </View>

        {/* Receipt card */}
        <View style={styles.receiptCard}>
          {/* Brand */}
          <Text style={styles.brand}>HanaPin</Text>

          <View style={styles.paidPill}>
            <Ionicons name="checkmark-circle" size={13} color="#0B5D5A" />
            <Text style={styles.paidText}>Payment Completed · Paid in Full.</Text>
          </View>

          <Text style={styles.totalValue}>{peso(booking.amount)}.00</Text>
          <Text style={styles.totalLabel}>TOTAL AMOUNT PAID</Text>

          {/* Metadata */}
          <View style={styles.metaSection}>
            <MetaRow label="Transaction ID" value={booking.receipt.transactionId} />
            <MetaRow label="Booking Reference" value={booking.bookingRef} />
            <MetaRow label="Payment Date & Time" value={booking.receipt.paidAt} />
            <MetaRow label="Payment Method" value={booking.receipt.methodLabel} />
            <MetaRow label={methodLabel} value={booking.receipt.account} />
          </View>

          <View style={styles.cardDivider} />

          {/* Booking details */}
          <Text style={styles.sectionLabel}>Booking Details</Text>
          <View style={styles.propertyRow}>
            <LinearGradient
              colors={booking.gradient}
              style={styles.propertyThumb}
            >
              <Text style={styles.propertyEmoji}>{booking.emoji}</Text>
            </LinearGradient>
            <View style={styles.propertyBody}>
              <Text style={styles.propertyName}>{booking.resort}</Text>
              <Text style={styles.propertyMeta}>{booking.address}</Text>
              <Text style={styles.propertyMeta}>
                {booking.dates} · {booking.guests}
              </Text>
            </View>
          </View>

          {booking.receipt.items.map((c, i) => (
            <View key={c.label}>
              {i > 0 && <View style={styles.fineDivider} />}
              <View style={styles.chargeRow}>
                <Text style={styles.chargeLabel}>{c.label}</Text>
                <Text style={styles.chargeValue}>{c.value}</Text>
              </View>
            </View>
          ))}

          <View style={styles.cardDivider} />

          {/* Guest record */}
          <Text style={styles.sectionLabel}>Guest Information</Text>
          <View style={styles.grayBlock}>
            <MetaRow label="Name" value="Juan Dela Cruz" muted />
            <MetaRow label="Email" value="juan.dc@example.com" muted />
            <MetaRow label="Phone" value="+63 900 000 0000" muted />
          </View>

          {/* Merchant record */}
          <Text style={[styles.sectionLabel, styles.merchantLabel]}>
            Merchant Information
          </Text>
          <View style={styles.grayBlock}>
            <MetaRow label="Merchant" value="HanaPin Resorts" muted />
            <MetaRow
              label="Business"
              value="HanaPin Leisure & Hospitality Inc."
              muted
            />
            <MetaRow
              label="Address"
              value="Guitnang Bayan, San Mateo, Rizal"
              muted
            />
            <MetaRow label="TIN" value="000-000-000-000" muted />
          </View>

          {/* Acknowledgment */}
          <Text style={styles.ackText}>
            This serves as your official receipt for the reservation and
            payment. Keep a copy for your records.
          </Text>
          <View style={styles.barcodeWrap}>
            <View style={styles.barcode}>
              {BARCODE_BARS.map((w, i) => (
                <View key={i} style={[styles.barcodeBar, { width: w }]} />
              ))}
            </View>
          </View>
          <Text style={styles.barcodeText}>
              * {booking.bookingRef.replace("#", "")} * {String(booking.amount).padStart(5, "0")} * {booking.receipt.transactionId} *
            </Text>
        </View>
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.88}>
          <Ionicons name="document-text-outline" size={16} color={colors.white} />
          <Text style={styles.downloadText}>Download Official PDF Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emailBtn} activeOpacity={0.88}>
          <Ionicons name="mail-outline" size={17} color={colors.subtitle} />
          <Text style={styles.emailText}>Send to Email</Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>
          A copy is automatically emailed to juan.dc@example.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

function MetaRow({ label, value, muted }) {
  return (
    <View style={styles.metaRow}>
      <Text style={[styles.metaLabel, muted && styles.metaLabelMuted]}>{label}</Text>
      <Text style={[styles.metaValue, muted && styles.metaValueMuted]}>{value}</Text>
    </View>
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
    backgroundColor: colors.white,
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
    paddingBottom: 10,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 14,
    marginTop: 4,
  },
  verifyIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#DFF9EF",
    alignItems: "center",
    justifyContent: "center",
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deep,
  },

  /* Receipt card */
  receiptCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingHorizontal: 18,
    paddingVertical: 22,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  brand: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 26,
    fontWeight: "700",
    color: colors.deep,
    textAlign: "center",
    marginBottom: 12,
  },
  paidPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 6,
    backgroundColor: "#DFF9EF",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 14,
  },
  paidText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0B5D5A",
  },
  totalValue: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "800",
    color: colors.deep,
  },
  totalLabel: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "700",
    color: colors.subtitle,
    letterSpacing: 0.8,
    marginTop: 4,
    marginBottom: 18,
  },

  metaSection: {
    gap: 0,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    gap: 12,
  },
  metaLabel: {
    fontSize: 12.5,
    color: colors.subtitle,
  },
  metaLabelMuted: {
    color: colors.textMuted,
  },
  metaValue: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.text,
    textAlign: "right",
  },
  metaValueMuted: {
    fontWeight: "600",
    color: "#3E4B52",
  },

  cardDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E8ECF0",
    marginVertical: 16,
  },
  fineDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#F0F2F4",
    marginVertical: 2,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  merchantLabel: {
    marginTop: 18,
  },

  propertyRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  propertyThumb: {
    width: 52,
    height: 52,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  propertyEmoji: {
    fontSize: 24,
  },
  propertyBody: {
    flex: 1,
    gap: 2,
    justifyContent: "center",
  },
  propertyName: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 15,
    fontWeight: "700",
    color: colors.deep,
  },
  propertyMeta: {
    fontSize: 11.5,
    color: colors.subtitle,
  },

  chargeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 9,
  },
  chargeLabel: {
    flex: 1,
    fontSize: 12.5,
    color: colors.text,
  },
  chargeValue: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.text,
  },

  grayBlock: {
    backgroundColor: "#F4F6F7",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 6,
    paddingTop: 10,
  },

  ackText: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textMuted,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  barcodeWrap: {
    alignItems: "center",
    marginTop: 14,
  },
  barcode: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: 34,
  },
  barcodeBar: {
    backgroundColor: "#1B2A2E",
    height: "100%",
  },
  barcodeText: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: colors.subtitle,
    marginTop: 7,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    textAlign: "center",
  },

  /* Bottom */
  bottomBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E5EA",
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 6,
  },
  downloadBtn: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.deep,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  downloadText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },
  emailBtn: {
    height: 46,
    borderRadius: 23,
    backgroundColor: "#ECEEF0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 10,
  },
  emailText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.subtitle,
  },
  footerNote: {
    fontSize: 10.5,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: 8,
  },
});