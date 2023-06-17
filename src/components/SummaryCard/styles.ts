import { motion } from 'framer-motion';
import styled from "styled-components";

export const Container = styled(motion.div)`
  background: var(--shape);
  padding: 1.5rem 2rem;
  border-radius: 0.25rem;
  color: var(--tex-title);

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > strong {
    // set display as inline-block to margin top works.
    display: inline-block;
    margin-top: 1rem;
    font-size: 2rem;
    font-weight: 500;
    line-height: 3rem;
  }

  &.highlight-background {
    background: var(--green);
    color: #FFF;
  }

  @media (max-width: 900px) {
    padding: 1rem 1.5rem;

    > strong {
      margin-top: 0.2rem;
    }
  }
`;