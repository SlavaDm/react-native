import { LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { Tabs } from './navigation/Tabs';

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
