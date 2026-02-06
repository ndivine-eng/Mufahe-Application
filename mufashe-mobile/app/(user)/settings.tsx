import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} activeOpacity={0.85}>
            <Text style={styles.iconText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.topTitle}>App Settings</Text>

          <View style={{ width: 38 }} />
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* NOTIFICATION SETTINGS */}
          <Text style={styles.sectionLabel}>NOTIFICATION SETTINGS</Text>
          <View style={styles.card}>
            <RowToggle
              icon="🔔"
              title="Push Notifications"
              value={pushNotifications}
              onChange={setPushNotifications}
            />
            <Divider />
            <RowToggle icon="✉️" title="Email Updates" value={emailUpdates} onChange={setEmailUpdates} />
          </View>

          {/* PRIVACY & DATA */}
          <Text style={styles.sectionLabel}>PRIVACY & DATA</Text>
          <View style={styles.card}>
            <RowNav icon="⬇️" title="Export My Data" onPress={() => alert("Export (later)")} />
            <Divider />
            <RowNav
              icon="🗑️"
              title="Clear Chat History"
              danger
              onPress={() => alert("Clear chat history (later)")}
            />
          </View>

          {/* ACCESSIBILITY */}
          <Text style={styles.sectionLabel}>ACCESSIBILITY</Text>
          <View style={styles.card}>
            <RowRightText icon="🔠" title="Font Size" rightText="Default" onPress={() => alert("Font size (later)")} />
            <Divider />
            <RowToggle icon="🌓" title="High Contrast" value={highContrast} onChange={setHighContrast} />
          </View>

          {/* ABOUT */}
          <Text style={styles.sectionLabel}>ABOUT MUFASHE</Text>
          <View style={styles.card}>
            <RowNav icon="📃" title="Terms of Service" onPress={() => alert("Terms (later)")} />
            <Divider />
            <RowNav icon="🔒" title="Privacy Policy" onPress={() => alert("Privacy policy (later)")} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Mufashe Legal Awareness</Text>
            <Text style={styles.footerSub}>Version 1.0.2 (Build 42)</Text>
          </View>

          <View style={{ height: 14 }} />
        </ScrollView>

        {/* Bottom nav (UI only) */}
        <View style={styles.bottomNav}>
          <NavItem label="Home" icon="🏠" onPress={() => router.replace("/(user)/dashboard")} />
          <NavItem label="Laws" icon="⚖️" onPress={() => router.replace("/(user)/library")} />
          <NavItem label="Ask AI" icon="💬" onPress={() => router.replace("/(user)/consult")} />
          <NavItem label="Settings" icon="⚙️" active onPress={() => router.replace("/(user)/settings")} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function RowToggle({
  icon,
  title,
  value,
  onChange,
}: {
  icon: string;
  title: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.iconBox}>
          <Text style={styles.rowIcon}>{icon}</Text>
        </View>
        <Text style={styles.rowTitle}>{title}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}

function RowNav({
  icon,
  title,
  danger,
  onPress,
}: {
  icon: string;
  title: string;
  danger?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.rowLeft}>
        <View style={[styles.iconBox, danger && styles.iconBoxDanger]}>
          <Text style={[styles.rowIcon, danger && styles.dangerText]}>{icon}</Text>
        </View>
        <Text style={[styles.rowTitle, danger && styles.dangerText]}>{title}</Text>
      </View>
      <Text style={styles.chev}>›</Text>
    </TouchableOpacity>
  );
}

function RowRightText({
  icon,
  title,
  rightText,
  onPress,
}: {
  icon: string;
  title: string;
  rightText: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.rowLeft}>
        <View style={styles.iconBox}>
          <Text style={styles.rowIcon}>{icon}</Text>
        </View>
        <Text style={styles.rowTitle}>{title}</Text>
      </View>
      <View style={styles.rightWrap}>
        <Text style={styles.rightText}>{rightText}</Text>
        <Text style={styles.chev}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

function NavItem({
  label,
  icon,
  active,
  onPress,
}: {
  label: string;
  icon: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress} activeOpacity={0.85}>
      <Text style={[styles.navIcon, active && styles.navIconActive]}>{icon}</Text>
      <Text style={[styles.navText, active && styles.navTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  screen: { flex: 1, backgroundColor: "#ffffff" },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
    backgroundColor: "#ffffff",
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 16, fontWeight: "900", color: "#111827" },
  topTitle: { fontSize: 14, fontWeight: "900", color: "#111827" },

  container: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 12 },

  sectionLabel: {
    marginTop: 12,
    marginBottom: 10,
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "900",
    letterSpacing: 0.6,
  },

  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },

  row: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxDanger: { backgroundColor: "#FEE2E2" },
  rowIcon: { fontSize: 14 },
  rowTitle: { fontSize: 13, fontWeight: "900", color: "#111827" },

  chev: { fontSize: 18, color: "#9CA3AF", fontWeight: "800" },

  divider: { height: 1, backgroundColor: "#E5E7EB" },

  rightWrap: { flexDirection: "row", alignItems: "center", gap: 8 },
  rightText: { fontSize: 12, color: "#6B7280", fontWeight: "800" },

  dangerText: { color: "#DC2626" },

  footer: { alignItems: "center", marginTop: 18, marginBottom: 6 },
  footerTitle: { fontSize: 12, fontWeight: "800", color: "#6B7280" },
  footerSub: { fontSize: 11, fontWeight: "700", color: "#9CA3AF", marginTop: 4 },

  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navItem: { alignItems: "center", gap: 2 },
  navIcon: { fontSize: 16, color: "#6B7280" },
  navIconActive: { color: "#2563EB" },
  navText: { fontSize: 11, color: "#6B7280", fontWeight: "700" },
  navTextActive: { fontSize: 11, color: "#2563EB", fontWeight: "900" },
});
