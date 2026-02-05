import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { loginUser } from "../lib/auth";

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return identifier.trim().length >= 3 && password.length >= 6 && !loading;
  }, [identifier, password, loading]);

  const onLogin = async () => {
    if (!canSubmit) return;

    try {
      setLoading(true);
      setError("");

      await loginUser({ identifier: identifier.trim(), password });

      router.replace("/(user)/dashboard");
    } catch (e: any) {
      setError(e?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Image
              source={require("../../assets/images/splash-icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.tagline}>Empowering Justice through AI</Text>
        </View>

        <Text style={styles.title}>Secure Login</Text>

        {/* Email / Phone */}
        <Text style={styles.label}>EMAIL OR PHONE NUMBER</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            style={styles.input}
            placeholder="name@example.com"
            placeholderTextColor="#9CA3AF"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <Text style={[styles.label, { marginTop: 14 }]}>PASSWORD</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
          />
          <TouchableOpacity
            onPress={() => setShowPass((v) => !v)}
            style={styles.eyeBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.eyeText}>{showPass ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Forgot */}
        <TouchableOpacity
          style={styles.forgotWrap}
          onPress={() => alert("Forgot password (MVP: coming soon)")}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity
          style={[styles.primaryBtn, !canSubmit && styles.primaryDisabled]}
          onPress={onLogin}
          disabled={!canSubmit}
          activeOpacity={0.9}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryText}>Login  ➜</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google */}
        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => alert("Google login (MVP: later)")}
          activeOpacity={0.9}
        >
          <View style={styles.googleLeft}>
            <Text style={styles.googleG}>G</Text>
            <Text style={styles.googleText}>Continue with Google</Text>
          </View>
          <View style={styles.googleRightDot} />
        </TouchableOpacity>

        {/* Signup link */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/Register")}>
            <Text style={styles.bottomLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Back */}
        <TouchableOpacity
          style={styles.backLink}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#ffffff" },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 10 },

  header: { alignItems: "center", marginTop: 6, marginBottom: 10 },
  logoBox: {
    width: 86,
    height: 86,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 60, height: 60 },
  tagline: { marginTop: 10, color: "#64748B", fontWeight: "600", fontSize: 13 },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  label: { fontSize: 11, color: "#6B7280", fontWeight: "800", letterSpacing: 0.7 },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
    marginTop: 8,
  },
  inputIcon: { marginRight: 8, fontSize: 14 },
  input: { flex: 1, fontSize: 14, color: "#111827" },

  eyeBtn: { paddingLeft: 10, paddingVertical: 2 },
  eyeText: { fontSize: 16 },

  error: { marginTop: 8, color: "#DC2626", fontWeight: "700", fontSize: 12 },

  forgotWrap: { alignItems: "flex-end", marginTop: 10 },
  forgotText: { color: "#0F3D63", fontWeight: "700", fontSize: 12 },

  primaryBtn: {
    backgroundColor: "#0F3D63",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 14,
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  primaryDisabled: { opacity: 0.5 },
  primaryText: { color: "#ffffff", fontWeight: "900", fontSize: 15 },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 14,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  dividerText: { marginHorizontal: 10, fontSize: 12, color: "#9CA3AF", fontWeight: "800" },

  googleBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  googleLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  googleG: { fontSize: 16, fontWeight: "900", color: "#2563EB" },
  googleText: { fontSize: 13, fontWeight: "800", color: "#111827" },
  googleRightDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: "#0F3D63" },

  bottomRow: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  bottomText: { color: "#6B7280", fontWeight: "600" },
  bottomLink: { color: "#16A34A", fontWeight: "900" },

  backLink: { alignSelf: "center", marginTop: 14 },
  backText: { color: "#9CA3AF", fontWeight: "700" },
});
