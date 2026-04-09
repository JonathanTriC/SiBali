import { useState, useEffect } from 'react';

type UseCounterInputProps = {
  value: number;
  min: number;
  max: number;
  onChange?: (val: number) => void;
};

export const useCounterInput = ({
  value,
  min,
  max,
  onChange,
}: UseCounterInputProps) => {
  const [count, setCount] = useState(value);

  const isMin = count <= min;
  const isMax = count >= max;

  const increment = () => {
    if (isMax) return;

    setCount(prev => {
      const newVal = Math.min(prev + 1, max);
      onChange?.(newVal);
      return newVal;
    });
  };

  const decrement = () => {
    if (isMin) return;

    setCount(prev => {
      const newVal = Math.max(prev - 1, min);
      onChange?.(newVal);
      return newVal;
    });
  };

  useEffect(() => {
    setCount(value);
  }, [value]);

  return {
    count,
    increment,
    decrement,
    isMin,
    isMax,
  };
};
