import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  ScrollView,
  FlatList,
  Button,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import yelp from './api/yelp';
import Carousel from 'react-native-snap-carousel';
import {LogBox} from 'react-native';
import { List } from 'react-native-paper';

export default function RestaurantDetailScreen({id}) {
  const [resultFromApi, setResultFromApi] = useState({
    name: 'laoding!',
    address: 'loading!',
    phone: 'loading!',
    open: 'set false',
    photos: [],
    categories: '',
    //openDays: undefined,
  });

  LogBox.ignoreLogs(['Failed prop type: ']);

  const getResult = async () => {
    const response = await yelp.get(`${id}`);

    setResultFromApi({
      name: response.data.name,
      address: response.data.location.address1,
      phone: response.data.phone,
      open: response.data.hours[0].is_open_now,
      photos: response.data.photos,
      categories: response.data.categories[0].alias,
      //openDays: response.data.hours[0].open,
    });

    console.log('data set from api with business id');
    //console.log(response.data.hours[0].is_open_now);
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
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.optionBar}>
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
            }}>
            <Image
              style={styles.arrowIconStyle}
              source={require('./Assets/arrowIcon.png')}
            />
          </TouchableOpacity>
          <Text style={styles.restaurantNameStyle}>{resultFromApi.name}</Text>
        </View>

        <View style={styles.cardStyle}>
          <View style={styles.textInCard}>
            <Text style={styles.typeTextStyle}>phone:</Text>
            {resultFromApi.phone === '' ? (
              <Text style={styles.infoStyle}>
                No information about phone in DB
              </Text>
            ) : (
              <Text style={styles.infoStyle}>{resultFromApi.phone}</Text>
            )}
          </View>

          <View style={styles.textInCard}>
            <Text style={styles.typeTextStyle}>addres:</Text>
            <Text style={styles.infoStyle}>{resultFromApi.address}</Text>
          </View>

          <View style={styles.textInCard}>
            <Text style={styles.typeTextStyle}>category:</Text>
            <Text style={styles.infoStyle}>{resultFromApi.categories}</Text>
          </View>

          <View style={styles.textInCard}>
            <Text style={styles.typeTextStyle}>Open status:</Text>
            {resultFromApi.open === true ? (
              <Text style={{color: '#04E762', marginLeft: 10}}>Open</Text>
            ) : (
              <Text style={{color: '#ff0000', marginLeft: 10}}>Closed</Text>
            )}
          </View>
        </View>

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
            sliderWidth={500}
            itemWidth={250}
          />
        </View>

        <View style={styles.btnsArea}>
          <TouchableOpacity onPress={() => openGps()}>
            <Image source={require('./Assets/mapIcon.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openPhone(resultFromApi.phone)}>
            <Image source={require('./Assets/phoneIcon.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  cardStyle: {
    borderRadius: 10,
    backgroundColor: '#FFD700',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
  },
  textInCard: {
    flexDirection: 'row',
    margin: 10,
  },
  typeTextStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  infoStyle: {
    color: 'black',
    marginLeft: 10,
  },
  navigateBtn: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFD700',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  btnsArea: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  galleryStyle: {
    width: 250,
    height: 180,
    borderRadius: 10,
    justifyContent: 'center',
  },
  carouselStyle: {
    alignItems: 'center',
    marginTop: 10,
  },
});
