import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, ExpenseCategory, ExpenseStats } from '@/types/expense';
import { DEFAULT_CATEGORIES } from '@/constants/categories';

const EXPENSES_KEY = 'expenses';
const CATEGORIES_KEY = 'categories';

export const ExpenseService = {
  // Expense operations
  async getAllExpenses(): Promise<Expense[]> {
    try {
      const data = await AsyncStorage.getItem(EXPENSES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting expenses:', error);
      return [];
    }
  },

  async addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> {
    try {
      const expenses = await this.getAllExpenses();
      const newExpense: Expense = {
        ...expense,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      expenses.unshift(newExpense);
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
      return newExpense;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw new Error('Failed to add expense');
    }
  },

  async updateExpense(id: string, updates: Partial<Expense>): Promise<void> {
    try {
      const expenses = await this.getAllExpenses();
      const index = expenses.findIndex(exp => exp.id === id);
      if (index !== -1) {
        expenses[index] = { ...expenses[index], ...updates };
        await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      throw new Error('Failed to update expense');
    }
  },

  async deleteExpense(id: string): Promise<void> {
    try {
      const expenses = await this.getAllExpenses();
      const filtered = expenses.filter(exp => exp.id !== id);
      await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw new Error('Failed to delete expense');
    }
  },

  // Category operations
  async getCategories(): Promise<ExpenseCategory[]> {
    try {
      const data = await AsyncStorage.getItem(CATEGORIES_KEY);
      return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
    } catch (error) {
      console.error('Error getting categories:', error);
      return DEFAULT_CATEGORIES;
    }
  },

  // Statistics
  async getExpenseStats(): Promise<ExpenseStats> {
    try {
      const expenses = await this.getAllExpenses();
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const monthlyExpenses = expenses.filter(exp => {
        const expenseDate = new Date(exp.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
      });

      const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const monthlyTotal = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

      const categoryTotals: { [key: string]: number } = {};
      expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
      });

      return {
        totalExpenses,
        monthlyTotal,
        categoryTotals,
        recentExpenses: expenses.slice(0, 5),
      };
    } catch (error) {
      console.error('Error getting expense stats:', error);
      return {
        totalExpenses: 0,
        monthlyTotal: 0,
        categoryTotals: {},
        recentExpenses: [],
      };
    }
  }
};