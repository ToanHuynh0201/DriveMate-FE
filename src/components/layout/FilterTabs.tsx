import { AUTH_UI } from "@/constants/auth-ui";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export interface TabItem {
  key: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

interface FilterTabsProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: "pills" | "segment";
  style?: ViewStyle;
}

export function FilterTabs({
  tabs,
  activeKey,
  onChange,
  variant = "pills",
  style,
}: FilterTabsProps) {
  if (variant === "segment") {
    return (
      <View style={[styles.segment, style]}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.segmentOption, isActive && styles.segmentOptionActive]}
              onPress={() => onChange(tab.key)}>
              {tab.icon && (
                <Ionicons
                  name={tab.icon}
                  size={15}
                  color={isActive ? AUTH_UI.colors.accentText : AUTH_UI.colors.textSecondary}
                />
              )}
              <Text
                style={[
                  styles.segmentText,
                  isActive && styles.segmentTextActive,
                ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={style}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillsScroll}
        contentContainerStyle={styles.pillsContent}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.pill, isActive && styles.pillActive]}
              onPress={() => onChange(tab.key)}>
              <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pillsScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  pillsContent: {
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: AUTH_UI.colors.surface,
    borderWidth: 1,
    borderColor: AUTH_UI.colors.border,
  },
  pillActive: {
    backgroundColor: AUTH_UI.colors.accent,
    borderColor: AUTH_UI.colors.accent,
  },
  pillText: {
    fontSize: 14,
    fontWeight: "600",
    color: AUTH_UI.colors.textSecondary,
  },
  pillTextActive: {
    color: AUTH_UI.colors.accentText,
  },
  segment: {
    flexDirection: "row",
    backgroundColor: AUTH_UI.colors.surfaceMuted,
    borderRadius: AUTH_UI.radius.lg,
    padding: 4,
  },
  segmentOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderRadius: 10,
    gap: 6,
  },
  segmentOptionActive: {
    backgroundColor: AUTH_UI.colors.accent,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "600",
    color: AUTH_UI.colors.textSecondary,
  },
  segmentTextActive: {
    color: AUTH_UI.colors.accentText,
  },
});
