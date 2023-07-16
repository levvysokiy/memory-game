import { useRef, useState, useEffect } from 'react';

export const useTimer = (startTrigger: boolean, endTrigger: boolean) => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  const updateTime = () => {
    setSeconds((prev) => {
      let newSeconds = prev + 1;

      if (newSeconds === 60) {
        newSeconds = 0;
        setMinutes((prev) => prev + 1);
      }

      return newSeconds;
    });
  };

  useEffect(() => {
    if (startTrigger) {
      intervalRef.current = setInterval(() => {
        updateTime();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTrigger]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [endTrigger]);

  const min = minutes.toString().padStart(2, '0');
  const sec = seconds.toString().padStart(2, '0');

  return `${min}:${sec}`;
};
