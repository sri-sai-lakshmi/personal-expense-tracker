import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Platform,
  Alert,
  Modal,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpense } from '@/hooks/useExpense';
import ExpenseCard from '@/components/ui/ExpenseCard';

export default function ExpensesScreen() {
  const { expenses, categories, deleteExpense, loading } = useExpense();
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Web alert state
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onOk?: () => void;
    onCancel?: () => void;
    showCancel?: boolean;
  }>({ visible: false, title: '', message: '' });

  const showWebAlert = (title: string, message: string, onOk?: () => void, onCancel?: () => void) => {
    if (Platform.OS === 'web') {
      setAlertConfig({ 
        visible: true, 
        title, 
        message, 
        onOk, 
        onCancel,
        showCancel: !!onCancel
      });
    } else {
      const buttons = onCancel ? [
        { text: 'Cancel', onPress: onCancel },
        { text: 'Delete', onPress: onOk, style: 'destructive' as const }
      ] : [{ text: 'OK', onPress: onOk }];
      
      Alert.alert(title, message, buttons);
    }
  };

  const handleDeleteExpense = (expenseId: string, description: string) => {
    showWebAlert(
      'Delete Expense',
      `Are you sure you want to delete "${description}"? This action can not be undone.`,
      async () => {
        try {
          setDeleteLoading(expenseId);
          await deleteExpense(expenseId);
          showWebAlert('Deleted', 'Expense has been successfully deleted.');
        } catch (error) {
          console.error('Error deleting expense:', error);
          showWebAlert('Error', 'Failed to delete expense. Please try again.');
        } finally {
          setDeleteLoading(null);
        }
      },
      () => {
        // Cancel - do nothing
      }
    );
  };

  const renderExpenseItem = ({ item }: { item: any }) => {
    const category = categories.find(cat => cat.name === item.category);
    const isDeleting = deleteLoading === item.id;

    return (
      <View style={isDeleting ? styles.deletingItem : undefined}>
        <ExpenseCard
          expense={item}
          category={category}
          onDelete={isDeleting ? undefined : () => handleDeleteExpense(item.id, item.description)}
        />
        {isDeleting && (
          <View style={styles.deletingOverlay}>
            <ActivityIndicator size="small" color="#FF6B6B" />
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ECDC4" />
          <Text style={styles.loadingText}>Loading expenses...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Expenses</Text>
        <Text style={styles.subtitle}>
          {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'} recorded
        </Text>
      </View>

      {expenses.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No expenses yet</Text>
          <Text style={styles.emptyText}>
            Your expense list will appear here once you start adding them
          </Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Web Alert Modal */}
      {Platform.OS === 'web' && (
        <Modal visible={alertConfig.visible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.alertContainer}>
              <Text style={styles.alertTitle}>{alertConfig.title}</Text>
              <Text style={styles.alertMessage}>{alertConfig.message}</Text>
              <View style={styles.alertButtonsContainer}>
                {alertConfig.showCancel && (
                  <TouchableOpacity 
                    style={[styles.alertButton, styles.cancelButton]}
                    onPress={() => {
                      alertConfig.onCancel?.();
                      setAlertConfig(prev => ({ ...prev, visible: false }));
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={[styles.alertButton, styles.confirmButton]}
                  onPress={() => {
                    alertConfig.onOk?.();
                    setAlertConfig(prev => ({ ...prev, visible: false }));
                  }}
                >
                  <Text style={styles.confirmButtonText}>
                    {alertConfig.showCancel ? 'Delete' : 'OK'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  listContainer: {
    paddingBottom: 20,
  },
  deletingItem: {
    position: 'relative',
  },
  deletingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    minWidth: 280,
    maxWidth: 340,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    lineHeight: 22,
  },
  alertButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  alertButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F1F1F1',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});