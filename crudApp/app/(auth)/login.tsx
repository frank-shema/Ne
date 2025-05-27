// app/(auth)/login.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import { globalStyles } from "../../styles/globalStyles";
import { DefaultThemeColors as C } from "../../constants/Colors";
import LoadingOverlay from "../../components/LoadingOverlay";

// You can add a logo here if you have one in assets
// const logo = require('../../assets/images/logo.png');

const LoginScreen = () => {
  const [identifier, setIdentifier] = useState(""); // Can be username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, authActionLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      setError("Please enter username/email and password.");
      return;
    }
    setError("");
    try {
      await login({ identifier, password });
      // router.replace('/(app)/home'); // Handled by RootLayout now
    } catch (e: any) {
      setError(e.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <LoadingOverlay visible={authActionLoading} text="Signing in..." />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={globalStyles.formContainer}>
          {/* {logo && <Image source={logo} style={styles.logo} />} */}
          <Text style={globalStyles.title}>Welcome Back!</Text>
          <Text style={globalStyles.subtitle}>
            Sign in to manage your notes.
          </Text>

          {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

          <AppTextInput
            label="Username or Email"
            value={identifier}
            onChangeText={setIdentifier}
            placeholder="yourname or name@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            leftIcon="account-outline"
          />
          <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            isPassword // This enables secureTextEntry and the eye icon
            leftIcon="lock-outline"
          />
          <AppButton
            title="Login"
            onPress={handleLogin}
            loading={authActionLoading}
            iconRight="login-variant"
          />
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={globalStyles.linkText}>
                Don't have an account?{" "}
                <Text style={styles.boldLink}>Register</Text>
              </Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Forgot Password?",
                "Password recovery feature coming soon!"
              )
            }
          >
            <Text style={[globalStyles.linkText, styles.forgotPassword]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: C.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 24,
    resizeMode: "contain",
  },
  boldLink: {
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 10,
    fontSize: 14,
    color: C.textSecondary,
  },
});

export default LoginScreen;
