import { View, Text, StyleSheet, Platform } from "react-native";
import { colors, spacing } from "../constants/theme";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
      </View>
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>❤️</Text>
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySub}>Save resorts you love here.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md },
  title: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 26, fontWeight: "700", color: colors.text,
  },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.sm },
  emptyIcon: { fontSize: 64 },
  emptyText: { fontSize: 18, fontWeight: "600", color: colors.text },
  emptySub: { fontSize: 14, color: colors.subtitle },
});
