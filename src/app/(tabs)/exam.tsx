import { ScreenWrapper } from "@/components/screen-wrapper";
import { EmptyState } from "@/components/common/EmptyState";
import { InputField } from "@/components/common/InputField";
import { FilterTabs, TabItem } from "@/components/layout/FilterTabs";
import { ExamCard } from "@/components/exam/ExamCard";
import { AUTH_UI } from "@/constants/auth-ui";
import { MOCK_EXAMS } from "@/data/exams.mock";
import { ExamType, LicenseClass } from "@/models/exam.model";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const LICENSE_TABS: TabItem[] = [
  { key: "B1", label: "B1" },
  { key: "B2", label: "B2" },
  { key: "A1", label: "A1" },
  { key: "A2", label: "A2" },
  { key: "C", label: "C" },
];

const TYPE_TABS: TabItem[] = [
  { key: "on-tap", label: "Ôn tập", icon: "book-outline" },
  { key: "sat-hach", label: "Sát hạch", icon: "trophy-outline" },
];

export default function ExamScreen() {
  const router = useRouter();
  const [activeClass, setActiveClass] = useState<LicenseClass>("B1");
  const [activeType, setActiveType] = useState<ExamType>("on-tap");
  const [searchText, setSearchText] = useState("");

  const filteredExams = useMemo(
    () =>
      MOCK_EXAMS.filter(
        (e) =>
          e.licenseClass === activeClass &&
          e.examType === activeType &&
          e.name.toLowerCase().includes(searchText.toLowerCase().trim()),
      ),
    [activeClass, activeType, searchText],
  );

  return (
    <ScreenWrapper backgroundColor={AUTH_UI.colors.background} edges={["top"]} scroll={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Đề Thi Lý Thuyết</Text>
          <Text style={styles.headerSub}>Chọn hạng bằng và loại đề để bắt đầu</Text>
        </View>

        <InputField
          leftIcon="search-outline"
          rightIcon={searchText.length > 0 ? "close-circle" : undefined}
          onRightPress={() => setSearchText("")}
          placeholder="Tìm kiếm đề thi..."
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          containerStyle={styles.searchContainer}
        />

        <FilterTabs
          tabs={LICENSE_TABS}
          activeKey={activeClass}
          onChange={(k) => setActiveClass(k as LicenseClass)}
          variant="pills"
          style={styles.classTabs}
        />

        <FilterTabs
          tabs={TYPE_TABS}
          activeKey={activeType}
          onChange={(k) => setActiveType(k as ExamType)}
          variant="segment"
          style={styles.typeToggle}
        />

        {activeType === "on-tap" ? (
          <View style={styles.bannerOnTap}>
            <Ionicons name="book-outline" size={18} color={AUTH_UI.colors.accent} />
            <Text style={styles.bannerText}>
              Không giới hạn lần làm. Xem đáp án ngay sau mỗi câu.
            </Text>
          </View>
        ) : (
          <View style={styles.bannerSatHach}>
            <Ionicons name="trophy-outline" size={18} color="#A78BFA" />
            <Text style={[styles.bannerText, styles.bannerTextPurple]}>
              Mô phỏng sát hạch thực tế. Có câu điểm liệt. Thời gian giới hạn.
            </Text>
          </View>
        )}

        <FlatList
          data={filteredExams}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExamCard
              exam={item}
              activeType={activeType}
              onStart={() => router.push(`/exam-session/take/${item.id}` as never)}
              onPreview={() => router.push(`/exam-session/preview/${item.id}` as never)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          ListEmptyComponent={
            <EmptyState
              icon="search-outline"
              title="Không tìm thấy đề thi phù hợp"
              style={styles.emptyState}
            />
          }
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: AUTH_UI.colors.textPrimary,
  },
  headerSub: {
    fontSize: 13,
    color: AUTH_UI.colors.textSecondary,
    marginTop: 3,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  classTabs: {
    marginBottom: 12,
  },
  typeToggle: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  bannerOnTap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#2D2A0F",
    borderWidth: 1,
    borderColor: "#4A3F10",
    borderRadius: AUTH_UI.radius.lg,
    padding: 12,
    gap: 10,
  },
  bannerSatHach: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#1A1040",
    borderWidth: 1,
    borderColor: "#2D1F6B",
    borderRadius: AUTH_UI.radius.lg,
    padding: 12,
    gap: 10,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    color: AUTH_UI.colors.textSecondary,
    lineHeight: 19,
  },
  bannerTextPurple: { color: "#C4B5FD" },
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  emptyState: { paddingTop: 60 },
});
