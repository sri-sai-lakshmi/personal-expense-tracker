import { useContext } from 'react';
import { ExpenseContext } from '@/contexts/ExpenseContext';

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider');
  }
  return context;
}