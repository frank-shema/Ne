// app/_layout.tsx
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthProvider, useAuth } from "../context/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = segments[0] === "(auth)";
    const isAppRoute = segments[0] === "(app)";
    // Check if the current route is the landing page (root index)
    // For root 'index.tsx', segments will be an empty array []
    const isLandingPageRoute = segments.length === 0;

    if (user) {
      // User is logged in
      if (isAuthRoute || isLandingPageRoute) {
        // If on an auth screen or landing page, redirect to app home
        router.replace("/(app)/home");
      }
      // If already in '(app)' group, do nothing, stay there.
    } else {
      // User is NOT logged in
      if (isAppRoute) {
        // If trying to access an app screen, redirect to login (or landing, then login)
        // Redirecting to landing first might be a smoother UX if they were deep-linked.
        // For simplicity now, let's redirect to login, which is in (auth) group.
        // Or, if we want them to see landing first, then from landing they navigate.
        router.replace("/"); // Redirect to landing page if trying to access app routes without auth
      }
      // If on landing page (isLandingPageRoute) or in (auth) group, do nothing, let them stay.
    }

    SplashScreen.hideAsync();
  }, [user, isLoading, segments, router]);

  if (isLoading) {
    return <LoadingOverlay visible={true} text="Initializing..." />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Slot />{" "}
      {/* This will render the landing page (index.tsx) or other matched routes */}
    </>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
