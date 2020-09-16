import React from 'react';
import {StyleSheet, View } from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import SearchScreen from './SearchScreen';
import RestaurantDetailScreen from './RestaurantDetailScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Router>
        <Stack key="root">
          <Scene key="Search" component={SearchScreen} hideNavBar={true}/>
          <Scene key="Details" component={RestaurantDetailScreen} hideNavBar={true}/>
        </Stack>
      </Router>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
