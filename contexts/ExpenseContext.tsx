import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { Expense, ExpenseCategory, ExpenseStats } from '@/types/expense';
import { ExpenseService } from '@/services/expenseService';

interface ExpenseContextType {
  expenses: Expense[];
  categories: ExpenseCategory[];
  stats: ExpenseStats;
  loading: boolean;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => Promise<void>;
  updateExpense: (id: string, updates: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [stats, setStats] = useState<ExpenseStats>({
    totalExpenses: 0,
    monthlyTotal: 0,
    categoryTotals: {},
    recentExpenses: [],
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expensesData, categoriesData, statsData] = await Promise.all([
        ExpenseService.getAllExpenses(),
        ExpenseService.getCategories(),
        ExpenseService.getExpenseStats(),
      ]);
      
      setExpenses(expensesData);
      setCategories(categoriesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading expense data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    try {
      await ExpenseService.addExpense(expenseData);
      await refreshData();
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    try {
      await ExpenseService.updateExpense(id, updates);
      await refreshData();
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await ExpenseService.deleteExpense(id);
      await refreshData();
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  const value: ExpenseContextType = {
    expenses,
    categories,
    stats,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
    refreshData,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}