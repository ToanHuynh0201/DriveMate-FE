import { EmptyState } from "@/components/common/EmptyState";
import { OptionCard } from "@/components/exam/OptionCard";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { AUTH_UI } from "@/constants/auth-ui";
import { MOCK_EXAMS } from "@/data/exams.mock";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type WrongItem = {
	questionIndex: number;
	userAnswer: number;
	correctAnswer: number;
	questionText: string;
	options: string[];
	explanation?: string;
};

function WrongQuestionCard({ item, number }: { item: WrongItem; number: number }) {
	const optionLabels = ["A", "B", "C", "D"];

	return (
		<View style={styles.card}>
			<View style={styles.cardHeader}>
				<View style={styles.cardHeaderLeft}>
					<View style={styles.wrongNumBadge}>
						<Text style={styles.wrongNumText}>{number}</Text>
					</View>
					<Text style={styles.wrongLabel}>Trả lời sai</Text>
				</View>
				<Ionicons name="close-circle" size={20} color={AUTH_UI.colors.danger} />
			</View>

			<Text style={styles.questionText}>{item.questionText}</Text>

			<View style={styles.optionsList}>
				{item.options.map((opt, i) => {
					const isCorrect = i === item.correctAnswer;
					const isUserWrong = i === item.userAnswer;

					let state: "correct" | "wrong" | "dimmed" = "dimmed";
					if (isCorrect) state = "correct";
					else if (isUserWrong) state = "wrong";

					return (
						<OptionCard
							key={i}
							letter={optionLabels[i]}
							text={opt}
							state={state}
							trailingIcon={
								isCorrect
									? "checkmark-circle"
									: isUserWrong
									? "close-circle"
									: undefined
							}
							trailingIconColor={
								isCorrect ? AUTH_UI.colors.success : AUTH_UI.colors.danger
							}
						/>
					);
				})}
			</View>

			<View style={styles.explanationBox}>
				<Text style={styles.explanationBulb}>💡</Text>
				<Text style={styles.explanationText}>
					Bạn chọn{" "}
					<Text style={styles.highlightWrong}>
						{optionLabels[item.userAnswer]} — {item.options[item.userAnswer]}
					</Text>
					. Đáp án đúng là{" "}
					<Text style={styles.highlightCorrect}>
						{optionLabels[item.correctAnswer]} — {item.options[item.correctAnswer]}
					</Text>
					.{item.explanation ? ` ${item.explanation}` : ""}
				</Text>
			</View>
		</View>
	);
}

export default function ExamReviewScreen() {
	const { id, answersJson } = useLocalSearchParams<{ id: string; answersJson: string }>();
	const router = useRouter();
	const answers: Record<number, number> = JSON.parse(answersJson ?? "{}");

	const exam = MOCK_EXAMS.find((e) => e.id === id);

	if (!exam) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.errorCenter}>
					<Text style={styles.errorText}>Không tìm thấy đề thi</Text>
					<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
						<Text style={styles.backButtonText}>Quay lại</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	const wrongItems: WrongItem[] = exam.questions.reduce<WrongItem[]>((acc, q, idx) => {
		const userAnswer = answers[idx];
		if (userAnswer !== undefined && userAnswer !== q.correctAnswerIndex) {
			acc.push({
				questionIndex: idx,
				userAnswer,
				correctAnswer: q.correctAnswerIndex,
				questionText: q.questionText,
				options: q.options,
				explanation: q.explanation,
			});
		}
		return acc;
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScreenHeader
				title="Câu Sai"
				subtitle={`${wrongItems.length} câu cần ôn lại`}
				onBack={() => router.back()}
				bordered
			/>

			{wrongItems.length === 0 ? (
				<EmptyState
					icon="checkmark-circle-outline"
					title="Không có câu sai!"
				/>
			) : (
				<FlatList
					data={wrongItems}
					keyExtractor={(item) => String(item.questionIndex)}
					renderItem={({ item, index }) => (
						<WrongQuestionCard item={item} number={index + 1} />
					)}
					contentContainerStyle={styles.listContent}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AUTH_UI.colors.background,
	},
	listContent: {
		padding: 16,
		gap: 14,
		paddingBottom: 40,
	},
	card: {
		backgroundColor: AUTH_UI.colors.surface,
		borderRadius: AUTH_UI.radius.xl,
		padding: 16,
		gap: 12,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	cardHeaderLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	wrongNumBadge: {
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: "rgba(248,113,113,0.15)",
		borderWidth: 1,
		borderColor: "rgba(248,113,113,0.3)",
		alignItems: "center",
		justifyContent: "center",
	},
	wrongNumText: {
		fontSize: 13,
		fontWeight: "700",
		color: AUTH_UI.colors.danger,
	},
	wrongLabel: {
		fontSize: 13,
		fontWeight: "600",
		color: AUTH_UI.colors.danger,
	},
	questionText: {
		fontSize: 14,
		fontWeight: "600",
		color: AUTH_UI.colors.textPrimary,
		lineHeight: 22,
	},
	optionsList: {
		gap: 8,
	},
	explanationBox: {
		flexDirection: "row",
		gap: 8,
		backgroundColor: AUTH_UI.colors.surfaceMuted,
		borderRadius: AUTH_UI.radius.lg,
		padding: 12,
	},
	explanationBulb: {
		fontSize: 14,
		marginTop: 1,
	},
	explanationText: {
		flex: 1,
		fontSize: 13,
		color: AUTH_UI.colors.textSecondary,
		lineHeight: 20,
	},
	highlightWrong: {
		color: AUTH_UI.colors.danger,
		fontWeight: "600",
	},
	highlightCorrect: {
		color: AUTH_UI.colors.success,
		fontWeight: "600",
	},
	errorCenter: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},
	errorText: {
		fontSize: 16,
		color: AUTH_UI.colors.textSecondary,
	},
	backButton: {
		paddingHorizontal: 24,
		paddingVertical: 10,
		backgroundColor: AUTH_UI.colors.surface,
		borderRadius: AUTH_UI.radius.lg,
		borderWidth: 1,
		borderColor: AUTH_UI.colors.border,
	},
	backButtonText: {
		fontSize: 14,
		fontWeight: "600",
		color: AUTH_UI.colors.textPrimary,
	},
});
