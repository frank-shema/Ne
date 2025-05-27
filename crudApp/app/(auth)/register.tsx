// app/(auth)/register.tsx
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

// const logo = require('../../assets/images/logo.png');

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register, authActionLoading } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    try {
      await register({ username, email, password });
      // router.replace('/(app)/home'); // Handled by RootLayout
    } catch (e: any) {
      setError(e.message || "Registration failed. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <LoadingOverlay visible={authActionLoading} text="Creating account..." />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={globalStyles.formContainer}>
          {/* {logo && <Image source={logo} style={styles.logo} />} */}
          <Text style={globalStyles.title}>Create Account</Text>
          <Text style={globalStyles.subtitle}>
            Join us and start organizing your thoughts!
          </Text>

          {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}

          <AppTextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Choose a cool username"
            autoCapitalize="none"
            leftIcon="account-plus-outline"
          />
          <AppTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="your.email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="email-outline"
          />
          <AppTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a strong password"
            isPassword
            leftIcon="lock-plus-outline"
          />
          <AppTextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repeat your password"
            isPassword
            leftIcon="lock-check-outline"
          />
          <AppButton
            title="Register"
            onPress={handleRegister}
            loading={authActionLoading}
            iconRight="account-arrow-right-outline"
          />
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={globalStyles.linkText}>
                Already have an account?{" "}
                <Text style={styles.boldLink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </Link>
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
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  boldLink: {
    fontWeight: "bold",
  },
});

export default RegisterScreen;
