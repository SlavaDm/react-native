import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import MapsScreen from '../screens/MapsScreen';
import APIScreen from '../screens/APIScreen';
import CRUDScreen from '../screens/CRUDScreen';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          return route.name === 'Maps' ? (
            <IconFontAwesome
              name="map-o"
              size={20}
              color={'black'}
              style={{ marginTop: 3 }}
            />
          ) : route.name === 'API' ? (
            <IconFontAwesome
              name="connectdevelop"
              size={20}
              color={'black'}
              style={{ marginTop: 3 }}
            />
          ) : route.name === 'CRUD' ? (
            <IconFontAwesome
              name="tasks"
              size={20}
              color={'black'}
              style={{ marginTop: 7 }}
            />
          ) : (
            ''
          );
        },
        tabBarLabelStyle: { fontSize: 15, marginBottom: 2 },
        headerTitle: 'My ToDo',
      })}
    >
      <Tab.Screen name="Maps" component={MapsScreen} />
      <Tab.Screen name="API" component={APIScreen} />
      <Tab.Screen name="CRUD" component={CRUDScreen} />
    </Tab.Navigator>
  );
};
