import { Button } from "@/components/common/Button";
import { StatBox } from "@/components/common/StatBox";
import { QuestionStatusCell } from "@/components/history";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { AUTH_UI } from "@/constants/auth-ui";
import { historyService } from "@/services/history.service";
import { formatDateTime, formatDuration } from "@/utils/examFormat";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const attempt = useMemo(
		() => historyService.getAttemptById(id ?? ""),
		[id],
	);

	if (!attempt) {
		return (
			<SafeAreaView style={styles.container}>
				<ScreenHeader title="Chi Tiết Bài Thi" onBack={() => router.back()} />
				<View style={styles.notFoundWrap}>
					<Text style={styles.notFoundText}>
						Không tìm thấy dữ liệu lịch sử cho bài thi này.
					</Text>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader
				title="Chi Tiết Bài Thi"
				subtitle={formatDateTime(attempt.takenAt)}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}>
				<View
					style={[
						styles.heroCard,
						attempt.passed ? styles.heroCardPass : styles.heroCardFail,
					]}>
					<View style={styles.heroLeft}>
						<Text style={styles.heroTitle}>{attempt.title}</Text>
						<Text style={styles.heroSubtitle}>
							{attempt.passed ? "✓ Đạt yêu cầu" : "✕ Chưa đạt yêu cầu"}
						</Text>
					</View>
					<View style={styles.heroRight}>
						<Text
							style={[
								styles.heroScore,
								attempt.passed ? styles.heroScorePass : styles.heroScoreFail,
							]}>
							{attempt.score}
						</Text>
						<Text style={styles.heroTotal}>/{attempt.totalQuestions} câu</Text>
					</View>
				</View>

				<View style={styles.statsRow}>
					<StatBox
						value={attempt.score}
						label="Đúng"
						bg="#004626"
						valueColor={AUTH_UI.colors.success}
						labelColor={AUTH_UI.colors.success}
					/>
					<StatBox
						value={attempt.wrongCount}
						label="Sai"
						bg="#521616"
						valueColor={AUTH_UI.colors.danger}
						labelColor={AUTH_UI.colors.danger}
					/>
					<StatBox
						value={formatDuration(attempt.durationSeconds)}
						label="Thời gian"
						bg="#564400"
						valueColor={AUTH_UI.colors.accent}
						labelColor={AUTH_UI.colors.accent}
					/>
				</View>

				<View style={styles.questionSection}>
					<Text style={styles.questionSectionTitle}>Danh sách câu hỏi</Text>
					<View style={styles.questionGrid}>
						{attempt.questionStates.map((state, index) => (
							<QuestionStatusCell
								key={`${attempt.id}-${index}`}
								state={state}
								index={index + 1}
							/>
						))}
					</View>
				</View>

				<Button
					variant="secondary"
					label="Xem câu sai"
					icon="eye-outline"
					disabled={attempt.wrongCount <= 0}
					style={styles.reviewButton}
					onPress={() =>
						(router.push as any)({
							pathname: "/exam-session/review/[id]",
							params: {
								id: attempt.examId,
								answersJson: JSON.stringify(attempt.answersByQuestionIndex),
							},
						})
					}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AUTH_UI.colors.background,
	},
	content: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 40,
		gap: 12,
	},
	heroCard: {
		borderRadius: 18,
		borderWidth: 1,
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	heroCardPass: {
		backgroundColor: "#004C2F",
		borderColor: "#0E8250",
	},
	heroCardFail: {
		backgroundColor: "#4A1212",
		borderColor: "#812020",
	},
	heroLeft: {
		flex: 1,
		gap: 4,
	},
	heroTitle: {
		fontSize: 15,
		fontWeight: "800",
		color: AUTH_UI.colors.textPrimary,
	},
	heroSubtitle: {
		fontSize: 14,
		fontWeight: "600",
		color: AUTH_UI.colors.textPrimary,
		opacity: 0.85,
	},
	heroRight: {
		alignItems: "flex-end",
	},
	heroScore: {
		fontSize: 24,
		fontWeight: "900",
	},
	heroScorePass: {
		color: "#5DF39F",
	},
	heroScoreFail: {
		color: "#FF8F8F",
	},
	heroTotal: {
		fontSize: 16,
		fontWeight: "700",
		color: AUTH_UI.colors.textPrimary,
	},
	statsRow: {
		flexDirection: "row",
		gap: 8,
	},
	questionSection: {
		gap: 12,
		marginTop: 4,
	},
	questionSectionTitle: {
		fontSize: 15,
		fontWeight: "800",
		color: AUTH_UI.colors.textPrimary,
	},
	questionGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	reviewButton: {
		height: 54,
		marginTop: 4,
	},
	notFoundWrap: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	notFoundText: {
		color: AUTH_UI.colors.textSecondary,
		fontSize: 15,
		textAlign: "center",
	},
});
