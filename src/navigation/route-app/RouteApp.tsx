import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './styles';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Navigator } from '@navigation/navigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const RouteApp = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle={'dark-content'} />

        <GestureHandlerRootView style={styles.flex1}>
          <NavigationContainer theme={MyTheme}>
            <Navigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};
