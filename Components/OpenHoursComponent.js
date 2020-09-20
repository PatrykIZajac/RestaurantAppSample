import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

export default function OpenHoursComponent({data}) {
  let weekday = new Array(7);
  weekday[0] = 'Monday';
  weekday[1] = 'Tuesday';
  weekday[2] = 'Wednesday';
  weekday[3] = 'Thursday';
  weekday[4] = 'Friday';
  weekday[5] = 'Saturday';
  weekday[6] = 'Sunday';
  let localTime = new Date();

  return (
    <View key={data.day} style={styles.hoursStyle}>
      <Text style={styles.textStyle}>{weekday[data.day]}</Text>
      <Text style={styles.textStyle}>{data.start.substr(0,2) +':'+ data.start.substr(2,4)}</Text>
      <Text style={styles.textStyle}>{data.end.substr(0,2) +':'+ data.end.substr(2,4)}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  hoursStyle: {
    flexDirection: 'row',
    backgroundColor: '#FFD700',
    justifyContent: 'center',
  },
  textStyle: {
    margin: 10,
  },
});
