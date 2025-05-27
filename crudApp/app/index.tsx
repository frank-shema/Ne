// app/index.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons"; // For placeholder icon
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import AppButton from "../components/AppButton"; // Assuming AppButton is in components/
import { DefaultThemeColors as C } from "../constants/Colors"; // Your color constants

// Replace with your actual logo if you have one
// const logo = require('../assets/images/your-logo.png');

const LandingScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Animated.View
          entering={FadeIn.duration(800)}
          style={styles.logoContainer}
        >
          {/* Replace with your Image component if using a logo image */}
          <MaterialCommunityIcons
            name="notebook-multiple"
            size={120}
            color={C.primary}
          />
        </Animated.View>

        <Animated.Text
          entering={FadeInUp.duration(700).delay(200)}
          style={styles.appName}
        >
          NoteSphere
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.duration(700).delay(400)}
          style={styles.tagline}
        >
          Capture Your Thoughts, Effortlessly.
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.duration(700).delay(600)}
          style={styles.buttonContainer}
        >
          <AppButton
            title="Get Started"
            onPress={() => router.push("/(auth)/register")}
            iconRight="arrow-right-circle-outline"
            style={styles.mainButton}
          />
          <AppButton
            title="I Already Have an Account"
            onPress={() => router.push("/(auth)/login")}
            variant="outline" // Use your outline or secondary variant
            style={styles.secondaryButton}
          />
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(700).delay(800)}
          style={styles.footer}
        >
          <Text style={styles.footerText}>Your Ideas, Organized.</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: C.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: Platform.OS === "ios" ? 20 : 40, // Extra padding for Android bottom navigation if any
  },
  logoContainer: {
    marginBottom: 30,
    // If using an Image:
    // width: 150,
    // height: 150,
    // borderRadius: 75, // Optional: if you want a circular logo bg
    // backgroundColor: C.lightGray, // Optional: background for logo
    // justifyContent: 'center',
    // alignItems: 'center',
    // shadowColor: C.darkGray,
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 5,
  },
  // logo: { // If using an Image component
  //   width: 100,
  //   height: 100,
  //   resizeMode: 'contain',
  // },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: C.primary,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 18,
    color: C.textSecondary,
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 26,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  mainButton: {
    width: "100%",
    paddingVertical: 18, // Make main button slightly larger
  },
  secondaryButton: {
    width: "100%",
    marginTop: 15,
  },
  footer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: C.textSecondary,
    opacity: 0.8,
  },
});

export default LandingScreen;
