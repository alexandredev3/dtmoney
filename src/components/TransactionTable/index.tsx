import { AnimatePresence } from "framer-motion";

import { TransactionItem } from '../TransactionItem';

import { useTransaction } from '../../hooks/useTransaction';

import { Container } from './styles';

export function TransactionTable() {
  const { transactions } = useTransaction();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {transactions.map((transaction, index) => (
              <TransactionItem 
                key={transaction.id}
                transaction={transaction}
                index={index}
              />
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </Container>
  );
}