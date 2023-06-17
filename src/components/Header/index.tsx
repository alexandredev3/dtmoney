import MediaQuery from 'react-responsive';

import logoImg from '../../assets/logo.svg';

import { Container, Content } from './styles';

type HeaderProps = {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <MediaQuery minWidth={900}>
          <button onClick={onOpenNewTransactionModal}>
            Nova transação
          </button>
        </MediaQuery>
        <MediaQuery maxWidth={900}>
          <button onClick={onOpenNewTransactionModal} className="new_transaction_mobile_button">
            +
          </button>
        </MediaQuery>
      </Content>
    </Container>
  );
}