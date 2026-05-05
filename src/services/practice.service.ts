import { CIRCUIT_EXERCISES, COMMON_ERRORS } from '@/data/practice.mock';
import { CircuitExercise, CommonError, PracticeLicense } from '@/models/practice.model';

function getExercisesByLicense(license: PracticeLicense): CircuitExercise[] {
  return CIRCUIT_EXERCISES.filter((e) => e.license === license);
}

function getExerciseById(id: string): CircuitExercise | undefined {
  return CIRCUIT_EXERCISES.find((e) => e.id === id);
}

function getCommonErrors(license: PracticeLicense): CommonError[] {
  return COMMON_ERRORS.filter((e) => e.license === license);
}

function getExerciseStats(exercise: CircuitExercise) {
  return {
    correctCount: exercise.steps.filter((s) => s.type === 'correct').length,
    deductCount: exercise.steps.filter((s) => s.type === 'deduct').length,
    eliminateCount: exercise.steps.filter((s) => s.type === 'eliminate').length,
  };
}

export const practiceService = {
  getExercisesByLicense,
  getExerciseById,
  getCommonErrors,
  getExerciseStats,
};
