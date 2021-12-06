import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.tr)`
  td {
    padding: 1rem 2rem;
    border: 0;
    background: var(--shape);
    color: var(--text-body);
    border-radius: 0.25rem;

    &:first-child {
      color: var(--text-title);
    }

    &.deposit {
      color: var(--green);
    }

    &.withdrawn {
      color: var(--red);
    }
  }
`;