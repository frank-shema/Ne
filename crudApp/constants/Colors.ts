// constants/Colors.ts
const tintColorLight = "#6200EE"; // Primary color
const tintColorDark = "#BB86FC"; // Primary color for dark mode

export type ColorScheme = "light" | "dark";

export const Colors: Record<ColorScheme, Record<string, string>> = {
  light: {
    text: "#111827",
    textSecondary: "#6B7280",
    background: "#F9FAFB", // Off-white
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: tintColorLight,
    primaryVariant: "#3700B3",
    secondary: "#03DAC6", // Accent
    surface: "#FFFFFF", // Cards, modals
    error: "#B00020",
    success: "#2E7D32",
    onPrimary: "#FFFFFF",
    onSecondary: "#000000",
    disabled: "#BDBDBD",
    placeholder: "#A0AEC0", // Lighter placeholder
    lightGray: "#E5E7EB",
    mediumGray: "#D1D5DB",
    darkGray: "#4B5563",
    danger: "#D32F2F",
    warning: "#FFA000",
    cardBackground: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  dark: {
    text: "#ECEDEE",
    textSecondary: "#9CA3AF",
    background: "#121212", // Dark background
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: tintColorDark,
    primaryVariant: "#3700B3", // May need adjustment for dark
    secondary: "#03DAC5", // Accent for dark
    surface: "#1E1E1E", // Slightly lighter than background for cards
    error: "#CF6679",
    success: "#66BB6A",
    onPrimary: "#000000",
    onSecondary: "#000000",
    disabled: "#424242",
    placeholder: "#718096",
    lightGray: "#2D2D2D",
    mediumGray: "#374151",
    darkGray: "#D1D5DB",
    danger: "#F44336",
    warning: "#FFC107",
    cardBackground: "#1E1E1E", // Surface color
    borderColor: "#2D3748",
  },
};

// For now, let's default to light theme colors.
// You would use your useColorScheme hook to dynamically select this.
export const DefaultThemeColors = Colors.light;
