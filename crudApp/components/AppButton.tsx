// components/AppButton.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { DefaultThemeColors as C } from "../constants/Colors";
import { globalStyles } from "../styles/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline";
  iconLeft?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconRight?: keyof typeof MaterialCommunityIcons.glyphMap;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  loading,
  variant = "primary",
  iconLeft,
  iconRight,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          button: [globalStyles.secondaryButton, styles.secondaryButtonCustom],
          text: [
            globalStyles.secondaryButtonText,
            styles.secondaryButtonTextCustom,
          ],
        };
      case "danger":
        return {
          button: styles.dangerButton,
          text: styles.dangerButtonText,
        };
      case "outline":
        return {
          button: styles.outlineButton,
          text: styles.outlineButtonText,
        };
      default: // primary
        return {
          button: {},
          text: {},
        };
    }
  };

  const variantStyles = getVariantStyles();
  const iconColor =
    variant === "primary" || variant === "danger" ? C.onPrimary : C.primary;

  return (
    <TouchableOpacity
      style={[
        globalStyles.button,
        variantStyles.button,
        style,
        (disabled || loading) && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variantStyles.text?.color || C.onPrimary}
          size="small"
        />
      ) : (
        <>
          {iconLeft && (
            <MaterialCommunityIcons
              name={iconLeft}
              size={20}
              color={
                (textStyle?.color as string) ||
                (variantStyles.text?.color as string) ||
                iconColor
              }
              style={styles.iconLeft}
            />
          )}
          <Text
            style={[globalStyles.buttonText, variantStyles.text, textStyle]}
          >
            {title}
          </Text>
          {iconRight && (
            <MaterialCommunityIcons
              name={iconRight}
              size={20}
              color={
                (textStyle?.color as string) ||
                (variantStyles.text?.color as string) ||
                iconColor
              }
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: C.disabled,
    borderColor: C.disabled, // For outline/secondary variants
    opacity: 0.7,
  },
  secondaryButtonCustom: {
    // Specific overrides if globalStyles.secondaryButton is not enough
    backgroundColor: C.lightGray,
  },
  secondaryButtonTextCustom: {
    color: C.primary,
    fontWeight: "600",
  },
  dangerButton: {
    backgroundColor: C.danger,
  },
  dangerButtonText: {
    color: C.onPrimary,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: C.primary,
  },
  outlineButtonText: {
    color: C.primary,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default AppButton;
