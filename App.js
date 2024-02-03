import { StyleSheet, View, StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MoviesScreen from './components/screen/MoviesScreen';
import SearchScreen from './components/screen/SearchScreen';
import TvShowsScreen from './components/screen/TvShowsScreen';
import DetailScreen from './components/screen/DetailScreen';


export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();


  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { textTransform: "none" },
          tabBarIndicatorStyle: {
            borderBottomColor: '#283647',
            borderBottomWidth: 2,
          },
        }}
      >
        <Tab.Screen name="Movies" component={MoviesScreen} />
        <Tab.Screen name="Search Results" component={SearchScreen} />
        <Tab.Screen name="TV Shows" component={TvShowsScreen} />
      </Tab.Navigator>
    );
  };


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movies App" component={TabNavigator} options={{
          headerStyle: {
            backgroundColor: '#283647',
          },
          headerTintColor: '#fff',
        }} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusColor: {
    backgroundColor: "#5F6467",
  },

});
