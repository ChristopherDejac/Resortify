import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

const iconColorMap = {
  mint: { bg: colors.secondary, icon: colors.deep },
  blue: { bg: "#D6EEF8", icon: "#1A7A8A" },
  gray: { bg: "#ECEEF0", icon: colors.subtitle },
};

const notifications = [
  {
    group: "Today",
    items: [],
  },
  {
    group: "Yesterday",
    items: [],
  },
  {
    group: "Last Week",
    items: [],
  },
];

function NotificationCard({ item }) {
  const palette = iconColorMap[item.iconColor] || iconColorMap.gray;
  return (
    <View style={styles.card}>
      <View style={[styles.cardIcon, { backgroundColor: palette.bg }]}>
        <Ionicons name={item.icon} size={18} color={palette.icon} />
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardTime}>{item.time}</Text>
        </View>
        <Text style={styles.cardMessage} numberOfLines={2}>
          {item.message}
        </Text>
        {item.unread && <View style={styles.unreadDot} />}
      </View>
    </View>
  );
}

export default function NotificationsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Notification</Text>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.deep} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {notifications.map((group) => (
          <View key={group.group} style={styles.groupSection}>
            <Text style={styles.groupHeading}>{group.group}</Text>
            {group.items.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No notifications</Text>
              </View>
            ) : (
              group.items.map((item, idx) => (
                <NotificationCard key={idx} item={item} />
              ))
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F8FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  headerLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEFF1",
  },
  backBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  groupSection: {
    marginBottom: 24,
  },
  groupHeading: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 18,
    fontWeight: "600",
    color: colors.deep,
    marginBottom: 14,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 9,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  cardIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
    marginLeft: 10,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  cardTime: {
    fontSize: 9,
    color: colors.textMuted,
  },
  cardMessage: {
    fontSize: 12,
    color: "#30383B",
    lineHeight: 17,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.accent,
    marginTop: 6,
  },
  emptyCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    borderRadius: 9,
    padding: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
