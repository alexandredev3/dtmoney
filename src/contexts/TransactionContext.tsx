import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/api';

interface TransactionProviderProps {
  children: ReactNode;
}

export type TransactionType = 'deposit' | 'withdrawn';

export type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'createdAt' | 'id'>;

interface TransactionContext {
  transactions: Transaction[];
  lastTransaction: Transaction | null;
  createNewTransaction: (transactionInput: TransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<TransactionContext>(
  {} as TransactionContext
);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    api.get('/transactions')
      .then((response) => setTransactions(response.data.transactions))
  }, []);

  async function createNewTransaction(transactionInput: TransactionInput) {
    try {
      const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date()
      });
  
      const { transaction } = response.data;
  
      setTransactions(oldState => [...oldState, transaction]);
      setLastTransaction(transaction);
    } catch(err) {
      console.error(err);
      throw new Error('Something went wrong');
    }
  }

  return (
    <TransactionContext.Provider value={{
      transactions,
      lastTransaction,
      createNewTransaction,
    }}>
      {children}
    </TransactionContext.Provider>
  );
}