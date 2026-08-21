import { useState } from "react";
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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("MainTabs");
    }, 1500);
  };

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
              <Text style={styles.backArrow}>⮜</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.backArrow} />
          </View>

          <Text style={styles.subtitle}>
            Start your journey and discover relaxing resorts.
          </Text>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>👤</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textMuted}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>📧</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>🔒</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
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

          <Text style={styles.passwordHint}>
            Must be at least 8 characters and include one number.
          </Text>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>🔒</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
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

          {/* Terms */}
          <TouchableOpacity
            style={styles.agreeRow}
            onPress={() => setAgree(!agree)}
          >
            <View style={[styles.checkbox, agree && styles.checkboxActive]}>
              {agree && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.agreeText}>
              I agree to the{" "}
              <Text style={styles.agreeLink}>Terms & Conditions</Text> and{" "}
              <Text style={styles.agreeLink}>Privacy Policy</Text>.
            </Text>
          </TouchableOpacity>

          {/* Create Account button */}
          <TouchableOpacity
            style={[styles.signInBtn, loading && styles.btnLoading]}
            activeOpacity={0.85}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.signInText}>
              {loading ? "Creating Account..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
              <Text style={styles.socialIcon}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: colors.facebook }]}
              activeOpacity={0.8}
            >
              <Text style={[styles.socialIcon, { color: colors.white }]}>f</Text>
            </TouchableOpacity>
          </View>

          {/* Sign in */}
          <TouchableOpacity
            style={styles.signupRow}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.signupText}>
              Already have an account?{" "}
              <Text style={styles.signupLink}>Sign In</Text>
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
  passwordHint: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
    marginTop: -10,
  },
  agreeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },
  agreeText: {
    flex: 1,
    fontSize: 12,
    color: colors.subtitle,
    lineHeight: 18,
  },
  agreeLink: {
    fontWeight: "700",
    color: colors.accent,
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
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  socialRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  socialBtn: {
    flex: 1,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.googleBg,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
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
