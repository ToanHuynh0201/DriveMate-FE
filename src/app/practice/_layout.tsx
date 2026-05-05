import { Stack } from 'expo-router';

export default function PracticeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="circuit/[license]" />
      <Stack.Screen name="circuit-detail/[id]" />
      <Stack.Screen name="errors/[license]" />
    </Stack>
  );
}
