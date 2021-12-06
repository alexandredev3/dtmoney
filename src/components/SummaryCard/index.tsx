import { MotionStyle } from "framer-motion";
import type { ComponentType } from "react";

import { Cash } from "../Cash";

import { Container } from './styles';

type SummaryCardProps = {
  title: string;
  theme: {
    primary: string;
    secondary: string;
  };
  amount: number;
  isAnimationStarted?: boolean;
  icon: ComponentType<{
    color: string | undefined;
  }>;
  style?: MotionStyle,
}

export function SummaryCard({
  amount,
  theme,
  title,
  isAnimationStarted,
  style,
  icon: Icon
}: SummaryCardProps) {
  return (
    <Container
      variants={{
        active: {
          backgroundColor: theme.primary,
          color: theme.secondary,
        },
        initial: {
          backgroundColor: theme.secondary,
        },
      }}
      initial={"initial"}
      animate={isAnimationStarted ? "active" : "initial"}
      style={style}
    >
      <header>
        <p>{title}</p>
        <Icon color={isAnimationStarted ? theme.secondary : undefined} />
      </header>
      <strong>
        <Cash amount={amount} />
      </strong>
    </Container>
  );
}
