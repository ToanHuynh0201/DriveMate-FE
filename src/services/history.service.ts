import { MOCK_EXAM_HISTORY } from "@/data/history.mock";
import {
	ExamHistoryAttempt,
	GetExamHistoryParams,
	GetExamHistoryResult,
	HistoryFilterStatus,
} from "@/models/history.model";

const sortByTakenAtDesc = (a: ExamHistoryAttempt, b: ExamHistoryAttempt) =>
	new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime();

const matchStatus = (item: ExamHistoryAttempt, status: HistoryFilterStatus) => {
	if (status === "all") return true;
	if (status === "passed") return item.passed;
	return !item.passed;
};

export const historyService = {
	getHistory: ({
		status = "all",
		searchText = "",
	}: GetExamHistoryParams = {}): GetExamHistoryResult => {
		const normalizedSearch = searchText.trim().toLowerCase();

		const items = MOCK_EXAM_HISTORY.filter((item) =>
			matchStatus(item, status),
		)
			.filter((item) =>
				normalizedSearch.length === 0
					? true
					: item.title.toLowerCase().includes(normalizedSearch),
			)
			.sort(sortByTakenAtDesc);

		return {
			items,
			stats: {
				total: MOCK_EXAM_HISTORY.length,
				passed: MOCK_EXAM_HISTORY.filter((item) => item.passed).length,
				failed: MOCK_EXAM_HISTORY.filter((item) => !item.passed).length,
			},
		};
	},

	getAttemptById: (attemptId: string) =>
		MOCK_EXAM_HISTORY.find((item) => item.id === attemptId),
};
