import styled from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';

type ContainerProps = {
  isLoading: boolean;
}

export const Container = styled(motion.tr)<ContainerProps>`
  td {
    padding: 1rem 2rem;
    border: 0;
    background: var(--shape);
    color: ${(props) => props.isLoading ? transparentize(0.4, '#969CB3') : '#969CB3'};
    border-radius: 0.25rem;

    cursor: ${(props) => props.isLoading ? 'not-allowed' : 'default'};

    &:first-child {
      color: ${(props) => props.isLoading ? transparentize(0.4, '#363F5F') : '#363F5F'}
    }

    &.deposit {
      color: ${(props) => props.isLoading ? transparentize(0.4, '#33CC95') : '#33CC95'}
    }

    &.withdrawn {
      color: ${(props) => props.isLoading ? transparentize(0.4, '#E62E4D') : '#E62E4D'}
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