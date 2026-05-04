import { AUTH_UI } from "@/constants/auth-ui";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  style?: ViewStyle;
}

export function ProgressBar({
  progress,
  color,
  height = 6,
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  return (
    <View style={[styles.track, { height }, style]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clampedProgress * 100}%`,
            height,
            backgroundColor: color ?? AUTH_UI.colors.accent,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    backgroundColor: AUTH_UI.colors.surfaceMuted,
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 999,
  },
});
