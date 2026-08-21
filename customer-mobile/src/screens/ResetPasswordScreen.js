import { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
  ScrollView,
} from "react-native";
import { colors, spacing, radii } from "../constants/theme";

function getPasswordStrength(pw) {
  if (!pw) return { label: "", score: 0, color: colors.border };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colorsMap = ["", colors.danger, "#E67E22", "#F4B836", colors.accent, colors.primary];
  return { label: labels[score], score, color: colorsMap[score] || colors.border };
}

const requirements = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "Include one uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Include one number", test: (pw) => /[0-9]/.test(pw) },
];

export default function ResetPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const allMet = requirements.every((r) => r.test(password));
  const match = confirmPassword.length > 0 ? password === confirmPassword : null;

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800" }}
        style={styles.bg}
      >
        <View style={styles.overlay} />
        <View style={styles.successContainer}>
          <View style={styles.card}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Password Updated</Text>
            <Text style={styles.successSubtitle}>
              Your password has been changed successfully.
            </Text>
            <TouchableOpacity
              style={styles.signInBtn}
              activeOpacity={0.85}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={styles.signInText}>Continue to Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800" }}
      style={styles.bg}
    >
      <View style={styles.overlay} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand */}
        <View style={styles.brand}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>🌿</Text>
          </View>
          <Text style={styles.logoText}>HanaPin</Text>
          <Text style={styles.tagline}>Naturally Refined</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Back + Title */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Reset Password</Text>
            <View style={styles.backArrow} />
          </View>

          <Text style={styles.subtitle}>
            Choose a new password to keep your HanaPin account secure.
          </Text>

          {/* Password */}
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>🔒</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="New password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>{showPassword ? "🙈" : "👁"}</Text>
            </TouchableOpacity>
          </View>

          {/* Requirements */}
          {password.length > 0 && (
            <View style={styles.reqContainer}>
              {requirements.map((req, i) => (
                <Text key={i} style={styles.reqRow}>
                  <Text style={{ color: req.test(password) ? colors.accent : colors.textMuted }}>
                    {req.test(password) ? "✓" : "○"}
                  </Text>
                  <Text
                    style={[
                      styles.reqText,
                      { color: req.test(password) ? colors.accent : colors.textMuted },
                    ]}
                  >
                    {" "}{req.label}
                  </Text>
                </Text>
              ))}
            </View>
          )}

          {/* Strength */}
          {password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBar}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.strengthSegment,
                      { backgroundColor: i <= strength.score ? strength.color : colors.border },
                    ]}
                  />
                ))}
              </View>
              <Text style={[styles.strengthLabel, { color: strength.color }]}>
                {strength.label}
                {strength.score >= 4 && " ✓"}
              </Text>
            </View>
          )}

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>🔒</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Confirm new password"
              placeholderTextColor={colors.textMuted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowConfirm(!showConfirm)}
            >
              <Text>{showConfirm ? "🙈" : "👁"}</Text>
            </TouchableOpacity>
          </View>

          {/* Match indicator */}
          {confirmPassword.length > 0 && (
            <Text
              style={[
                styles.matchText,
                { color: match ? colors.accent : colors.danger },
              ]}
            >
              {match ? "✓ Passwords match" : "✗ Passwords do not match"}
            </Text>
          )}

          {/* Update button */}
          <TouchableOpacity
            style={[styles.signInBtn, loading && styles.btnLoading]}
            activeOpacity={0.85}
            onPress={handleUpdate}
            disabled={loading}
          >
            <Text style={styles.signInText}>
              {loading ? "Updating..." : "Update Password"}
            </Text>
          </TouchableOpacity>

          {/* Security note */}
          <Text style={styles.securityNote}>
            Your new password will take effect immediately after updating.
          </Text>

          {/* Back to login */}
          <TouchableOpacity
            style={styles.signupRow}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.signupText}>
              <Text style={styles.signupLink}>Back to Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2026 HanaPin Resorts {"\n"}Naturally Refined
        </Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  brand: {
    alignItems: "center",
    marginBottom: spacing.xl,
    gap: 6,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoIcon: { fontSize: 28 },
  logoText: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 32,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 1,
  },
  tagline: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 14,
    fontStyle: "italic",
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 1.5,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.md,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backArrow: {
    fontSize: 22,
    color: colors.text,
    width: 30,
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.subtitle,
    lineHeight: 20,
    marginTop: -8,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  inputIcon: {
    paddingHorizontal: spacing.md,
    height: 52,
    justifyContent: "center",
  },
  inputIconText: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 15,
    color: colors.text,
    paddingRight: spacing.md,
  },
  eyeBtn: {
    paddingHorizontal: spacing.md,
    height: 52,
    justifyContent: "center",
  },
  reqContainer: {
    gap: 4,
  },
  reqRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reqText: {
    fontSize: 12,
    lineHeight: 18,
  },
  strengthContainer: {
    gap: 6,
  },
  strengthBar: {
    flexDirection: "row",
    gap: 4,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  matchText: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  signInBtn: {
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLoading: {
    opacity: 0.85,
  },
  signInText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  securityNote: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 16,
  },
  signupRow: {
    alignItems: "center",
    paddingTop: spacing.xs,
  },
  signupText: {
    fontSize: 13,
    color: colors.subtitle,
  },
  signupLink: {
    fontWeight: "700",
    color: colors.accent,
  },
  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
    marginTop: spacing.lg,
    lineHeight: 18,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  successIcon: {
    fontSize: 48,
    textAlign: "center",
  },
  successTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 14,
    color: colors.subtitle,
    textAlign: "center",
    lineHeight: 20,
  },
});
