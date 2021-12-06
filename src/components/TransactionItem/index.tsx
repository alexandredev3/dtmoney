import type { Transaction } from '../../contexts/TransactionContext';

import { Cash } from "../Cash";

import { Container } from "./styles";

type TransactionItemProps = {
  transaction: Transaction;
  index: number;
}

export function TransactionItem({ transaction, index }: TransactionItemProps) {
  return (
    <Container
      initial={{
        translateY: -20,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.3,
      }}
    >
      <td>{transaction.title}</td>
      <td className={transaction.type}>
        {transaction.type === "withdrawn" && "-"}{" "}
        <Cash amount={transaction.amount} />
      </td>
      <td>{transaction.category}</td>
      <td>
        {new Intl.DateTimeFormat("pt-BR").format(
          new Date(transaction.createdAt)
        )}
      </td>
    </Container>
  );
}
