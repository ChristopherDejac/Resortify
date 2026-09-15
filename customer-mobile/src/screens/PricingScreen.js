import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import { rates, cottages, rooms, included, exclusions } from "../data";

function RateIcon({ family, icon, iconBg, accent }) {
  if (!icon) return null;
  const shared = { size: 20, color: accent };
  return (
    <View style={[styles.iconBubble, { backgroundColor: iconBg }]}>
      {family === "mci" ? (
        <MaterialCommunityIcons {...shared} />
      ) : (
        <Ionicons {...shared} />
      )}
    </View>
  );
}

function PriceCard({ title, icon, accent, iconBg, rows, family }) {
  return (
    <View style={[styles.priceCard, { borderColor: accent }]}>
      <View style={styles.cardHeader}>
        <RateIcon family={family} icon={icon} iconBg={iconBg} accent={accent} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {rows.map((row, i) => (
        <View key={row.label}>
          {i > 0 && <View style={styles.rowDivider} />}
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>{row.label}</Text>
            <Text style={[styles.rateValue, { color: accent }]}>{row.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function SectionHeading({ title, caption }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeading}>{title}</Text>
      {caption ? <Text style={styles.updatedLabel}>{caption}</Text> : null}
    </View>
  );
}

function ListSection({ heading, icon, iconColor, items, bulletColor }) {
  return (
    <View style={styles.listSection}>
      <View style={styles.listHeadingRow}>
        <Ionicons name={icon} size={20} color={iconColor} />
        <Text style={styles.listHeading}>{heading}</Text>
      </View>
      <View style={styles.listCard}>
        {items.map((item, i) => (
          <View key={item}>
            <View style={styles.bulletRow}>
              <View style={[styles.bulletPoint, { backgroundColor: bulletColor }]} />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
            {i < items.length - 1 && <View style={styles.listDivider} />}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function PricingScreen({ navigation }) {
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
        <Text style={styles.headerTitle}>Pricing</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.divider} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Entrance Rates */}
        <SectionHeading title="Entrance Rates" caption="Updated Monthly" />
        {rates.map((rate) => (
          <PriceCard key={rate.key} {...rate} />
        ))}

        {/* Cottages & Shelters */}
        <SectionHeading title="Cottages & Shelters" />
        {cottages.map((cottage) => (
          <PriceCard key={cottage.key} title={cottage.name} {...cottage} />
        ))}

        {/* Air-Conditioned Rooms */}
        <SectionHeading title="Air-Conditioned Rooms" />
        {rooms.map((room) => (
          <PriceCard key={room.key} title={room.name} {...room} />
        ))}

        {/* Seasonal Adjustments */}
        <SectionHeading title="Seasonal Adjustments" />
        <View style={styles.seasonContainer}>
          <View style={styles.seasonRow}>
            <View style={styles.seasonIconPeak}>
              <Ionicons name="trending-up" size={16} color="#E74C3C" />
            </View>
            <Text style={styles.seasonLabel}>Peak Season</Text>
            <Text style={styles.seasonValuePos}>+15%</Text>
          </View>
          <View style={styles.seasonDivider} />
          <View style={styles.seasonRow}>
            <View style={styles.seasonIconOff}>
              <Ionicons name="trending-down" size={16} color="#22A06B" />
            </View>
            <Text style={styles.seasonLabel}>Off-Peak Season</Text>
            <Text style={styles.seasonValueNeg}>-10%</Text>
          </View>
        </View>
        <Text style={styles.seasonNote}>
          * Seasonal adjustments apply to entrance and accommodation rates
          during declared Philippine holidays and long weekends. Rates will be
          reconfirmed during booking.
        </Text>

        {/* What's Included */}
        <ListSection
          heading="What's Included"
          icon="checkmark-circle-outline"
          iconColor="#22A06B"
          items={included}
          bulletColor="#22A06B"
        />

        {/* Exclusions */}
        <ListSection
          heading="Exclusions"
          icon="close-circle-outline"
          iconColor="#E74C3C"
          items={exclusions}
          bulletColor="#E74C3C"
        />
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

  scroll: {
    padding: 18,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionHeading: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 17,
    fontWeight: "700",
    color: colors.deep,
  },
  updatedLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textMuted,
  },

  /* Price cards */
  priceCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E8ECF0",
    marginVertical: 2,
  },
  rateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
  },
  rateLabel: {
    fontSize: 13.5,
    color: "#3C4447",
  },
  rateValue: {
    fontSize: 15,
    fontWeight: "700",
  },

  /* Sections after first need extra top spacing */
  sectionSpacer: {
    marginTop: 10,
  },

  /* Seasonal container */
  seasonContainer: {
    backgroundColor: "#F1F3F5",
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  seasonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 15,
  },
  seasonIconPeak: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FDE7E7",
    alignItems: "center",
    justifyContent: "center",
  },
  seasonIconOff: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#DFF5EA",
    alignItems: "center",
    justifyContent: "center",
  },
  seasonLabel: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: "600",
    color: colors.text,
  },
  seasonValuePos: {
    fontSize: 15,
    fontWeight: "700",
    color: "#E74C3C",
  },
  seasonValueNeg: {
    fontSize: 15,
    fontWeight: "700",
    color: "#22A06B",
  },
  seasonDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#DDE2E8",
    marginHorizontal: 16,
  },
  seasonNote: {
    fontSize: 12,
    fontStyle: "italic",
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 10,
    marginBottom: 4,
  },

  /* Lists */
  listSection: {
    marginTop: 24,
  },
  listHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  listHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deep,
  },
  listCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
  },
  bulletPoint: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 13.5,
    color: "#2C3437",
  },
  listDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E8ECF0",
    marginLeft: 19,
  },
});