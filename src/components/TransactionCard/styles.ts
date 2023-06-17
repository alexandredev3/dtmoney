import styled from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';

type CardProps = {
    isLoading: boolean;
}

export const Container = styled.div`
    margin-top: 2rem;
`;

export const Card = styled(motion.div)<CardProps>`
    display: flex;
    flex-direction: column;

    padding: 1rem 2rem;
    border: 0;
    background: var(--shape);
    color: ${(props) => props.isLoading ? transparentize(0.4, '#969CB3') : '#969CB3'};
    border-radius: 0.25rem;

    & + & {
        margin-top: 1rem;
    }

    cursor: ${(props) => props.isLoading ? 'not-allowed' : 'default'};

    &:first-child {
      color: ${(props) => props.isLoading ? transparentize(0.4, '#363F5F') : '#363F5F'}
    }

    .deposit {
      color: ${(props) => props.isLoading ? transparentize(0.4, '#33CC95') : '#33CC95'}
    }

    .withdrawn {
      color: ${(props) => props.isLoading ? transparentize(0.4, '#E62E4D') : '#E62E4D'}
    }

    .button-wrapper {
        display: inline-block;

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

    .card_header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .transaction_title {
            font-size: 1.2rem;
        }
    }
`;