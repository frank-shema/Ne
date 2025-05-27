// components/LoadingOverlay.tsx
import React from "react";
import { View, ActivityIndicator, Text, StyleSheet, Modal } from "react-native";
import { DefaultThemeColors as C } from "../constants/Colors";

interface LoadingOverlayProps {
  visible: boolean;
  text?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible,
  text = "Loading...",
}) => {
  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      animationType="fade" // Subtle animation
      visible={visible}
      onRequestClose={() => {}} // Required for Android
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={C.primary} />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: C.surface,
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,
  },
  text: {
    marginTop: 18,
    fontSize: 16,
    color: C.text,
    fontWeight: "500",
  },
});

export default LoadingOverlay;
