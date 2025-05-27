// styles/globalStyles.ts
import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { DefaultThemeColors as C } from "../constants/Colors"; // Use C for brevity

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: C.background,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: C.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: C.background,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: C.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: C.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: C.textSecondary,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 24,
  },
  input: {
    backgroundColor: C.surface,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: C.borderColor,
    color: C.text,
  },
  inputFocused: {
    borderColor: C.primary,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    backgroundColor: C.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: C.onPrimary,
    fontSize: 16,
    fontWeight: "600", // Semibold
  },
  secondaryButton: {
    backgroundColor: C.surface,
    borderColor: C.primary,
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: C.primary,
  },
  linkText: {
    color: C.primary,
    textAlign: "center",
    marginTop: 16,
    fontSize: 15,
    fontWeight: "500",
  },
  errorText: {
    color: C.error,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 14,
  },
  // Card styles for list items
  card: {
    backgroundColor: C.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: C.darkGray, // Softer shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, // More subtle
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: C.borderColor,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: C.text,
    marginBottom: 6,
  },
  cardContent: {
    fontSize: 15,
    color: C.textSecondary,
    lineHeight: 22,
    marginBottom: 8,
  },
  cardFooter: {
    fontSize: 13,
    color: C.textSecondary,
    opacity: 0.8,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: C.secondary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: C.darkGray,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: C.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: C.textSecondary,
  },
  headerIcon: {
    marginHorizontal: 15,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: C.textSecondary,
    marginTop: 16,
    textAlign: "center",
  },
});
