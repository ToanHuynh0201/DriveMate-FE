import { AUTH_UI } from "@/constants/auth-ui";
import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padding?: number;
}

export function Card({ children, style, onPress, padding = 12 }: CardProps) {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.card, { padding }, style]}
        onPress={onPress}
        activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.card, { padding }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AUTH_UI.colors.surface,
    borderRadius: AUTH_UI.radius.lg,
  },
});
