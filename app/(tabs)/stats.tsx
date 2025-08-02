import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useExpense } from '@/hooks/useExpense';
import StatsCard from '@/components/ui/StatsCard';

export default function StatisticsScreen() {
  const { stats, categories, loading } = useExpense();

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ECDC4" />
          <Text style={styles.loadingText}>Loading statistics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  // Sort categories by spending amount
  const sortedCategoryTotals = Object.entries(stats.categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .filter(([, amount]) => amount > 0);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Statistics</Text>
          <Text style={styles.subtitle}>Your spending insights</Text>
        </View>

        <View style={styles.statsSection}>
          <StatsCard
            title="Total Expenses"
            amount={stats.totalExpenses}
            icon="account-balance-wallet"
            color="#FF6B6B"
            subtitle="All time spending"
          />
          <StatsCard
            title={`This Month (${currentMonth})`}
            amount={stats.monthlyTotal}
            icon="calendar-today"
            color="#4ECDC4"
            subtitle="Current month total"
          />
        </View>

        {sortedCategoryTotals.length > 0 && (
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>Spending by Category</Text>
            {sortedCategoryTotals.map(([categoryName, amount]) => {
              const category = categories.find(cat => cat.name === categoryName);
              const percentage = stats.totalExpenses > 0 
                ? ((amount / stats.totalExpenses) * 100).toFixed(1)
                : '0.0';
              
              return (
                <View key={categoryName} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryInfo}>
                      <View style={[styles.categoryIcon, { backgroundColor: category?.color || '#A8A8A8' }]}>
                        <MaterialIcons 
                          name={category?.icon as any || 'more-horiz'} 
                          size={20} 
                          color="white" 
                        />
                      </View>
                      <View style={styles.categoryText}>
                        <Text style={styles.categoryName}>{categoryName}</Text>
                        <Text style={styles.categoryPercentage}>{percentage}% of total</Text>
                      </View>
                    </View>
                    <Text style={styles.categoryAmount}>${amount.toFixed(2)}</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { 
                          width: `${Math.min(parseFloat(percentage), 100)}%`,
                          backgroundColor: category?.color || '#A8A8A8'
                        }
                      ]} 
                    />
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {sortedCategoryTotals.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No statistics yet</Text>
            <Text style={styles.emptyText}>
              Add some expenses to see your spending patterns and insights
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
  categorySection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  categoryItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryText: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  categoryPercentage: {
    fontSize: 14,
    color: '#666',
  },
  categoryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F1F1F1',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
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