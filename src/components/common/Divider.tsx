import { AUTH_UI } from "@/constants/auth-ui";
import { StyleSheet, View, ViewStyle } from "react-native";

interface DividerProps {
  marginVertical?: number;
  style?: ViewStyle;
}

export function Divider({ marginVertical, style }: DividerProps) {
  return <View style={[styles.divider, marginVertical !== undefined ? { marginVertical } : null, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: AUTH_UI.colors.border,
  },
});
