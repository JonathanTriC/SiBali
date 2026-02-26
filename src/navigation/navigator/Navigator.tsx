import { createStackNavigator } from '@react-navigation/stack';
import { useNavigator } from './useNavigator';
import { LoginScreen, RegisterScreen } from '@modules/auth';

const Stack = createStackNavigator<ParamList>();
type NavigatorProps = {};

export const Navigator: React.FC<NavigatorProps> = () => {
  const { screenListeners } = useNavigator();

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenListeners={screenListeners}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'RegisterScreen'} component={RegisterScreen} />
    </Stack.Navigator>
  );
};
