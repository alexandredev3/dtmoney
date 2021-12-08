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

    &.button-wrapper {
      > button {
        width: 0px;
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0.7rem 0.6rem;
        border: 0;
        border-radius: 4px;
        background: none;

        transition: filter 0.2s;

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`;