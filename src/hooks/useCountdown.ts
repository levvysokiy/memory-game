import { useState, useRef, useEffect } from 'react';

export const useCountdown = (seconds: number, callback: () => void) => {
  const [countdown, setCountdown] = useState<number>(seconds);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!countdown && intervalRef.current) {
      clearInterval(intervalRef.current);
      callback();
    }
  }, [countdown]);

  return countdown;
};
