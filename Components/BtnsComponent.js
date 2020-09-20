import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

export default function BtnsComponent({openGps, openPhone, resultFromApi}) {
  return (
    <View style={styles.btnsArea}>
      <TouchableOpacity onPress={() => openGps()}>
        <Image source={require('../Assets/mapIcon.png')} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openPhone(resultFromApi.phone)}>
        <Image source={require('../Assets/phoneIcon.png')} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btnsArea: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
