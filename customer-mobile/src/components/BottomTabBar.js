import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

const items = [
  { key: "Home", label: "Home", icon: "home", iconOutline: "home-outline" },
  { key: "Bookings", label: "Bookings", icon: "calendar", iconOutline: "calendar-outline" },
  { key: "Profile", label: "Profile", icon: "person", iconOutline: "person-outline" },
];

export default function BottomTabBar({ active, onSelect }) {
  return (
    <View style={styles.bar}>
      {items.map((item) => {
        const focused = active === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.item, focused && styles.itemActive]}
            activeOpacity={0.7}
            onPress={() => onSelect(item.key)}
          >
            <Ionicons
              name={focused ? item.icon : item.iconOutline}
              size={20}
              color={focused ? colors.deep : colors.textMuted}
            />
            <Text style={[styles.label, focused && styles.labelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: "#EEEFF1",
    height: 78,
    paddingTop: 8,
    paddingBottom: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    width: 68,
    height: 42,
    borderRadius: 24,
    gap: 2,
  },
  itemActive: {
    backgroundColor: colors.secondary,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.deep,
    fontWeight: "700",
  },
});