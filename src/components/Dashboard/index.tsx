import MediaQuery from 'react-responsive';

import { Summary } from '../Summary';
import { TransactionTable } from '../TransactionTable';

import { Container } from './styles';
import { TransactionCard } from '../TransactionCard';

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <MediaQuery minWidth={900}>
        <TransactionTable />
      </MediaQuery>
      <MediaQuery maxWidth={900}>
        <TransactionCard />
      </MediaQuery>
    </Container>
  );
}