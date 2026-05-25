import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useCounterInput } from './useCounterInput';
import { styles } from './styles';
import { Text } from '@components/text';
import { Colors } from '@constants/colors';

type Props = {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (val: number) => void;
};

export const CounterInput: React.FC<Props> = ({
  value = 0,
  min = 0,
  max = 99,
  onChange,
}) => {
  const { count, increment, decrement, isMin, isMax } = useCounterInput({
    value,
    min,
    max,
    onChange,
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.minusButton,
          isMin && styles.disabledButton,
        ]}
        onPress={decrement}
        disabled={isMin}
      >
        <Text
          text="-"
          type="bold-base"
          color={!isMin ? Colors.neutral.base : Colors.neutral.secondary}
        />
      </TouchableOpacity>

      <Text text={`${count}`} type="bold-xl" color={Colors.primary.base} />

      <TouchableOpacity
        style={[
          styles.button,
          styles.plusButton,
          isMax && styles.disabledButton,
        ]}
        onPress={increment}
        disabled={isMax}
      >
        <Text
          text="+"
          type="bold-base"
          color={!isMin ? Colors.white : Colors.neutral.disabled}
        />
      </TouchableOpacity>
    </View>
  );
};
