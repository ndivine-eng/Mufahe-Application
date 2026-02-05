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

export default function ProfileScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [lang, setLang] = useState<"English" | "Kinyarwanda">("English");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Text style={styles.iconText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.topTitle}>User Profile</Text>

          <TouchableOpacity onPress={() => alert("Settings (later)")} style={styles.iconBtn}>
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar section */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              {/* Placeholder avatar icon */}
              <Text style={styles.avatarIcon}>👤</Text>
            </View>

            {/* Edit button overlay */}
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => alert("Upload profile photo (later)")}
              activeOpacity={0.85}
            >
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>Jean-Luc</Text>
          <Text style={styles.meta}>+250 788 123 456</Text>
          <Text style={styles.meta}>📍 Kigali, Rwanda</Text>
        </View>

        {/* Account settings */}
        <Text style={styles.sectionLabel}>ACCOUNT SETTINGS</Text>

        <View style={styles.card}>
          <RowItem
            icon="👤"
            title="Personal Information"
            onPress={() => alert("Personal Information (later)")}
          />
          <Divider />
          <RowItem
            icon="📄"
            title="Linked Legal Documents"
            subtitle="3 Documents Verified"
            onPress={() => alert("Linked Documents (later)")}
          />
          <Divider />
          <RowItem icon="🛡️" title="Account Security" onPress={() => alert("Security (later)")} />
        </View>

        {/* Preferences */}
        <Text style={styles.sectionLabel}>PREFERENCES</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowIcon}>🌐</Text>
              <View>
                <Text style={styles.rowTitle}>Language Preference</Text>
              </View>
            </View>

            <View style={styles.langPills}>
              <TouchableOpacity
                onPress={() => setLang("English")}
                style={[styles.pill, lang === "English" && styles.pillActive]}
                activeOpacity={0.85}
              >
                <Text style={[styles.pillText, lang === "English" && styles.pillTextActive]}>
                  English
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setLang("Kinyarwanda")}
                style={[styles.pill, lang === "Kinyarwanda" && styles.pillActive]}
                activeOpacity={0.85}
              >
                <Text style={[styles.pillText, lang === "Kinyarwanda" && styles.pillTextActive]}>
                  Kinyarwanda
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Divider />

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.rowIcon}>🔔</Text>
              <View>
                <Text style={styles.rowTitle}>Push Notifications</Text>
              </View>
            </View>

            <Switch value={pushEnabled} onValueChange={setPushEnabled} />
          </View>
        </View>

        {/* Sign out */}
        <TouchableOpacity
          style={styles.signOut}
          onPress={() => alert("Sign Out (later: clear token + go to landing/login)")}
          activeOpacity={0.9}
        >
          <Text style={styles.signOutText}>⎋  Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Mufashe v1.4.2 (2023)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function RowItem({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row} activeOpacity={0.85}>
      <View style={styles.rowLeft}>
        <Text style={styles.rowIcon}>{icon}</Text>
        <View>
          <Text style={styles.rowTitle}>{title}</Text>
          {subtitle ? <Text style={styles.rowSub}>{subtitle}</Text> : null}
        </View>
      </View>
      <Text style={styles.chev}>›</Text>
    </TouchableOpacity>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 22 },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 16, fontWeight: "800" },
  topTitle: { fontSize: 14, fontWeight: "900", color: "#111827" },

  profileHeader: { alignItems: "center", marginTop: 12, marginBottom: 18 },
  avatarWrap: { position: "relative", marginBottom: 10 },
  avatarCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarIcon: { fontSize: 34 },
  editBtn: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  editIcon: { color: "#ffffff", fontWeight: "900", fontSize: 12 },

  name: { fontSize: 18, fontWeight: "900", color: "#111827", marginTop: 6 },
  meta: { fontSize: 12, color: "#6B7280", marginTop: 4, fontWeight: "600" },

  sectionLabel: {
    marginTop: 14,
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
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    textAlign: "center",
    textAlignVertical: "center",
    paddingTop: 8,
    fontSize: 14,
  },
  rowTitle: { fontSize: 13, fontWeight: "900", color: "#111827" },
  rowSub: { fontSize: 11, color: "#16A34A", marginTop: 2, fontWeight: "800" },
  chev: { fontSize: 18, color: "#9CA3AF", fontWeight: "800" },

  divider: { height: 1, backgroundColor: "#E5E7EB" },

  langPills: { flexDirection: "row", gap: 8 },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#ffffff",
  },
  pillActive: {
    borderColor: "#2563EB",
    backgroundColor: "#E8F0FF",
  },
  pillText: { fontSize: 11, fontWeight: "800", color: "#6B7280" },
  pillTextActive: { color: "#2563EB" },

  signOut: {
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: "#FEE2E2",
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  signOutText: { color: "#DC2626", fontWeight: "900" },

  version: { marginTop: 12, textAlign: "center", color: "#9CA3AF", fontSize: 11, fontWeight: "700" },
});
