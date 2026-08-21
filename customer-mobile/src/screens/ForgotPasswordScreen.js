import { useState, useRef, useEffect } from "react";
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

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCooldown = () => {
    setCooldown(30);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      startCooldown();
    }, 1500);
  };

  const handleResend = () => {
    if (cooldown > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      startCooldown();
    }, 1500);
  };

  if (sent) {
    return (
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800" }}
        style={styles.bg}
      >
        <View style={styles.overlay} />
        <View style={styles.successContainer}>
          <View style={styles.card}>
            <Text style={styles.successIcon}>📧</Text>
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successSubtitle}>
              We've sent a password reset link to
            </Text>
            <Text style={styles.successEmail}>{email}</Text>
            <Text style={styles.successHint}>
              Please check your inbox and follow the instructions.
            </Text>

            <TouchableOpacity
              style={[styles.signInBtn, cooldown > 0 && styles.btnDisabled]}
              activeOpacity={0.85}
              onPress={handleResend}
              disabled={cooldown > 0}
            >
              <Text style={styles.signInText}>
                {cooldown > 0
                  ? `Resend Email (${cooldown}s)`
                  : "Resend Email"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInBtn}
              activeOpacity={0.85}
              onPress={() => navigation.replace("ResetPassword")}
            >
              <Text style={styles.signInText}>Continue to Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupRow}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={styles.signupText}>
                <Text style={styles.signupLink}>Back to Sign In</Text>
              </Text>
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
            <Text style={styles.title}>Forgot Password</Text>
            <View style={styles.backArrow} />
          </View>

          <Text style={styles.subtitle}>
            Enter the email associated with your account, and we'll send you a
            secure link to reset your password.
          </Text>

          {/* Email */}
          <View style={styles.inputGroup}>
            <View style={styles.inputIcon}>
              <Text style={styles.inputIconText}>📧</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Send button */}
          <TouchableOpacity
            style={[styles.signInBtn, loading && styles.btnLoading]}
            activeOpacity={0.85}
            onPress={handleSend}
            disabled={loading}
          >
            <Text style={styles.signInText}>
              {loading ? "Sending..." : "Send Reset Link →"}
            </Text>
          </TouchableOpacity>

          {/* Back to login */}
          <TouchableOpacity
            style={styles.signupRow}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.signupText}>
              Remember your password?{" "}
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
  btnDisabled: {
    opacity: 0.6,
  },
  signInText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
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
  successEmail: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
  successHint: {
    fontSize: 13,
    color: colors.subtitle,
    textAlign: "center",
    lineHeight: 18,
  },
});
