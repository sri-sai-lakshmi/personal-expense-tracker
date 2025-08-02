import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpense } from '@/hooks/useExpense';
import StatsCard from '@/components/ui/StatsCard';
import ExpenseCard from '@/components/ui/ExpenseCard';

export default function DashboardScreen() {
  const { stats, categories, loading } = useExpense();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ECDC4" />
          <Text style={styles.loadingText}>Loading your expenses...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Track your spending effortlessly</Text>
        </View>

        <View style={styles.statsSection}>
          <StatsCard
            title={`This Month (${currentMonth})`}
            amount={stats.monthlyTotal}
            icon="calendar-today"
            color="#4ECDC4"
            subtitle="Current month spending"
          />
          <StatsCard
            title="Total Expenses"
            amount={stats.totalExpenses}
            icon="account-balance-wallet"
            color="#FF6B6B"
            subtitle="All time total"
          />
        </View>

        {stats.recentExpenses.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            {stats.recentExpenses.map((expense) => {
              const category = categories.find(cat => cat.name === expense.category);
              return (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  category={category}
                />
              );
            })}
          </View>
        )}

        {stats.recentExpenses.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No expenses yet</Text>
            <Text style={styles.emptyText}>
              Start tracking by adding your first expense in the Add tab
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});