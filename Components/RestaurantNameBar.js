import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image,Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default function RestaurantNameBar({resultFromApi}) {
  return (
    <View style={styles.optionBar}>
      <TouchableOpacity
        onPress={() => {
          Actions.pop();
        }}>
        <Image
          style={styles.arrowIconStyle}
          source={require('../Assets/arrowIcon.png')}
        />
      </TouchableOpacity>
      <Text style={styles.restaurantNameStyle}>{resultFromApi.name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  optionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    margin: 20,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  restaurantNameStyle: {
    fontSize: 20,
    marginLeft: 20,
    flex: 1,
    flexWrap: 'wrap',
    color: 'black',
  },
  arrowIconStyle: {
    marginLeft: 10,
  },
});
