import React, {useEffect}from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function CardComponent({resultFromApi}) {
  useEffect(() => {
    console.log(resultFromApi.openDays.length);
  }, [])
  return (
    <View style={styles.cardStyle}>
      <View style={styles.textInCard}>
        <Text style={styles.typeTextStyle}>phone:</Text>
        {resultFromApi.phone === '' ? (
          <Text style={styles.infoStyle}>No information about phone in DB</Text>
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

        {resultFromApi.openDays.length > 1? (
          <View style={styles.textInCard}>
           <Text style={styles.typeTextStyle}>Status:</Text>
           {resultFromApi.open === true ? (
             <Text style={{color: '#04E762', marginLeft: 10}}>Open</Text>
           ) : (
             <Text style={{color: '#ff0000', marginLeft: 10}}>Closed</Text>
           )}
         </View>
        ):(
          null
        )}
      {/* <View style={styles.textInCard}>
        <Text style={styles.typeTextStyle}>Status:</Text>
        {resultFromApi.open === true ? (
          <Text style={{color: '#04E762', marginLeft: 10}}>Open</Text>
        ) : (
          <Text style={{color: '#ff0000', marginLeft: 10}}>Closed</Text>
        )}
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
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
});
