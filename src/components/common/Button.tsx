import { AUTH_UI } from "@/constants/auth-ui";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "icon" | "danger";

interface ButtonProps {
  variant?: ButtonVariant;
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  flex?: boolean;
}

export function Button({
  variant = "primary",
  label,
  icon,
  onPress,
  disabled,
  loading,
  style,
  flex,
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isIcon = variant === "icon";
  const isDanger = variant === "danger";

  if (isIcon) {
    return (
      <TouchableOpacity
        style={[styles.iconBtn, style]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.75}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={disabled ? AUTH_UI.colors.disabled : AUTH_UI.colors.textPrimary}
          />
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.base,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        isDanger && styles.dangerBtn,
        disabled && styles.disabled,
        flex && { flex: 1 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator
          color={isPrimary || isDanger ? AUTH_UI.colors.accentText : AUTH_UI.colors.textPrimary}
        />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={18}
              color={isPrimary || isDanger ? AUTH_UI.colors.accentText : AUTH_UI.colors.textSecondary}
              style={label ? styles.iconMargin : undefined}
            />
          )}
          {label && (
            <Text
              style={[
                styles.label,
                isPrimary && styles.labelPrimary,
                isSecondary && styles.labelSecondary,
                isDanger && styles.labelDanger,
              ]}>
              {label}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: AUTH_UI.radius.lg,
    height: 50,
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: AUTH_UI.colors.accent,
  },
  secondary: {
    backgroundColor: AUTH_UI.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: AUTH_UI.colors.border,
  },
  dangerBtn: {
    backgroundColor: AUTH_UI.colors.danger,
  },
  disabled: {
    backgroundColor: AUTH_UI.colors.disabled,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AUTH_UI.colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
  },
  labelPrimary: {
    color: AUTH_UI.colors.accentText,
  },
  labelSecondary: {
    color: AUTH_UI.colors.textPrimary,
    fontWeight: "600",
  },
  labelDanger: {
    color: AUTH_UI.colors.accentText,
  },
  iconMargin: {
    marginRight: 8,
  },
});
