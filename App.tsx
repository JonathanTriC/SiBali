/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import { RouteApp } from '@navigation/route-app';
import { useEffect } from 'react';
import { hideSplash } from 'react-native-splash-view';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

function App() {
  useEffect(() => {
    hideSplash();
  }, []);

  return <RouteApp />;
}

export default App;
