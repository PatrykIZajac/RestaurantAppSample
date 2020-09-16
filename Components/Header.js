import React from 'react';
import {StyleSheet, View, TextInput, Image} from 'react-native';

export default function Header({setTextInput, onSubmit}) {
  return (
    <View>
      <View style={styles.container}>
        <Image  style={styles.searchIconStyle} source={require('../Assets/searchIcon2.png')} />
        <TextInput
          ref={(input) => {
            textInput = input;
          }}
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="black"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setTextInput}
          onEndEditing={() => {
              onSubmit() &&
              textInput.clear();
          }}></TextInput>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: 200,
    marginLeft:10,
  },
  searchIconStyle:{
    marginLeft:10,
  }
});
