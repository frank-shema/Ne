// app/(app)/_layout.tsx
import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { DefaultThemeColors as C } from "../../constants/Colors";
import { globalStyles } from "../../styles/globalStyles";

export default function AppLayout() {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // router.replace('/(auth)/login'); // Handled by RootLayout
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: C.primary },
        headerTintColor: C.onPrimary,
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: `Welcome, ${user?.username || "User"}!`,
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={globalStyles.headerIcon}
            >
              <MaterialCommunityIcons
                name="logout-variant"
                size={26}
                color={C.onPrimary}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="itemForm" // Could be "[itemId]" for dynamic routes or just itemForm for modal
        options={({ route }: any) => ({
          // Route prop for dynamic title
          title: route.params?.noteId ? "Edit Note" : "Add New Note",
          presentation: "modal", // Makes it a modal screen
          headerLeft: () =>
            router.canGoBack() ? (
              <TouchableOpacity
                onPress={() => router.back()}
                style={globalStyles.headerIcon}
              >
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={26}
                  color={C.onPrimary}
                />
              </TouchableOpacity>
            ) : null,
        })}
      />
    </Stack>
  );
}
