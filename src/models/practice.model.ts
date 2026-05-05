export type PracticeLicense = 'B1' | 'B2' | 'C';
export type StepType = 'correct' | 'deduct' | 'eliminate';
export type PracticeCardType = 'circuit' | 'errors';

export interface ExerciseStep {
  id: string;
  type: StepType;
  description: string;
  points?: number;
}

export interface CircuitExercise {
  id: string;
  license: PracticeLicense;
  number: number;
  name: string;
  steps: ExerciseStep[];
}

export interface CommonError {
  id: string;
  license: PracticeLicense;
  type: 'deduct' | 'eliminate';
  description: string;
  points?: number;
}
