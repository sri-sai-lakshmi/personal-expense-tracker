export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ExpenseStats {
  totalExpenses: number;
  monthlyTotal: number;
  categoryTotals: { [key: string]: number };
  recentExpenses: Expense[];
}