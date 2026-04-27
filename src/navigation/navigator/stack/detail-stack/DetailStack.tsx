import { createStackNavigator } from '@react-navigation/stack';
import { useNavigator } from '@navigation/navigator/useNavigator';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DestinationDetailScreen,
  ItineraryDetailScreen,
  ListDestinationScreen,
} from '@modules/detail';

const Stack = createStackNavigator<DetailStackParamList>();
type DetailStackProps = {};

export const DetailStack: React.FC<DetailStackProps> = () => {
  const { screenListeners } = useNavigator();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Navigator
        initialRouteName="DestinationDetailScreen"
        screenListeners={screenListeners}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={'DestinationDetailScreen'}
          component={DestinationDetailScreen}
        />
        <Stack.Screen
          name={'ItineraryDetailScreen'}
          component={ItineraryDetailScreen}
        />
        <Stack.Screen
          name={'ListDestinationScreen'}
          component={ListDestinationScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
