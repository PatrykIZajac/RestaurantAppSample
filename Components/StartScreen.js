import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default function StartScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.pageOneStyle}>
        <Text style={styles.textStyle}>
          Write name of category that you looking for
        </Text>
        <Image style={styles.gifStyle} source={require('../Assets/dots.gif')} />
        <Image
          style={styles.imageStyle}
          source={require('../Assets/foodIcon.png')}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  pageOneStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  gifStyle: {
    width: 200,
    height: 70,
    backgroundColor: 'white',
  },
});
