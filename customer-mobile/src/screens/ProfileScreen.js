import { useState, useMemo } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }) {
  const { theme, colors, toggleTheme } = useTheme();
  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [savedName, setSavedName] = useState("");
  const [savedEmail, setSavedEmail] = useState("");
  const [savedMobile, setSavedMobile] = useState("");
  const [language, setLanguage] = useState("English (US)");
  const [showLanguageList, setShowLanguageList] = useState(false);

  const languages = ["English (US)", "Filipino", "Spanish"];

  const handleEdit = () => {
    setFullName(savedName);
    setEmail(savedEmail);
    setMobile(savedMobile);
    setEditing(true);
  };

  const handleSave = () => {
    setSavedName(fullName);
    setSavedEmail(email);
    setSavedMobile(mobile);
    setEditing(false);
  };

  const handleCancel = () => {
    setFullName(savedName);
    setEmail(savedEmail);
    setMobile(savedMobile);
    setEditing(false);
  };

  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account Details</Text>
        {editing ? (
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <Text style={styles.name}>{savedName || " "}</Text>

        {/* Account Details */}
        <Text style={styles.sectionHeading}>Account Details</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <Ionicons name="person-outline" size={18} color={colors.deep} />
            </View>
            <View style={styles.infoBody}>
              <Text style={styles.infoLabel}>Full Name</Text>
              {editing ? (
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.subtitle}
                />
              ) : (
                <Text style={styles.infoValue}>{savedName || "-"}</Text>
              )}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <Ionicons name="mail-outline" size={18} color={colors.deep} />
            </View>
            <View style={styles.infoBody}>
              <Text style={styles.infoLabel}>Email</Text>
              {editing ? (
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.subtitle}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.infoValue}>{savedEmail || "-"}</Text>
              )}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrap}>
              <Ionicons name="phone-portrait-outline" size={18} color={colors.deep} />
            </View>
            <View style={styles.infoBody}>
              <Text style={styles.infoLabel}>Mobile Number</Text>
              {editing ? (
                <TextInput
                  style={styles.input}
                  value={mobile}
                  onChangeText={setMobile}
                  placeholder="Enter your mobile number"
                  placeholderTextColor={colors.subtitle}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.infoValue}>{savedMobile || "-"}</Text>
              )}
            </View>
          </View>
        </View>

        {/* App Preferences */}
        <Text style={styles.sectionHeading}>App Preferences</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.prefRow}
            onPress={() => setShowLanguageList(!showLanguageList)}
            activeOpacity={0.7}
          >
            <Text style={styles.prefLabel}>Language</Text>
            <View style={styles.prefValueRow}>
              <Text style={styles.prefValue}>{language}</Text>
              <Ionicons
                name={showLanguageList ? "chevron-down" : "chevron-forward"}
                size={14}
                color={colors.textMuted}
              />
            </View>
          </TouchableOpacity>
          {showLanguageList &&
            languages.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.langOption}
                onPress={() => {
                  setLanguage(lang);
                  setShowLanguageList(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.langText,
                    lang === language && styles.langTextActive,
                  ]}
                >
                  {lang}
                </Text>
                {lang === language && (
                  <Ionicons name="checkmark" size={16} color={colors.accent} />
                )}
              </TouchableOpacity>
            ))}
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.prefRow}
            onPress={() => toggleTheme(theme === "light" ? "dark" : "light")}
            activeOpacity={0.7}
          >
            <Text style={styles.prefLabel}>Visual Theme</Text>
            <View style={styles.prefValueRow}>
              <Text style={styles.prefValue}>{theme === "light" ? "Light" : "Dark"}</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Management */}
        <Text style={styles.sectionHeading}>Management</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
            <View style={styles.actionIconWrap}>
              <Ionicons name="mail-outline" size={18} color={colors.deep} />
            </View>
            <Text style={styles.actionLabel}>Verify Email Address</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
            <View style={styles.actionIconWrap}>
              <Ionicons name="phone-portrait-outline" size={18} color={colors.deep} />
            </View>
            <Text style={styles.actionLabel}>Verify Cellphone number</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.deleteRow} activeOpacity={0.7}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutRow}
            activeOpacity={0.7}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingHorizontal: 16,
    },
    headerTitle: {
      flex: 1,
      fontSize: 17,
      fontWeight: "600",
      color: colors.text,
    },
    headerActions: {
      flexDirection: "row",
      gap: 16,
    },
    editText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.deep,
    },
    saveText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.accent,
    },
    cancelText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.textMuted,
    },
    scroll: {
      padding: 20,
      paddingBottom: 40,
    },
    name: {
      fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
      fontSize: 24,
      fontWeight: "700",
      color: colors.deep,
      marginBottom: 20,
    },
    sectionHeading: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.subtitle,
      marginBottom: 10,
      marginTop: 6,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 24,
      overflow: "hidden",
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      gap: 12,
    },
    infoIconWrap: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    infoBody: {
      flex: 1,
    },
    infoLabel: {
      fontSize: 11,
      fontWeight: "500",
      color: colors.subtitle,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginTop: 2,
    },
    input: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginTop: 2,
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    valueRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 2,
    },
    verifiedBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
    },
    verifiedText: {
      fontSize: 11,
      fontWeight: "600",
      color: colors.accent,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: 60,
    },
    prefRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 14,
    },
    prefLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.text,
    },
    prefValue: {
      fontSize: 13,
      color: colors.subtitle,
    },
    prefValueRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    langOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 14,
      paddingLeft: 50,
    },
    langText: {
      fontSize: 14,
      color: colors.text,
    },
    langTextActive: {
      fontWeight: "600",
      color: colors.deep,
    },
    actionRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      gap: 12,
    },
    actionIconWrap: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    actionLabel: {
      flex: 1,
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    deleteRow: {
      alignItems: "center",
      padding: 14,
    },
    deleteText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.danger,
    },
    logoutRow: {
      alignItems: "center",
      backgroundColor: colors.deep,
      marginHorizontal: 14,
      marginBottom: 14,
      borderRadius: 10,
      padding: 14,
    },
    logoutText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.white,
    },
  });
}
