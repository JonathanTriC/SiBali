import { Text } from '@components';
import { Colors } from '@constants/colors';
import { globalStyles } from '@constants/globalStyles';
import { View } from 'react-native';

const PhotosTab: React.FC = () => {
  return (
    <View style={globalStyles.padding24}>
      <Text
        text={`We couldn't find any images at the moment.`}
        type="regular-base"
        color={Colors.neutral.secondary}
        textAlign="center"
      />
    </View>
  );
};

export { PhotosTab };
