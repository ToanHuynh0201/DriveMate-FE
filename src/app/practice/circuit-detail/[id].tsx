import { StepCard } from '@/components/practice';
import { ScreenHeader } from '@/components/layout';
import { AUTH_UI } from '@/constants/auth-ui';
import { practiceService } from '@/services/practice.service';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CircuitDetailScreen() {
  const { id, license } = useLocalSearchParams<{ id: string; license: string }>();
  const router = useRouter();

  const exercise = useMemo(() => practiceService.getExerciseById(id ?? ''), [id]);
  const stats = useMemo(
    () => (exercise ? practiceService.getExerciseStats(exercise) : null),
    [exercise],
  );

  if (!exercise || !stats) {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title={`Bằng ${license}`}
          subtitle="Chi tiết bài thi"
          onBack={() => router.back()}
          centered
        />
        <View style={styles.center}>
          <Text style={styles.errorText}>Không tìm thấy bài thi</Text>
        </View>
      </SafeAreaView>
    );
  }

  const correctSteps = exercise.steps.filter((s) => s.type === 'correct');
  const deductSteps = exercise.steps.filter((s) => s.type === 'deduct');
  const eliminateSteps = exercise.steps.filter((s) => s.type === 'eliminate');
  const totalSteps = exercise.steps.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={`Bằng ${license}`}
        subtitle="Chi tiết bài thi"
        onBack={() => router.back()}
        centered
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Exercise header */}
        <View style={styles.exerciseHeader}>
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>{exercise.number}</Text>
          </View>
          <View style={styles.exerciseTitleBlock}>
            <Text style={styles.exerciseName}>{exercise.number}. {exercise.name}</Text>
            <Text style={styles.exerciseCount}>{totalSteps} hướng dẫn</Text>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: AUTH_UI.colors.success }]} />
            <Text style={styles.legendText}>Cách đúng</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F3C942' }]} />
            <Text style={styles.legendText}>Trừ điểm</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: AUTH_UI.colors.danger }]} />
            <Text style={styles.legendText}>Loại</Text>
          </View>
        </View>

        {/* Correct section */}
        {correctSteps.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: AUTH_UI.colors.success }]}>
              ✓ Cách làm đúng ({correctSteps.length})
            </Text>
            {correctSteps.map((step) => (
              <StepCard key={step.id} description={step.description} type={step.type} />
            ))}
          </View>
        )}

        {/* Deduct section */}
        {deductSteps.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#F3C942' }]}>
              ⚠ Lỗi trừ điểm ({deductSteps.length})
            </Text>
            {deductSteps.map((step) => (
              <StepCard key={step.id} description={step.description} type={step.type} points={step.points} />
            ))}
          </View>
        )}

        {/* Eliminate section */}
        {eliminateSteps.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: AUTH_UI.colors.danger }]}>
              ⚠ Lỗi loại trực tiếp ({eliminateSteps.length})
            </Text>
            {eliminateSteps.map((step) => (
              <StepCard key={step.id} description={step.description} type={step.type} />
            ))}
          </View>
        )}
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
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: AUTH_UI.colors.textSecondary,
    fontSize: 15,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    marginTop: 4,
  },
  numberBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#1A3A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 18,
    fontWeight: '700',
    color: AUTH_UI.colors.success,
  },
  exerciseTitleBlock: {
    flex: 1,
    gap: 3,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '700',
    color: AUTH_UI.colors.textPrimary,
  },
  exerciseCount: {
    fontSize: 13,
    color: AUTH_UI.colors.textSecondary,
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: AUTH_UI.colors.surface,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: AUTH_UI.colors.textSecondary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
});
