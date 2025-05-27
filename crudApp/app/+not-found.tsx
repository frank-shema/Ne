// app/+not-found.tsx
import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import AppButton from "../components/AppButton";
import { DefaultThemeColors as C } from "../constants/Colors";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Text style={styles.subtitle}>Looks like you took a wrong turn.</Text>
        <Link href="/(app)/home" asChild>
          <AppButton title="Go to Home Screen" />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: C.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: C.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: C.textSecondary,
    marginBottom: 20,
    textAlign: "center",
  },
});
