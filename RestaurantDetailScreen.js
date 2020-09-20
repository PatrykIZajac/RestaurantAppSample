import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Linking,
  Platform,
} from 'react-native';
import yelp from './api/yelp';
import {LogBox} from 'react-native';
import SpecificRestaurantScreen from './Screens/SpecificRestaurantScreen';

export default function RestaurantDetailScreen({id}) {
  const [resultFromApi, setResultFromApi] = useState({
    name: 'laoding!',
    address: 'loading!',
    phone: 'loading!',
    open: 'set false',
    photos: [],
    categories: '',
    openDays: [],
  });

  LogBox.ignoreLogs(['Failed prop type: ']);

  const getResult = async () => {
    const response = await yelp.get(`${id}`);
    if ('hours' in response.data) {
      setResultFromApi({
        name: response.data.name,
        address: response.data.location.address1,
        phone: response.data.phone,
        open: response.data.hours[0].is_open_now,
        photos: response.data.photos,
        categories: response.data.categories[0].alias,
        openDays: response.data.hours[0].open,
      });
    } else {
      setResultFromApi({
        name: response.data.name,
        address: response.data.location.address1,
        phone: response.data.phone,
        open: 'NO DATA',
        photos: response.data.photos,
        categories: response.data.categories[0].alias,
        openDays: ['NO DATA'],
      });
    }
    console.log('data set from api with business id');
  };

  useEffect(() => {
    getResult();
  }, []);

  const openGps = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const label = resultFromApi.name;
    const url = Platform.select({
      ios: `${scheme}${label}`,
      android: `${scheme}${label}`,
    });
    Linking.openURL(url);
  };

  const openPhone = (phoneNumber) => {
    if (Platform.OS !== 'android') {
      Linking.openURL(`telprompt:${phoneNumber}`);
    } else {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  return (
    <View style={styles.container}>
      <SpecificRestaurantScreen
        resultFromApi={resultFromApi}
        openGps={openGps}
        openPhone={openPhone}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  galleryStyle: {
    width: 220,
    height: 155,
    borderRadius: 10,
    justifyContent: 'center',
  },
  carouselStyle: {
    alignItems: 'center',
    marginTop: 10,
  },
});
