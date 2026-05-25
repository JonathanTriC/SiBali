import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './styles';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Navigator } from '@navigation/navigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import { Colors } from '@constants/colors';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[
        styles.baseToastStyle,
        {
          backgroundColor: Colors.success.base,
        },
      ]}
      contentContainerStyle={styles.baseToastContainerStyle}
      text1Style={[
        styles.baseToastTextStyle,
        {
          color: Colors.white,
        },
      ]}
      text1NumberOfLines={2}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={[
        styles.baseToastStyle,
        {
          backgroundColor: Colors.danger.base,
        },
      ]}
      contentContainerStyle={styles.baseToastContainerStyle}
      text1Style={[
        styles.baseToastTextStyle,
        {
          color: Colors.white,
        },
      ]}
      text1NumberOfLines={2}
    />
  ),
  default: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={[
        styles.baseToastStyle,
        {
          backgroundColor: Colors.neutral.base,
        },
      ]}
      contentContainerStyle={styles.baseToastContainerStyle}
      text1Style={[
        styles.baseToastTextStyle,
        {
          color: Colors.white,
        },
      ]}
      text1NumberOfLines={2}
    />
  ),
};

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
            <Toast
              config={toastConfig}
              position="bottom"
              visibilityTime={3000}
            />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};
