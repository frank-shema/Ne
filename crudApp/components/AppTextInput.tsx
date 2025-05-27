// components/AppTextInput.tsx
import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  Platform,
} from "react-native";
import { DefaultThemeColors as C } from "../constants/Colors";
import { globalStyles } from "../styles/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  isPassword?: boolean;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  leftIcon,
  isPassword,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused && globalStyles.inputFocused,
          error ? styles.inputErrorBorder : null,
        ]}
      >
        {leftIcon && (
          <MaterialCommunityIcons
            name={leftIcon}
            size={22}
            color={isFocused ? C.primary : C.placeholder}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[globalStyles.input, styles.inputField, style]}
          placeholderTextColor={C.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={!showPassword}
          {...props}
        />
        {isPassword && (
          <MaterialCommunityIcons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color={C.placeholder}
            style={styles.rightIcon}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 8, // Reduced margin as inputWrapper has margin
  },
  label: {
    fontSize: 14,
    color: C.textSecondary,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.borderColor,
    // marginBottom: 16, // Moved from globalStyles.input
  },
  inputField: {
    flex: 1,
    borderWidth: 0, // Handled by wrapper
    marginBottom: 0, // Handled by wrapper
    backgroundColor: "transparent",
  },
  leftIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  rightIcon: {
    marginRight: 12,
    marginLeft: 8,
  },
  inputErrorBorder: {
    borderColor: C.error,
  },
  errorText: {
    color: C.error,
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
});

export default AppTextInput;
