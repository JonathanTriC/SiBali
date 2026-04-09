import { Text } from '@components';
import { View } from 'react-native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '@constants/colors';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

type HeaderDiscoverProps = {
  step: number;
};

const HeaderDiscover = ({ step }: HeaderDiscoverProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoAIContainer}>
        <LinearGradient
          colors={['#005B8C', '#083344']}
          start={{ x: 0.85, y: 0.85 }}
          end={{ x: 0.15, y: 0.15 }}
          style={styles.logoAI}
        />
        <View>
          <MaterialDesignIcons
            name="creation-outline"
            size={20}
            color={Colors.white}
          />
        </View>
      </View>
      <View>
        <Text
          text="AI Travel Assistant"
          type="bold-lg"
          color={Colors.neutral.base}
        />
        <Text
          text={`Step ${step} of 6`}
          type="regular-base"
          color={Colors.neutral.secondary}
        />
      </View>
    </View>
  );
};

export { HeaderDiscover };
