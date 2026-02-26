import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Navigator } from '@navigation/navigator';

export const RouteApp = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar barStyle={'dark-content'} />

        <GestureHandlerRootView style={styles.flex1}>
          <NavigationContainer theme={MyTheme}>
            <Navigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
