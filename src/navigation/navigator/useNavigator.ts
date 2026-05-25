import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

export const useNavigator = () => {
  const navigation: any = useNavigation();
  const routeRef = useRef<IRouteRef>({ screenStack: [], screenName: '' });

  const screenListeners = () => ({
    state: async () => {
      const currentRouteName = navigation?.getCurrentRoute()?.name;
      routeRef.current.screenName = currentRouteName;
      routeRef.current.screenStack.push(currentRouteName);
      console.log(
        '🚀 ~ file: useNavigator.tsx:22 ~ state: ~ currentRouteName:',
        currentRouteName,
      );
    },
  });

  return { screenListeners };
};
