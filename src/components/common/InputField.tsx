import { AUTH_UI } from "@/constants/auth-ui";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  containerStyle?: ViewStyle;
}

export function InputField({
  leftIcon,
  rightIcon,
  onRightPress,
  containerStyle,
  style,
  ...rest
}: InputFieldProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon && (
        <Ionicons name={leftIcon} size={18} color={AUTH_UI.colors.textMuted} />
      )}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={AUTH_UI.colors.textMuted}
        {...rest}
      />
      {rightIcon && (
        <TouchableOpacity onPress={onRightPress} disabled={!onRightPress}>
          <Ionicons name={rightIcon} size={18} color={AUTH_UI.colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderColor: AUTH_UI.colors.border,
    borderRadius: AUTH_UI.radius.lg,
    backgroundColor: AUTH_UI.colors.surface,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: AUTH_UI.colors.textPrimary,
    padding: 0,
  },
});
