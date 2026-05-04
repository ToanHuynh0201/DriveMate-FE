import { AUTH_UI } from "@/constants/auth-ui";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  style?: ViewStyle;
}

export function EmptyState({ icon, title, subtitle, action, style }: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={56} color={AUTH_UI.colors.disabled} />
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: AUTH_UI.colors.textSecondary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: AUTH_UI.colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
});
