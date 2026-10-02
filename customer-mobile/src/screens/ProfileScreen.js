import { useState, useMemo } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import AIChatButton from "../components/AIChatButton";
import { user, languages, themeOptions as THEMES, appVersion } from "../data";

export default function ProfileScreen({ navigation }) {
  const { theme, colors, toggleTheme } = useTheme();

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [saved, setSaved] = useState({ ...draft });
  const [language, setLanguage] = useState(languages[0]);
  const [showLanguageList, setShowLanguageList] = useState(false);
  const [selTheme, setSelTheme] = useState("Light");

  const startEdit = () => {
    setDraft(saved);
    setEditing(true);
  };

  const saveEdit = () => {
    setSaved(draft);
    setEditing(false);
  };

  const setField = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Profile header */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.initials}</Text>
          </View>
          <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.85}>
            <Ionicons name="camera" size={13} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{saved.name}</Text>

        {/* Account Details */}
        <View style={styles.sectionHeadRow}>
          <Text style={styles.sectionHeading}>Account Details</Text>
          {editing ? (
            <View style={styles.editActions}>
              <TouchableOpacity onPress={() => setEditing(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveEdit}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={startEdit} activeOpacity={0.7}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

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
                  value={draft.name}
                  onChangeText={(v) => setField("name", v)}
                  placeholder="Enter your full name"
                  placeholderTextColor={colors.subtitle}
                />
              ) : (
                <Text style={styles.infoValue}>{saved.name}</Text>
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
                  value={draft.email}
                  onChangeText={(v) => setField("email", v)}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.subtitle}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <View style={styles.valueRow}>
                  <Text style={styles.infoValue}>{saved.email}</Text>
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={13} color="#22A06B" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>
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
                  value={draft.mobile}
                  onChangeText={(v) => setField("mobile", v)}
                  placeholder="Enter your mobile number"
                  placeholderTextColor={colors.subtitle}
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.infoValue}>{saved.mobile}</Text>
              )}
            </View>
          </View>
        </View>

        {/* App Preferences */}
        <Text style={styles.sectionHeading}>App Preferences</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.prefRow}
            activeOpacity={0.7}
            onPress={() => setShowLanguageList((s) => !s)}
          >
            <View style={styles.prefIconWrap}>
              <Ionicons name="globe-outline" size={18} color={colors.deep} />
            </View>
            <Text style={styles.prefLabel}>Language</Text>
            <Text style={styles.prefValue}>{language}</Text>
            <Ionicons
              name={showLanguageList ? "chevron-up" : "chevron-forward"}
              size={15}
              color={colors.textMuted}
            />
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

          <View style={styles.prefRow}>
            <View style={styles.prefIconWrap}>
              <Ionicons name="color-palette-outline" size={18} color={colors.deep} />
            </View>
            <Text style={styles.prefLabel}>Visual Theme</Text>
            <View style={styles.themeSegmented}>
              {THEMES.map((t) => {
                const active = selTheme === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[styles.segBtn, active && styles.segBtnActive]}
                    activeOpacity={0.85}
                    onPress={() => {
                      setSelTheme(t);
                      if (t !== "System") {
                        toggleTheme(t === "dark" ? "dark" : "light");
                      }
                    }}
                  >
                    <Text style={[styles.segText, active && styles.segTextActive]}>
                      {t}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
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
        </View>

        <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.85}>
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.88}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footer} activeOpacity={0.7}>
          <Text style={styles.footerText}>
            {appVersion} · Privacy Policy
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      <AIChatButton navigation={navigation} />
    </SafeAreaView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scroll: {
      padding: 20,
      paddingBottom: 20,
    },

    /* Profile header */
    avatarWrap: {
      alignSelf: "center",
      marginTop: 16,
      marginBottom: 12,
    },
    avatar: {
      width: 88,
      height: 88,
      borderRadius: 44,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: {
      fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
      fontSize: 30,
      fontWeight: "700",
      color: colors.deep,
    },
    cameraBadge: {
      position: "absolute",
      right: -2,
      bottom: -2,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.deep,
      borderWidth: 2.5,
      borderColor: colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
      fontSize: 21,
      fontWeight: "700",
      color: colors.deep,
      textAlign: "center",
      marginBottom: 26,
    },

    /* Section headings */
    sectionHeadRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    sectionHeading: {
      fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
      fontSize: 17,
      fontWeight: "700",
      color: colors.deep,
      marginBottom: 10,
      marginTop: 6,
    },
    editActions: {
      flexDirection: "row",
      gap: 16,
    },
    editProfileText: {
      fontSize: 13.5,
      fontWeight: "700",
      color: colors.accent,
    },
    saveText: {
      fontSize: 13.5,
      fontWeight: "700",
      color: colors.accent,
    },
    cancelText: {
      fontSize: 13.5,
      fontWeight: "600",
      color: colors.textMuted,
    },

    /* Cards */
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 22,
      overflow: "hidden",
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: 60,
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
      gap: 8,
      marginTop: 2,
    },
    verifiedBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 3,
      backgroundColor: "#DFF9EF",
      borderRadius: 10,
      paddingHorizontal: 7,
      paddingVertical: 2,
    },
    verifiedText: {
      fontSize: 10,
      fontWeight: "700",
      color: "#0B5D5A",
    },

    /* Preferences */
    prefRow: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      gap: 12,
    },
    prefIconWrap: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: colors.secondary,
      alignItems: "center",
      justifyContent: "center",
    },
    prefLabel: {
      flex: 1,
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },
    prefValue: {
      fontSize: 12.5,
      color: colors.subtitle,
    },
    langOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 14,
      paddingLeft: 60,
    },
    langText: {
      fontSize: 14,
      color: colors.text,
    },
    langTextActive: {
      fontWeight: "600",
      color: colors.deep,
    },
    themeSegmented: {
      flexDirection: "row",
      backgroundColor: "#EEF1F3",
      borderRadius: 10,
      padding: 3,
      gap: 3,
    },
    segBtn: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
    },
    segBtnActive: {
      backgroundColor: colors.card,
      borderWidth: 1.5,
      borderColor: colors.deep,
    },
    segText: {
      fontSize: 11.5,
      fontWeight: "600",
      color: "#8A959C",
    },
    segTextActive: {
      color: colors.deep,
      fontWeight: "700",
    },

    /* Management */
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

    /* Delete / logout */
    deleteBtn: {
      alignItems: "center",
      backgroundColor: "#FDECEC",
      borderRadius: 12,
      paddingVertical: 15,
      marginBottom: 12,
    },
    deleteText: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.danger,
    },
    logoutBtn: {
      alignItems: "center",
      backgroundColor: colors.deep,
      borderRadius: 12,
      paddingVertical: 15,
      marginBottom: 16,
    },
    logoutText: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.white,
    },
    footer: {
      alignItems: "center",
    },
    footerText: {
      fontSize: 12,
      color: colors.textMuted,
    },
  });
}