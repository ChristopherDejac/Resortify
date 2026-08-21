import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

const categories = [
  { label: "Resorts", family: "ion", icon: "location-outline", active: "location" },
  { label: "Nature", family: "mci", icon: "tree-outline", active: "tree" },
  { label: "Pools", family: "ion", icon: "water-outline", active: "water" },
  { label: "Events", family: "ion", icon: "calendar-outline", active: "calendar" },
];

function CategoryIcon({ family, name, size, color }) {
  if (family === "mci") {
    return (
      <MaterialCommunityIcons name={name} size={size} color={color} />
    );
  }
  return <Ionicons name={name} size={size} color={color} />;
}

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Top navigation */}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where would you like to escape?"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* Quick categories */}
        <View style={styles.categoriesRow}>
          {categories.map((cat, i) => {
            const active = activeCategory === i;
            return (
              <TouchableOpacity
                key={cat.label}
                style={styles.category}
                activeOpacity={0.7}
                onPress={() => setActiveCategory(i)}
              >
                <View style={[styles.categoryIcon, active && styles.categoryIconActive]}>
                  <CategoryIcon
                    family={cat.family}
                    name={active ? cat.active : cat.icon}
                    size={22}
                    color={active ? colors.white : colors.deep}
                  />
                </View>
                <Text style={[styles.categoryLabel, active && styles.categoryLabelActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>



        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEFF1",
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
  scroll: {
    paddingBottom: 96,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 14,
    marginTop: 16,
    height: 46,
    borderRadius: 25,
    backgroundColor: "#F1F1F4",
    paddingHorizontal: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginTop: 22,
  },
  category: {
    alignItems: "center",
    gap: 6,
  },
  categoryIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  categoryIconActive: {
    backgroundColor: colors.deep,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.subtitle,
  },
  categoryLabelActive: {
    color: colors.deep,
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginTop: 26,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 20,
    fontWeight: "400",
    color: colors.deep,
  },
  viewAll: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.deep,
  },
});
