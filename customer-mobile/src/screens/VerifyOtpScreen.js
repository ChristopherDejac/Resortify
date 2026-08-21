import { useState, useRef, useEffect, useCallback } from "react";
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
import { colors } from "../constants/theme";

const OTP_LENGTH = 4;
const RESEND_COOLDOWN = 30;

const generateCode = () => String(Math.floor(1000 + Math.random() * 9000));

export default function VerifyOtpScreen({ navigation, route }) {
  const email = route?.params?.email || "";
  const maskedEmail = email.replace(/(?<=.)[^@](?=[^@]*?@)/g, "•");

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [demoCode, setDemoCode] = useState(() => generateCode());
  const inputsRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    startCooldown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCooldown = () => {
    setCooldown(RESEND_COOLDOWN);
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

  const handleChange = useCallback((text, index) => {
    setError("");
    const digit = text.replace(/[^0-9]/g, "");
    if (digit.length > 1) {
      const digits = digit.split("").slice(0, OTP_LENGTH);
      const newOtp = [...Array(OTP_LENGTH).fill("")];
      digits.forEach((d, i) => {
        if (i < OTP_LENGTH) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(digits.length, OTP_LENGTH - 1);
      inputsRef.current[nextIndex]?.focus();
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }, [otp]);

  const handleKeyPress = useCallback((key, index) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }, [otp]);

  const handleResend = () => {
    if (cooldown > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    setDemoCode(generateCode());
    inputsRef.current[0]?.focus();
    startCooldown();
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== OTP_LENGTH) {
      setError("Please enter the complete verification code.");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      if (code === demoCode) {
        setVerified(true);
      } else {
        setError("Invalid verification code. Please try again.");
        setOtp(Array(OTP_LENGTH).fill(""));
        inputsRef.current[0]?.focus();
      }
    }, 1500);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  if (verified) {
    return (
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=800" }}
        style={styles.bg}
      >
        <View style={styles.overlay} />
        <View style={styles.center}>
          <View style={styles.card}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.title}>Verified!</Text>
            <Text style={styles.subtitle}>
              Your account has been successfully verified.
            </Text>
            <TouchableOpacity
              style={styles.verifyBtn}
              activeOpacity={0.85}
              onPress={() => navigation.replace("MainTabs")}
            >
              <Text style={styles.verifyText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.footer}>© 2026 HANAPIN RESORTS</Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=800" }}
      style={styles.bg}
    >
      <View style={styles.overlay} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand */}
        <Text style={styles.brand}>HanaPin</Text>

        {/* Card */}
        <View style={styles.card}>
          <View>
            <Text style={styles.title}>Verify Your Account</Text>
            <Text style={styles.subtitle}>
              Enter the 4-digit code sent to your{"\n"}
              {email ? maskedEmail : "email address"}
            </Text>
          </View>

          {/* OTP inputs */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputsRef.current[index] = ref)}
                style={[
                  styles.otpBox,
                  focusedIndex === index ? styles.otpBoxFocused : null,
                ]}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleKeyPress(nativeEvent.key, index)
                }
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(-1)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Demo hint */}
          <View style={styles.demoHint}>
            <Text style={styles.demoHintText}>
              Demo mode — code sent to your email:{" "}
              <Text style={styles.demoCode}>{demoCode}</Text>
            </Text>
          </View>

          {/* Verify button */}
          <TouchableOpacity
            style={[styles.verifyBtn, loading && styles.btnLoading]}
            activeOpacity={0.85}
            onPress={handleVerify}
            disabled={loading}
          >
            <Text style={styles.verifyText}>
              {loading ? "Verifying..." : "Verify & Proceed"}
            </Text>
          </TouchableOpacity>

          {/* Resend */}
          {cooldown > 0 ? (
            <Text style={styles.cooldownText}>
              Resend code in {formatTime(cooldown)}
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend Code</Text>
            </TouchableOpacity>
          )}

          {/* Back to sign in */}
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.backLink}>← Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <Text style={styles.footer}>© 2026 HANAPIN RESORTS</Text>
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
    backgroundColor: "rgba(0, 25, 25, 0.45)",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  brand: {
    position: "absolute",
    top: 55,
    alignSelf: "center",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 21,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 1.2,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  card: {
    width: 285,
    height: 345,
    backgroundColor: colors.background,
    borderRadius: 17,
    paddingHorizontal: 24,
    paddingVertical: 26,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: colors.subtitle,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  otpBox: {
    width: 45,
    height: 45,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  otpBoxFocused: {
    borderWidth: 2,
    borderColor: colors.focus,
    backgroundColor: "#F5F9FF",
    elevation: 3,
    shadowColor: colors.focus,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    textAlign: "center",
    lineHeight: 16,
  },
  demoHint: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    maxWidth: 247,
    width: "100%",
    alignItems: "center",
  },
  demoHintText: {
    fontSize: 11,
    color: colors.primary,
    textAlign: "center",
    lineHeight: 15,
  },
  demoCode: {
    fontWeight: "800",
    letterSpacing: 2,
  },
  verifyBtn: {
    width: 247,
    height: 39,
    backgroundColor: colors.primary,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLoading: {
    opacity: 0.85,
  },
  verifyText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
  cooldownText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: "500",
  },
  resendLink: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.subtitle,
  },
  backLink: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.primary,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1.6,
    color: "rgba(255,255,255,0.8)",
    textTransform: "uppercase",
  },
  successIcon: {
    fontSize: 46,
    textAlign: "center",
    color: colors.accent,
  },
});
