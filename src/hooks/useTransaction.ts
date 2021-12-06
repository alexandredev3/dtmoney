import { useContext } from 'react';

import { TransactionContext } from '../contexts/TransactionContext';

export function useTransaction() {
  const context = useContext(TransactionContext);

  if (context === undefined) {
    throw new Error('useTransaction must be used within an TransactionProvider');
  }

  return context;
}