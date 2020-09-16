import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default function ResultDetail({result}) {
  return (
    <ScrollView>
    <View style={styles.restaurantPageStyle}>
      <TouchableOpacity
        onPress={() => {
          Actions.Details({result: result, id: result.id});
        }}>
        <Image style={styles.image} source={{uri: result.image_url}} />
        <Text style={styles.restaurantName}>{result.name}</Text>

        <View style={styles.descStyle}>
          <Text>{result.rating}</Text>
          <Image
            style={styles.starIconStyle}
            source={require('../Assets/starIcon.png')}
          />
          <Text>| {result.review_count} Reviews</Text>
        </View>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 120,
    borderRadius: 10,
  },
  restaurantPageStyle: {
    borderRadius: 10,
    margin:10
  },
  restaurantName: {
    fontWeight: 'bold',
  },
  descStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIconStyle: {
    marginLeft: 2,
  },
});
