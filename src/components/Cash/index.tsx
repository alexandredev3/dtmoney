import { useEffect, useRef } from "react";
import { animate, useMotionValue } from "framer-motion";

import { cashFormatter } from "../../helpers/cashFormatter";

type CashProps = {
  amount: number;
}

export function Cash({ amount }: CashProps) {
  const initialTotal = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(initialTotal, amount, {
      duration: 1,
      ease: 'easeOut',
      onUpdate: (value) => {
        const current = ref.current;

        if (current) {
          current.textContent = cashFormatter(value);
        }
      }
    });

    return () => controls.stop();
  }, [initialTotal, amount]);

  return <span ref={ref} />;
}