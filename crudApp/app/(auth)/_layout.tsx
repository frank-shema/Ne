// app/(auth)/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { DefaultThemeColors as C } from "../../constants/Colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: C.primary },
        headerTintColor: C.onPrimary,
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
        animation: "slide_from_right", // Added animation
      }}
    >
      <Stack.Screen name="login" options={{ title: "Sign In" }} />
      <Stack.Screen name="register" options={{ title: "Create Account" }} />
    </Stack>
  );
}
