import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ExpenseProvider } from '@/contexts/ExpenseContext';

export default function RootLayout() {
  return (
    <ExpenseProvider>
      <StatusBar style="dark" backgroundColor="#F8F9FA" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ExpenseProvider>
  );
}