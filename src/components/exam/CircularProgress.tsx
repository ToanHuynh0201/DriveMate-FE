import { AUTH_UI } from "@/constants/auth-ui";
import { View } from "react-native";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  fillColor?: string;
}

export function CircularProgress({
  percentage,
  size = 140,
  strokeWidth = 12,
  fillColor,
}: CircularProgressProps) {
  const p = Math.min(100, Math.max(0, percentage));
  const rightP = Math.min(p, 50);
  const leftP = Math.max(0, p - 50);
  const half = size / 2;

  const θRight = 180 * (1 - rightP / 50);
  const θLeft = 180 * (1 - leftP / 50);

  const color = fillColor ?? AUTH_UI.colors.accent;

  const ringBase = {
    position: "absolute" as const,
    width: size,
    height: size,
    borderRadius: half,
    borderWidth: strokeWidth,
  };

  return (
    <View style={{ width: size, height: size }}>
      <View style={[ringBase, { borderColor: AUTH_UI.colors.surfaceMuted }]} />

      <View
        style={{
          position: "absolute",
          left: half,
          width: half,
          height: size,
          overflow: "hidden",
        }}>
        <View
          style={[
            ringBase,
            {
              right: 0,
              left: undefined,
              borderColor: color,
              transform: [{ rotate: `${θRight}deg` }],
            },
          ]}
        />
      </View>

      <View
        style={{
          position: "absolute",
          left: 0,
          width: half,
          height: size,
          overflow: "hidden",
        }}>
        <View
          style={[
            ringBase,
            {
              left: 0,
              borderColor: color,
              transform: [{ rotate: `${θLeft}deg` }],
            },
          ]}
        />
      </View>
    </View>
  );
}
