export type HistoryFilterStatus = "all" | "passed" | "failed";

export type HistoryQuestionState = "correct" | "wrong" | "skipped";

export interface ExamHistoryAttempt {
	id: string;
	examId: string;
	title: string;
	takenAt: string;
	durationSeconds: number;
	score: number;
	totalQuestions: number;
	passed: boolean;
	wrongCount: number;
	skippedCount: number;
	questionStates: HistoryQuestionState[];
	answersByQuestionIndex: Record<number, number>;
}

export interface ExamHistoryStats {
	total: number;
	passed: number;
	failed: number;
}

export interface GetExamHistoryParams {
	status?: HistoryFilterStatus;
	searchText?: string;
}

export interface GetExamHistoryResult {
	items: ExamHistoryAttempt[];
	stats: ExamHistoryStats;
}
