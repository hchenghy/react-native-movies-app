import { StyleSheet, View, StatusBar} from 'react-native';
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
      <Tab.Navigator>
        <Tab.Screen name="Movies" component={MoviesScreen} />
        <Tab.Screen name="Search Result" component={SearchScreen} />
        <Tab.Screen name="Tv Shows" component={TvShowsScreen} /> 
      </Tab.Navigator>
    );
  };


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movie App" component={TabNavigator} />
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
    backgroundColor: "blue",
  },
});
