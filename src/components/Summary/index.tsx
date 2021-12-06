import { useEffect, useState } from 'react';

import { useTransaction } from '../../hooks/useTransaction';
import { TransactionType } from '../../contexts/TransactionContext';

import { IncomeIcon } from '../Icons/Income';
import { OutcomeIcon } from '../Icons/Outcome';
import { TotalIcon } from '../Icons/Total';
import { SummaryCard } from '../SummaryCard';

import { Container } from './styles';

export function Summary() {
  const { transactions, lastTransaction } = useTransaction();
  const [lastTransactionType, setLastTransactionType] = useState<TransactionType | null>(null);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const isDepositsAnimationStarted = lastTransactionType === 'deposit' && isAnimationStarted;
  const isWithdrawnAnimationStarted = lastTransactionType === 'withdrawn' && isAnimationStarted;

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdrawn += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposits: 0,
    withdrawn: 0,
    total: 0,
  });

  useEffect(() => {
    if (!lastTransaction) return;

    setLastTransactionType(lastTransaction.type);
    setIsAnimationStarted(true);

    const timer = setTimeout(() => {
      setIsAnimationStarted(false); 
    }, 800);

    return () => clearTimeout(timer);
  }, [transactions, lastTransaction]);

  return (
    <Container>
      <SummaryCard 
        theme={{
          primary: '#33CC95', 
          secondary: '#FFF', 
        }} 
        isAnimationStarted={isDepositsAnimationStarted}
        title="Entradas"
        amount={summary.deposits}
        icon={IncomeIcon}
      />
      <SummaryCard 
        theme={{ 
          primary: '#E62E4D', 
          secondary: '#FFF', 
        }} 
        isAnimationStarted={isWithdrawnAnimationStarted}
        title="Saidas"
        amount={summary.withdrawn}
        icon={OutcomeIcon}
      />
      <SummaryCard 
        theme={{ 
          primary: '#FFF', 
          secondary: '#33CC95',
        }} 
        title="Total"
        amount={summary.total}
        icon={TotalIcon}
        style={{
          color: '#FFF'
        }}
      />
    </Container>
  );
}