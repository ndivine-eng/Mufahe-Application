import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

type Guide = {
  id: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  minutes: string;
  category: "land" | "employment" | "family" | "commercial";
  icon: string;
};

const GUIDES: Guide[] = [
  {
    id: "g1",
    title: "How to resolve a land dispute",
    desc: "A step-by-step guide on local mediation, land titles, and RLMU...",
    tag: "LAND LAW",
    tagColor: "#2563EB",
    minutes: "5 min read",
    category: "land",
    icon: "🏠",
  },
  {
    id: "g2",
    title: "Your Employment Contract",
    desc: "Understand your rights regarding working hours, public holidays,...",
    tag: "LABOR LAW",
    tagColor: "#16A34A",
    minutes: "8 min read",
    category: "employment",
    icon: "📄",
  },
  {
    id: "g3",
    title: "Registering a Small Business",
    desc: "Simple steps to formalize your business with RDB and...",
    tag: "COMMERCIAL",
    tagColor: "#F97316",
    minutes: "6 min read",
    category: "commercial",
    icon: "🧾",
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "land", label: "Land" },
  { key: "employment", label: "Employment" },
  { key: "family", label: "Family" },
];

export default function LibraryScreen() {
  const params = useLocalSearchParams();
  const preset = typeof params?.category === "string" ? params.category : "all";

  const [lang, setLang] = useState<"English" | "Kinyarwanda">("English");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>(preset);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return GUIDES.filter((g) => {
      const matchesFilter =
        filter === "all" ? true : g.category === (filter as any);
      const matchesQuery =
        query.length === 0
          ? true
          : `${g.title} ${g.desc} ${g.tag}`.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });
  }, [q, filter]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Text style={styles.iconText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Legal Resources</Text>

          <TouchableOpacity onPress={() => alert("Saved (later)")} style={styles.bookmarkBtn}>
            <Text style={styles.bookmark}>🔖</Text>
          </TouchableOpacity>
        </View>

        {/* Language segmented */}
        <View style={styles.segment}>
          <TouchableOpacity
            style={[styles.segItem, lang === "English" && styles.segActive]}
            onPress={() => setLang("English")}
            activeOpacity={0.9}
          >
            <Text style={[styles.segText, lang === "English" && styles.segTextActive]}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segItem, lang === "Kinyarwanda" && styles.segActive]}
            onPress={() => setLang("Kinyarwanda")}
            activeOpacity={0.9}
          >
            <Text style={[styles.segText, lang === "Kinyarwanda" && styles.segTextActive]}>
              Kinyarwanda
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search legal guides..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        {/* Filter pills */}
        <View style={styles.pillsRow}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <TouchableOpacity
                key={f.key}
                style={[styles.pill, active && styles.pillActive]}
                onPress={() => setFilter(f.key)}
                activeOpacity={0.9}
              >
                <Text style={[styles.pillText, active && styles.pillTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Section header */}
        <Text style={styles.sectionTitle}>Simplified Guides</Text>
        <Text style={styles.sectionSub}>Easy to understand legal advice for everyday situations.</Text>

        {/* Guide cards */}
        <View style={{ marginTop: 10, gap: 12 }}>
          {filtered.map((g) => (
            <TouchableOpacity
              key={g.id}
              style={styles.guideCard}
              activeOpacity={0.9}
              onPress={() => alert(`Open guide: ${g.title} (later)`)}
            >
              <View style={[styles.guideIcon, { backgroundColor: "rgba(37,99,235,0.08)" }]}>
                <Text style={{ fontSize: 16 }}>{g.icon}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.guideTitle}>{g.title}</Text>
                <Text style={styles.guideDesc}>{g.desc}</Text>

                <View style={styles.metaRow}>
                  <View style={[styles.tag, { backgroundColor: `${g.tagColor}1A` }]}>
                    <Text style={[styles.tagText, { color: g.tagColor }]}>{g.tag}</Text>
                  </View>
                  <Text style={styles.minutes}>{g.minutes}</Text>
                </View>
              </View>

              <Text style={styles.chev}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Bottom nav (same style as your mockup, UI-only) */}
       <View style={styles.bottomNav}>
              <TouchableOpacity style={styles.navItem} onPress={() => router.replace("/(user)/dashboard")}>
                <Text style={styles.navIcon}>🏠</Text>
                <Text style={styles.navTextActive}>Home</Text>
              </TouchableOpacity>
      
              <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(user)/consult")}>
                 <Text style={styles.navIcon}>💬</Text>
                 <Text style={styles.navText}>Ask Me</Text>
              </TouchableOpacity>
      
              <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(user)/library")}>
               <Text style={styles.navIcon}>📘</Text>
               <Text style={styles.navText}>Resources</Text>
              </TouchableOpacity>
      
              <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(user)/profile")}>
                <Text style={styles.navIcon}>👤</Text>
                <Text style={styles.navText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navItem} onPress={() => router.push("/(user)/settings")}>
                <Text style={styles.navIcon}>⚙️</Text>  
                <Text style={styles.navText}>Settings</Text>
              </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10 },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: { fontSize: 16, fontWeight: "900" },
  title: { fontSize: 14, fontWeight: "900", color: "#111827" },
  bookmarkBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  bookmark: { fontSize: 14 },

  segment: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
  },
  segItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  segActive: { backgroundColor: "#ffffff" },
  segText: { fontSize: 12, fontWeight: "800", color: "#6B7280" },
  segTextActive: { color: "#2563EB" },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
  searchIcon: { marginRight: 8, fontSize: 14 },
  searchInput: { flex: 1, fontSize: 13, color: "#111827" },

  pillsRow: { flexDirection: "row", gap: 10, marginTop: 12, marginBottom: 14 },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
  },
  pillActive: { backgroundColor: "#2563EB" },
  pillText: { fontSize: 12, fontWeight: "800", color: "#6B7280" },
  pillTextActive: { color: "#ffffff" },

  sectionTitle: { fontSize: 14, fontWeight: "900", color: "#111827" },
  sectionSub: { fontSize: 12, color: "#6B7280", marginTop: 4 },

  guideCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#ffffff",
  },
  guideIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  guideTitle: { fontSize: 13, fontWeight: "900", color: "#111827" },
  guideDesc: { fontSize: 11.5, color: "#6B7280", marginTop: 4, lineHeight: 16 },

  metaRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 },
  tag: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 },
  tagText: { fontSize: 10, fontWeight: "900" },
  minutes: { fontSize: 10.5, color: "#9CA3AF", fontWeight: "800" },

  chev: { fontSize: 18, color: "#9CA3AF", fontWeight: "800" },

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
