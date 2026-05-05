import { AUTH_UI } from "@/constants/auth-ui";
import { HistoryQuestionState } from "@/models/history.model";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface QuestionStatusCellProps {
	state: HistoryQuestionState;
	index: number;
}

export function QuestionStatusCell({ state, index }: QuestionStatusCellProps) {
	const isCorrect = state === "correct";
	const isWrong = state === "wrong";

	const iconColor = isCorrect
		? AUTH_UI.colors.success
		: isWrong
			? AUTH_UI.colors.danger
			: AUTH_UI.colors.textSecondary;

	return (
		<View
			style={[
				styles.cell,
				isCorrect && styles.cellCorrect,
				isWrong && styles.cellWrong,
				state === "skipped" && styles.cellSkipped,
			]}>
			<Text style={[styles.number, { color: iconColor }]}>{index}</Text>
			<Ionicons
				name={isCorrect ? "checkmark" : isWrong ? "close" : "remove"}
				size={16}
				color={iconColor}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	cell: {
		width: 54,
		height: 60,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		gap: 2,
	},
	cellCorrect: {
		backgroundColor: "#004C2F",
		borderColor: "#0B6E45",
	},
	cellWrong: {
		backgroundColor: "#4A1212",
		borderColor: "#812020",
	},
	cellSkipped: {
		backgroundColor: AUTH_UI.colors.surfaceMuted,
		borderColor: AUTH_UI.colors.border,
	},
	number: {
		fontSize: 11,
		fontWeight: "700",
		opacity: 0.85,
	},
});
