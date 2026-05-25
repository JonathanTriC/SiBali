import { createStackNavigator } from '@react-navigation/stack';
import { InterestsScreen, LoginScreen, RegisterScreen } from '@modules/auth';
import { useNavigator } from '@navigation/navigator/useNavigator';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator<AuthStackParamList>();
type AuthStackProps = {};

export const AuthStack: React.FC<AuthStackProps> = () => {
  const { screenListeners } = useNavigator();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenListeners={screenListeners}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
        <Stack.Screen name={'RegisterScreen'} component={RegisterScreen} />
        <Stack.Screen name={'InterestsScreen'} component={InterestsScreen} />
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
