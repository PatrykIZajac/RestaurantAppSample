import React from 'react';
import {StyleSheet, View, Text, FlatList, ScrollView} from 'react-native';
import ResultDetail from './ResultDetail';


export default function ResultList({title, results}) {
  if (results.length === 0) {
    return null;
  }

  return (
    <ScrollView>
    <View style={styles.sectionStyle}>
      <View style={styles.headerStyle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.resultStyle}> {results.length} results</Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={results}
        renderItem={({item}) => {
          return <ResultDetail result={item} />;
        }}
      />
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 15,
    color:'black'
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#FFD700',
    backgroundColor:'#FFD700',
    marginTop:20,
    marginBottom:10,
    marginLeft:10,
    width:250,
    justifyContent:'space-between'
  },
  resultStyle: {
    fontSize: 12,
    marginRight:10,
    fontWeight:'bold'
  },
  sectionStyle:{
    borderBottomColor:'black',
    borderBottomWidth:2,
  }
});
