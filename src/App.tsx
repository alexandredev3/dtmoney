
import { useState } from 'react';
import Modal from 'react-modal'

import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';

import { TransactionProvider } from './contexts/TransactionContext';

import { GlobalStyle } from "./styles/global"

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);  
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  
  return (
    <TransactionProvider>
      <GlobalStyle />
      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
    </TransactionProvider>
  );
}