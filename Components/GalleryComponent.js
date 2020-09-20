import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default function GalleryComponent({resultFromApi}) {
  return (
    <View style={styles.carouselStyle}>
      <Carousel
        layout={'default'}
        data={resultFromApi.photos}
        renderItem={({item}) => {
          return (
            <View>
              <Image style={styles.galleryStyle} source={{uri: item}} />
            </View>
          );
        }}
        sliderWidth={400}
        itemWidth={220}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  carouselStyle: {
    alignItems: 'center',
    marginTop: 10,
  },
  galleryStyle: {
    width: 220,
    height: 155,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
