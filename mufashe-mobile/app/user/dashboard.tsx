import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

const categories = [
  {
    key: "family",
    title: "Family Law",
    subtitle: "Marriage & Inheritance",
    bg: "#E8F0FF",
  },
  {
    key: "land",
    title: "Land Rights",
    subtitle: "Titles & Disputes",
    bg: "#E9FBEF",
  },
  {
    key: "labor",
    title: "Labor Law",
    subtitle: "Workplace Rights",
    bg: "#ECFDF3",
  },
  {
    key: "civil",
    title: "Civil Rights",
    subtitle: "Individual Freedoms",
    bg: "#EFF6FF",
  },
];

const recent = [
  { id: "1", title: "Inquiry about land transfer", meta: "Yesterday • Completed" },
  { id: "2", title: "Contract termination rights", meta: "Oct 24 • Completed" },
];

export default function Dashboard() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.appIconBox}>
              <Image
                source={require("../../assets/images/splash-icon.png")}
                style={styles.appIcon}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.appName}>MUFASHE</Text>
              <Text style={styles.userName}>Jean-Luc</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => alert("Notifications (later)")}
              activeOpacity={0.85}
            >
              <Text style={styles.circleIcon}>🔔</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.avatar}
              onPress={() => router.push("/user/profile")}
              activeOpacity={0.85}
            >
              <Text style={styles.avatarText}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Intro */}
        <Text style={styles.bigTitle}>How can Mufashe assist you today?</Text>
        <Text style={styles.smallText}>
          Ask about your legal rights in Kinyarwanda, French, or English.
        </Text>

        {/* Search / Prompt */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/user/consult")}
          style={styles.searchWrap}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Ask about your legal right..."
            placeholderTextColor="#9CA3AF"
            editable={false}
          />
          <View style={styles.micBtn}>
            <Text style={styles.micIcon}>🎤</Text>
          </View>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Legal Categories</Text>
          <TouchableOpacity onPress={() => router.push("/user/library")} activeOpacity={0.8}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {categories.map((c) => (
            <TouchableOpacity
              key={c.key}
              style={[styles.catCard, { backgroundColor: c.bg }]}
              activeOpacity={0.9}
              onPress={() =>
                router.push({
                  pathname: "/user/library",
                  params: { category: c.key },
                })
              }
            >
              <View style={styles.catIcon}>
                <Text style={styles.catEmoji}>⚖️</Text>
              </View>
              <Text style={styles.catTitle}>{c.title}</Text>
              <Text style={styles.catSub}>{c.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent */}
        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Recent Consultations</Text>

        <View style={styles.recentList}>
          {recent.map((r, idx) => (
            <TouchableOpacity
              key={r.id}
              style={styles.recentItem}
              activeOpacity={0.9}
              onPress={() => router.push("/user/history")}
            >
              <View style={[styles.recentDot, { backgroundColor: idx === 0 ? "#2563EB" : "#16A34A" }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.recentTitle}>{r.title}</Text>
                <Text style={styles.recentMeta}>{r.meta}</Text>
              </View>
              <Text style={styles.chev}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency help */}
        <View style={styles.helpCard}>
          <View style={styles.helpLeft}>
            <View style={styles.helpIcon}>
              <Text style={{ color: "white", fontWeight: "900" }}>!</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.helpTitle}>Need Immediate Help?</Text>
              <Text style={styles.helpText}>Contact the National Legal Aid Service directly.</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => alert("Call (later: Linking to phone)")}
            activeOpacity={0.9}
          >
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          Disclaimer: Mufashe AI provides legal information, not professional advice.
        </Text>

        {/* Spacer for bottom nav */}
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Bottom nav (UI only for now) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace("/user/dashboard")}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/user/consult")}>
           <Text style={styles.navIcon}>💬</Text>
           <Text style={styles.navText}>Ask Me</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/user/library")}>
         <Text style={styles.navIcon}>📘</Text>
         <Text style={styles.navTextActive}>Resources</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/user/profile")}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/user/settings")}>
          <Text style={styles.navIcon}>⚙️</Text>  
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ffffff" },
  container: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 10 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  appIconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#0F3D63",
    alignItems: "center",
    justifyContent: "center",
  },
  appIcon: { width: 22, height: 22 },
  appName: { fontSize: 10, color: "#6B7280", fontWeight: "800", letterSpacing: 0.7 },
  userName: { fontSize: 14, fontWeight: "800", color: "#111827" },

  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  circleBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  circleIcon: { fontSize: 14 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 14 },

  bigTitle: { fontSize: 18, fontWeight: "900", color: "#111827", marginTop: 6 },
  smallText: { fontSize: 12, color: "#6B7280", marginTop: 6, marginBottom: 14, lineHeight: 16 },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 18,
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 13, color: "#111827" },
  micBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#E8F0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  micIcon: { fontSize: 14 },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 14, fontWeight: "900", color: "#111827" },
  seeAll: { fontSize: 12, color: "#2563EB", fontWeight: "800" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  catCard: {
    width: "48%",
    borderRadius: 16,
    padding: 12,
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  catIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  catEmoji: { fontSize: 14 },
  catTitle: { fontSize: 13, fontWeight: "900", color: "#111827" },
  catSub: { fontSize: 11, color: "#6B7280", marginTop: 4 },

  recentList: { marginTop: 10, gap: 10 },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#ffffff",
  },
  recentDot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  recentTitle: { fontSize: 13, fontWeight: "900", color: "#111827" },
  recentMeta: { fontSize: 11, color: "#6B7280", marginTop: 2 },
  chev: { fontSize: 18, color: "#9CA3AF", marginLeft: 6 },

  helpCard: {
    marginTop: 14,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  helpLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1, paddingRight: 10 },
  helpIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  helpTitle: { fontSize: 13, fontWeight: "900", color: "#111827" },
  helpText: { fontSize: 11, color: "#6B7280", marginTop: 2 },

  callBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  callText: { color: "#ffffff", fontWeight: "900", fontSize: 12 },

  disclaimer: { marginTop: 12, fontSize: 10.5, color: "#9CA3AF", textAlign: "center" },

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
  navIcon: { fontSize: 16 },
  navText: { fontSize: 11, color: "#6B7280", fontWeight: "700" },
  navTextActive: { fontSize: 11, color: "#2563EB", fontWeight: "900" },
});
