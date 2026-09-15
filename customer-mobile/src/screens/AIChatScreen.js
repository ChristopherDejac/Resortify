import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import { chatQuickActions as quickActions, chatGreeting, getChatReply } from "../data";

const nowTime = () =>
  new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

function AssistantMessage({ message }) {
  return (
    <View style={styles.assistantRow}>
      <View style={styles.avatar}>
        <Ionicons name="sparkles" size={14} color={colors.deep} />
      </View>
      <View style={styles.assistantSide}>
        <View style={styles.assistantBubble}>
          <Text style={styles.bubbleText}>{message.text}</Text>
        </View>
        <Text style={[styles.time, styles.timeLeft]}>{message.time}</Text>
      </View>
    </View>
  );
}

function UserMessage({ message }) {
  return (
    <View style={styles.userRow}>
      <View style={styles.userSide}>
        <View style={styles.userBubble}>
          <Text style={styles.userText}>{message.text}</Text>
        </View>
        <Text style={[styles.time, styles.timeRight]}>{message.time}</Text>
      </View>
    </View>
  );
}

export default function AIChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      text: chatGreeting,
      time: nowTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const idRef = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const appendMessage = (role, text) => {
    setMessages((prev) => [
      ...prev,
      { id: idRef.current++, role, text, time: nowTime() },
    ]);
  };

  const replyTo = (text) => {
    setTimeout(() => appendMessage("assistant", getChatReply(text)), 900);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    appendMessage("user", text);
    replyTo(text);
  };

  const handleQuickAction = (action) => {
    appendMessage("user", action);
    replyTo(action);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.deep} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Chat Support</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.divider} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Chat area */}
        <ScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.chatContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.dateChip}>
            <Text style={styles.dateChipText}>TODAY</Text>
          </View>

          {messages.map((m) =>
            m.role === "assistant" ? (
              <AssistantMessage key={m.id} message={m} />
            ) : (
              <UserMessage key={m.id} message={m} />
            )
          )}

          {messages.length <= 1 && (
            <View style={styles.quickRow}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action}
                  style={styles.quickPill}
                  activeOpacity={0.7}
                  onPress={() => handleQuickAction(action)}
                >
                  <Text style={styles.quickPillText}>{action}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Message composer */}
        <View style={styles.composerWrap}>
          <View style={styles.composer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type your message…"
              placeholderTextColor={colors.textMuted}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
              activeOpacity={0.85}
              onPress={handleSend}
              disabled={!input.trim()}
            >
              <Ionicons name="send" size={17} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  flex: {
    flex: 1,
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    backgroundColor: "#F7F8FA",
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 19,
    fontWeight: "700",
    color: colors.deep,
    letterSpacing: 0.3,
  },
  headerRight: {
    width: 34,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E0E5EA",
  },

  /* Chat content */
  chatContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 16,
    gap: 10,
  },
  dateChip: {
    alignSelf: "center",
    backgroundColor: "#EAEDF0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 4,
  },
  dateChipText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.6,
    color: colors.subtitle,
  },

  /* Assistant message */
  assistantRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    maxWidth: "85%",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#52E6B0",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  assistantSide: {
    alignItems: "flex-start",
  },
  assistantBubble: {
    backgroundColor: "#E4EDF3",
    borderRadius: 16,
    borderTopLeftRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#26292B",
  },
  time: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 4,
  },
  timeLeft: {
    marginLeft: 2,
  },
  timeRight: {
    alignSelf: "flex-end",
    marginRight: 2,
  },

  /* User message */
  userRow: {
    alignItems: "flex-end",
  },
  userSide: {
    alignItems: "flex-end",
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: colors.deep,
    borderRadius: 16,
    borderTopRightRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.white,
  },

  /* Quick actions */
  quickRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginLeft: 36,
    marginTop: 4,
  },
  quickPill: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.accent,
    backgroundColor: "#F7F8FA",
    alignItems: "center",
    justifyContent: "center",
  },
  quickPillText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.accent,
  },

  /* Composer */
  composerWrap: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#F7F8FA",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E5EA",
  },
  composer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#DDE2E6",
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    paddingVertical: 6,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: {
    backgroundColor: "#B9C4C8",
  },
});