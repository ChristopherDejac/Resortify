import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import BookingProgress from "../components/BookingProgress";

const durations = ["Day Time", "Overnight", "Day & Night"];
const dateOptions = [
  "Today, Sep 15",
  "Tomorrow, Sep 16",
  "Fri, Sep 18",
  "Sat, Sep 19",
];
const timeOptions = ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];
const cottageOptions = [
  "Umbrella (4-6 persons)",
  "Open Cottage (8-10 persons)",
  "Bamboo Cottage (4 persons)",
];
const roomOptions = ["Standard Queen", "Standard Twin", "Family Suite"];

/* ── Guest Counter ─────────────────────────────────── */

function GuestCounter({ title, subtitle, value, onChange, min }) {
  return (
    <View style={styles.guestCard}>
      <View style={styles.guestInfo}>
        <Text style={styles.guestTitle}>{title}</Text>
        <Text style={styles.guestSub}>{subtitle}</Text>
      </View>
      <View style={styles.stepper}>
        <TouchableOpacity
          style={[styles.minusBtn, value <= min && styles.minusBtnDisabled]}
          activeOpacity={0.7}
          disabled={value <= min}
          onPress={() => onChange(Math.max(min, value - 1))}
        >
          <Ionicons
            name="remove"
            size={16}
            color={value <= min ? "#C4CCD2" : colors.deep}
          />
        </TouchableOpacity>
        <Text style={styles.count}>{value}</Text>
        <TouchableOpacity
          style={styles.plusBtn}
          activeOpacity={0.85}
          onPress={() => onChange(Math.min(9, value + 1))}
        >
          <Ionicons name="add" size={17} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ── Field with dropdown ────────────────────────────── */

function FieldDrop({ icon, label, value, placeholder, open, onToggle, options, onSelect }) {
  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity style={styles.field} activeOpacity={0.7} onPress={onToggle}>
        <Ionicons name={icon} size={17} color={colors.deep} />
        <Text style={value ? styles.fieldValue : styles.fieldPlaceholder}>
          {value || placeholder}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={15}
          color={colors.textMuted}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.optionList}>
          {options.map((o) => {
            const selected = o === value;
            return (
              <TouchableOpacity
                key={o}
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => {
                  onSelect(o);
                  onToggle();
                }}
              >
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                  {o}
                </Text>
                {selected && (
                  <Ionicons name="checkmark" size={15} color={colors.deep} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

/* ── Accommodation Card ─────────────────────────────── */

function AccomCard({ icon, title, desc, selected, onSelect, option, options, onPick }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.accomCard, selected && styles.accomCardActive]}>
      <TouchableOpacity
        style={styles.accomHeader}
        activeOpacity={0.85}
        onPress={onSelect}
      >
        <View style={[styles.accomIcon, selected && styles.accomIconActive]}>
          <Ionicons name={icon} size={20} color={colors.deep} />
        </View>
        <View style={styles.accomTexts}>
          <View style={styles.accomTitleRow}>
            <Text style={styles.accomTitle}>{title}</Text>
            <View style={[styles.radio, selected && styles.radioActive]}>
              {selected && <Ionicons name="checkmark" size={11} color={colors.white} />}
            </View>
          </View>
          <Text style={styles.accomDesc}>{desc}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.accomDrop, selected && styles.accomDropActive]}
        activeOpacity={0.7}
        onPress={() => setOpen((p) => !p)}
      >
        <Text style={styles.accomDropText}>{option}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={15}
          color={selected ? colors.deep : colors.textMuted}
        />
      </TouchableOpacity>
      {open && (
        <View style={styles.accomList}>
          {options.map((o) => {
            const sel = o === option;
            return (
              <TouchableOpacity
                key={o}
                style={styles.optionRow}
                activeOpacity={0.7}
                onPress={() => {
                  onPick(o);
                  setOpen(false);
                }}
              >
                <Text style={[styles.optionText, sel && styles.optionTextSelected]}>
                  {o}
                </Text>
                {sel && <Ionicons name="checkmark" size={15} color={colors.deep} />}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

/* ── Main Screen ─────────────────────────────────────── */

export default function BookingFormScreen({ navigation }) {
  // Guest Count
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [senior, setSenior] = useState(0);

  // Details
  const [duration, setDuration] = useState("Day Time");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [accomType, setAccomType] = useState("Cottage");
  const [cottageOpt, setCottageOpt] = useState(cottageOptions[0]);
  const [roomOpt, setRoomOpt] = useState(roomOptions[0]);
  const [openField, setOpenField] = useState("");

  // Guest Info
  const [fullName, setFullName] = useState("Juan Dela Cruz");
  const [email, setEmail] = useState("juan.dc@example.com");
  const [phone, setPhone] = useState("+63 900 000 0000");
  const [idNumber, setIdNumber] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.deep} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.divider} />

      <BookingProgress current={0} />

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* ── Section 1: Guest Count ── */}
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionHeading}>Guest Count</Text>
          <Text style={styles.totalGuests}>
            {adults + children + senior} total
          </Text>
        </View>

        <View style={styles.cardsWrap}>
          <GuestCounter
            title="Adult"
            subtitle="Ages 13+"
            value={adults}
            onChange={setAdults}
            min={1}
          />
          <GuestCounter
            title="Children"
            subtitle="Ages 0-12"
            value={children}
            onChange={setChildren}
            min={0}
          />
          <GuestCounter
            title="PWD/Senior"
            subtitle="Discounted rate"
            value={senior}
            onChange={setSenior}
            min={0}
          />
        </View>

        {/* ── Section 2: Details ── */}
        <Text style={styles.sectionHeading}>Stay Duration</Text>
        <View style={styles.segmented}>
          {durations.map((d) => {
            const sel = duration === d;
            return (
              <TouchableOpacity
                key={d}
                style={[styles.segItem, sel && styles.segItemActive]}
                activeOpacity={0.85}
                onPress={() => setDuration(d)}
              >
                <Text style={[styles.segText, sel && styles.segTextActive]}>{d}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.fieldSpacing}>
          <FieldDrop
            icon="calendar-outline"
            label="Stay Date"
            placeholder="Select Date"
            value={date}
            open={openField === "date"}
            onToggle={() => setOpenField(openField === "date" ? "" : "date")}
            options={dateOptions}
            onSelect={setDate}
          />
        </View>

        <View style={styles.fieldSpacing}>
          <FieldDrop
            icon="time-outline"
            label="Expected Arrival Time"
            placeholder="Select Time"
            value={time}
            open={openField === "time"}
            onToggle={() => setOpenField(openField === "time" ? "" : "time")}
            options={timeOptions}
            onSelect={setTime}
          />
        </View>

        <Text style={[styles.sectionHeading, styles.accomHeading]}>Accommodation</Text>
        <View style={styles.accomWrap}>
          <AccomCard
            icon="umbrella-outline"
            title="Cottage"
            desc="Open-air shelter with table & bench, perfect for day tours."
            selected={accomType === "Cottage"}
            onSelect={() => setAccomType("Cottage")}
            option={cottageOpt}
            options={cottageOptions}
            onPick={setCottageOpt}
          />
          <AccomCard
            icon="bed-outline"
            title="Room"
            desc="Air-conditioned room with ensuite bath, ideal overnight stays."
            selected={accomType === "Room"}
            onSelect={() => setAccomType("Room")}
            option={roomOpt}
            options={roomOptions}
            onPick={setRoomOpt}
          />
        </View>

        {/* ── Section 3: Guest Information ── */}
        <Text style={[styles.sectionHeading, styles.guestInfoHeading]}>
          Guest Information
        </Text>
        <View style={styles.formCard}>
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <View style={styles.inputShell}>
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Full Name"
                placeholderTextColor="#A3ADB5"
              />
            </View>
          </View>
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <View style={styles.inputShell}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email Address"
                placeholderTextColor="#A3ADB5"
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <View style={styles.inputShell}>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                placeholderTextColor="#A3ADB5"
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>Gov. ID / Passport</Text>
            <View style={styles.inputShell}>
              <Ionicons name="card-outline" size={16} color={colors.deep} />
              <TextInput
                style={styles.input}
                value={idNumber}
                onChangeText={setIdNumber}
                placeholder="ID Number"
                placeholderTextColor="#A3ADB5"
              />
            </View>
          </View>
        </View>

        {/* Special Requests */}
        <Text style={[styles.sectionHeading, styles.notesHeading]}>Special Requests &amp; Notes</Text>
        <Text style={styles.notesHint}>
          Let us know if you have specific needs like accessibility or dietary
          restrictions.
        </Text>
        <View style={styles.textareaShell}>
          <TextInput
            style={styles.textarea}
            value={notes}
            onChangeText={setNotes}
            placeholder="Type your requests here..."
            placeholderTextColor="#A3ADB5"
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* ── Bottom payment bar ── */}
      <View style={styles.bottomBar}>
        <View style={styles.totalWrap}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₱ 2,300.00</Text>
        </View>
        <TouchableOpacity
          style={styles.payBtn}
          activeOpacity={0.88}
          onPress={() => navigation.navigate("BookingPayment")}
        >
          <Text style={styles.payText}>Continue to Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ── Styles ──────────────────────────────────────────── */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F8FA",
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
    fontSize: 20,
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

  /* Scroll */
  scrollView: {
    flex: 1,
  },
  scroll: {
    paddingTop: 10,
    paddingBottom: 28,
    paddingHorizontal: 18,
  },

  /* Section headings */
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionHeading: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 17,
    fontWeight: "700",
    color: colors.deep,
    marginBottom: 14,
  },
  totalGuests: {
    fontSize: 12.5,
    fontWeight: "600",
    color: colors.subtitle,
  },

  /* Guest counters */
  cardsWrap: {
    gap: 12,
    marginBottom: 28,
  },
  guestCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  guestInfo: {
    gap: 3,
  },
  guestTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  guestSub: {
    fontSize: 12.5,
    color: colors.subtitle,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  minusBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },
  minusBtnDisabled: {
    borderColor: "#C4CCD2",
  },
  count: {
    minWidth: 22,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  plusBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Segmented */
  segmented: {
    flexDirection: "row",
    backgroundColor: "#EEF1F3",
    borderRadius: 12,
    padding: 3,
    gap: 3,
    marginBottom: 20,
  },
  segItem: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  segItemActive: {
    backgroundColor: colors.white,
    elevation: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  segText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8A959C",
  },
  segTextActive: {
    color: colors.deep,
    fontWeight: "700",
  },

  /* Fields */
  fieldSpacing: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.subtitle,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  field: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingHorizontal: 14,
  },
  fieldPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: "#A3ADB5",
  },
  fieldValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  optionList: {
    marginTop: 6,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingVertical: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  optionText: {
    fontSize: 13.5,
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.deep,
    fontWeight: "700",
  },

  /* Accommodation */
  accomHeading: {
    marginBottom: 14,
  },
  accomWrap: {
    gap: 14,
    marginBottom: 28,
  },
  accomCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E3E7EA",
    overflow: "hidden",
  },
  accomCardActive: {
    borderColor: colors.deep,
    backgroundColor: "#EDF2F4",
  },
  accomHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    padding: 15,
  },
  accomIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E3F0EF",
    alignItems: "center",
    justifyContent: "center",
  },
  accomIconActive: {
    backgroundColor: colors.secondary,
  },
  accomTexts: {
    flex: 1,
    gap: 4,
  },
  accomTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accomTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.deep,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#C4CCD2",
    alignItems: "center",
    justifyContent: "center",
  },
  radioActive: {
    borderColor: colors.deep,
    backgroundColor: colors.deep,
  },
  accomDesc: {
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.subtitle,
  },
  accomDrop: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 14,
    marginBottom: 13,
    paddingHorizontal: 13,
    backgroundColor: "#F3F5F6",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#E3E7EA",
  },
  accomDropActive: {
    backgroundColor: "#F8FAFA",
    borderColor: "#D3DDE0",
  },
  accomDropText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  accomList: {
    marginHorizontal: 14,
    marginBottom: 14,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingVertical: 4,
  },

  /* Guest Information */
  guestInfoHeading: {
    marginBottom: 14,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 28,
  },
  fieldWrap: {
    marginVertical: 10,
  },
  inputShell: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#6E7B81",
  },

  /* Special Requests */
  notesHeading: {
    marginBottom: 8,
  },
  notesHint: {
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.subtitle,
    fontStyle: "italic",
    marginBottom: 12,
  },
  textareaShell: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E7EA",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  textarea: {
    minHeight: 90,
    fontSize: 14,
    color: colors.text,
  },

  /* Bottom bar */
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E5EA",
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 6,
  },
  totalWrap: {
    gap: 2,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.subtitle,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  totalValue: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.deep,
  },
  payBtn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.deep,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  payText: {
    fontSize: 14.5,
    fontWeight: "700",
    color: colors.white,
  },
});