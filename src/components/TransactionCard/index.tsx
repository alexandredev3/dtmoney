import trashIcon from "../../assets/trash-icon.svg";
import { useAsyncLoad } from "../../hooks/useAsyncLoad";
import { useTransaction } from "../../hooks/useTransaction";
import { Cash } from "../Cash";

import { Container, Card } from "./styles";

export function TransactionCard() {
	const { transactions, deleteTransaction } = useTransaction();
  const { onFetch, isLoading } = useAsyncLoad(handleDeleteTransaction);

  async function handleDeleteTransaction(transactionId: number) {
    try {
      await deleteTransaction(transactionId);
    } catch (err) {
      console.error(err);
      alert("Algo deu errado, tente novamente...");
    }
  }

	return (
		<Container>
			{transactions.map((transaction, index) => (
				<Card
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
					<div className="card_header">
						<span className="transaction_title">{transaction.title}</span>
						<div className="button-wrapper">
							<button type="button" onClick={() => onFetch(transaction.id)} disabled={isLoading}>
								<img src={trashIcon} alt="Delete transaction" />
							</button>
						</div>
					</div>
					<span className={transaction.type}>
						Valor: {transaction.type === "withdrawn" && "-"}{" "}
						<Cash amount={transaction.amount} />
					</span>
					<span className="category">Categoria: {transaction.category}</span>
					<span className="createdAt">
						Data: {new Intl.DateTimeFormat("pt-BR").format(
							new Date(transaction.createdAt)
						)}
					</span>
				</Card>
			))}
		</Container>
	); 
}