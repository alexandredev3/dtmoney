import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";

import { useTransaction } from "../../hooks/useTransaction";
import { useAsyncLoad } from "../../hooks/useAsyncLoad";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { opacify } from "polished";

type NewTransactionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"deposit" | "withdrawn">("deposit");

  const { createNewTransaction } = useTransaction();
  const { isLoading, onFetch } = useAsyncLoad<FormEvent>(
    handleCreateNewTransaction
  );

  const isDataValid = !!title && !!amount && !!category;

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    if (!isDataValid) {
      return;
    }

    const data = {
      title,
      amount,
      category,
      type,
    };

    try {
      await createNewTransaction(data);
    } catch (err) {
      alert("Algo deu errado, tente novamente...");
    } finally {
      setTitle("");
      setAmount(0);
      setCategory("");
      setType("deposit");
      onRequestClose();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      overlayElement={(props: any, children) => (
        <AnimatePresence>
          <motion.div
            {...props}
            variants={{
              visible: {
                opacity: 1,
              },
              hidden: {
                opacity: 0,
              },
            }}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
      contentElement={(props: any, children) => {
        return (
          <AnimatePresence>
            <motion.div
              {...props}
              variants={{
                visible: {
                  translateY: 0,
                },
                hidden: {
                  translateY: 80,
                },
              }}
              initial="hidden"
              animate="visible"
              exit={{
                translateY: 80,
                opacity: 0,
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        )
      }}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container
        onSubmit={(event) => {
          onFetch(event);
        }}
      >
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType("withdrawn")}
            isActive={type === "withdrawn"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categorias"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit" disabled={isLoading || !isDataValid}>
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </Container>
    </Modal>
  );
}
