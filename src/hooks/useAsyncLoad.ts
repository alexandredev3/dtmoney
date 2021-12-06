import { useState } from "react";

export const useAsyncLoad = <T>(fn: (props: T) => Promise<unknown>) => {
  const [isLoading, setIsLoading] = useState(false);

  async function onFetch(props: T) {
    try {
      setIsLoading(true);
      await fn(props);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    onFetch,
  }
}