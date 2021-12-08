import type { Transaction } from "../../contexts/TransactionContext";
import { useTransaction } from "../../hooks/useTransaction";
import { useAsyncLoad } from '../../hooks/useAsyncLoad';

import trashIcon from "../../assets/trash-icon.svg";

import { Cash } from "../Cash";

import { Container } from "./styles";

type TransactionItemProps = {
  transaction: Transaction;
  index: number;
};

export function TransactionItem({ transaction, index }: TransactionItemProps) {
  const { deleteTransaction } = useTransaction();
  const { onFetch, isLoading } = useAsyncLoad(handleDeleteTransaction);

  async function handleDeleteTransaction() {
    try {
      await deleteTransaction(transaction.id);
    } catch (err) {
      console.error(err);
      alert("Algo deu errado, tente novamente...");
    }
  }

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
      exit={{
        opacity: 0,
        translateY: -20,
      }}
      isLoading={isLoading}
    >
      <td>{transaction.title}</td>
      <td className={transaction.type}>
        {transaction.type === "withdrawn" && "-"}{" "}
        <Cash amount={transaction.amount} />
      </td>
      <td className="category">{transaction.category}</td>
      <td className="createdAt">
        {new Intl.DateTimeFormat("pt-BR").format(
          new Date(transaction.createdAt)
        )}
      </td>
      <td className="button-wrapper">
        <button type="button" onClick={onFetch} disabled={isLoading}>
          <img src={trashIcon} alt="Delete transaction" />
        </button>
      </td>
    </Container>
  );
}
