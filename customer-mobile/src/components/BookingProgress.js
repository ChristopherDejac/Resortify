import { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

const steps = ["Guest Info", "Payment", "Confirm"];

export default function BookingProgress({ current = 0 }) {
  return (
    <View style={styles.row}>
      {steps.map((label, i) => (
        <Fragment key={label}>
          {i > 0 && (
            <View style={[styles.line, i <= current && styles.lineActive]} />
          )}
          <View style={styles.step}>
            <View style={[styles.circle, i <= current && styles.circleActive]}>
              {i < current ? (
                <Ionicons name="checkmark" size={13} color={colors.white} />
              ) : (
                <Text style={[styles.num, i <= current && styles.numActive]}>
                  {i + 1}
                </Text>
              )}
            </View>
            <Text style={[styles.label, i <= current && styles.labelActive]}>
              {label}
            </Text>
          </View>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 36,
    paddingTop: 14,
    paddingBottom: 16,
  },
  step: {
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#D5DBE0",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  circleActive: {
    borderColor: colors.deep,
    backgroundColor: colors.deep,
  },
  num: {
    fontSize: 13,
    fontWeight: "700",
    color: "#A3ADB5",
  },
  numActive: {
    color: colors.white,
  },
  label: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "600",
    color: "#A3ADB5",
    letterSpacing: 0.2,
  },
  labelActive: {
    color: colors.deep,
    fontWeight: "700",
  },
  line: {
    flex: 1,
height: 2,
      backgroundColor: "#DDE2E6",
      marginTop: 14,
      marginBottom: 24,
    },
    lineActive: {
    backgroundColor: colors.deep,
  },
});