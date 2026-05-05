import { AUTH_UI } from '@/constants/auth-ui';
import { CircuitExercise } from '@/models/practice.model';
import { practiceService } from '@/services/practice.service';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ExerciseListItemProps {
  exercise: CircuitExercise;
  onPress: () => void;
}

export function ExerciseListItem({ exercise, onPress }: ExerciseListItemProps) {
  const { correctCount, deductCount, eliminateCount } = practiceService.getExerciseStats(exercise);

  const subtitle = [
    correctCount > 0 ? `${correctCount} cách đúng` : null,
    deductCount > 0 ? `${deductCount} lỗi trừ điểm` : null,
    eliminateCount > 0 ? `${eliminateCount} lỗi loại` : null,
  ]
    .filter(Boolean)
    .join(' • ');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{exercise.number}</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.name}>{exercise.number}. {exercise.name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={AUTH_UI.colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AUTH_UI.colors.surface,
    borderRadius: AUTH_UI.radius.lg,
    padding: 14,
    gap: 12,
    marginBottom: 8,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#1A3A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 15,
    fontWeight: '700',
    color: AUTH_UI.colors.success,
  },
  textBlock: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: AUTH_UI.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: AUTH_UI.colors.textSecondary,
  },
});
