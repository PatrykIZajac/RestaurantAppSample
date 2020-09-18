import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Header from './Components/Header';
import yelp from './api/yelp';
import ResultList from './Components/ResultList';
import Geolocation from '@react-native-community/geolocation';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';

export default function App() {
  const [textInput, setTextInput] = useState('');
  const [results, setResults] = useState([]);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const getCoordinates = () => {
    Geolocation.getCurrentPosition((position) => {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    //console.log(coordinates.latitude, coordinates.longitude);
  };

  const searchApi = async () => {
    try {
      if (textInput === '') {
        showMessage({
          message: 'Warning',
          description: 'Text field is empty. Type phrase.',
          type: 'warning',
          backgroundColor: '#FFD700',
          color: 'black',
          icon:'warning',
          style:{height:80},
          animationDuration:180,
          duration:2000,
        });
      } else {
        const response = await yelp.get('/search', {
          params: {
            limit: 50,
            term: textInput,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            //location:'san jose'
          },
        });
        console.log('input: ', textInput);
        setResults(response.data.businesses);
        setTextInput('');

        showMessage({
          message: 'Succes',
          description: 'Correct phrase',
          type: 'success',
          color: 'white',
          icon:'success',
          style:{alignItems:'center'},
          animationDuration:180,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchByPrice = (price) => {
    return results.filter((result) => {
      return result.price === price;
    });
  };

  useEffect(() => {
    getCoordinates();
  }, [coordinates.latitude, coordinates.longitude]);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <FlashMessage position="top" />
      <View style={styles.container}>
        <Header
          setTextInput={(value) => setTextInput(value)}
          onSubmit={() => searchApi()}
          textInput={textInput}
        />
        {results.length === 0 ? (
          <View style={styles.pageOneStyle}>
            <Text style={styles.textStyle}>
              Write name of category that you looking for
            </Text>
            <Image
              style={styles.gifStyle}
              source={require('./Assets/dots.gif')}
            />
            <Image
              style={styles.imageStyle}
              source={require('./Assets/foodIcon.png')}
            />
          </View>
        ) : (
          <View>
            <View style={styles.sectionStyle}>
              <ResultList title={'Cheap'} results={searchByPrice('$')} />
            </View>

            <View>
              <ResultList title={'Expensive'} results={searchByPrice('$$')} />
            </View>

            <View style={styles.sectionStyle}>
              <ResultList
                title={'Most expensive'}
                results={searchByPrice('$$$')}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
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
