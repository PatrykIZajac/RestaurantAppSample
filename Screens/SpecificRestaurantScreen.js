import React from 'react';
import {StyleSheet, View} from 'react-native';
import RestaurantNameBar from '../Components/RestaurantNameBar';
import CardComponent from '../Components/CardComponent';
import GalleryComponent from '../Components/GalleryComponent';
import BtnsComponent from '../Components/BtnsComponent';
import OpenHoursComponent from '../Components/OpenHoursComponent';
import {Container, Content, Accordion} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';

export default function SpecificRestaurantScreen({
  resultFromApi,
  openGps,
  openPhone,
}) {
  const openingHoursArray = [{title: 'Opening hours'}];
  return (
    <View style={styles.container}>
      {resultFromApi.openDays.length > 1 ? (
        <View style={styles.container}>
          <RestaurantNameBar resultFromApi={resultFromApi} />
          <CardComponent resultFromApi={resultFromApi} />
          <Container>
            <Content padder={true}>
              <Accordion
                icon="add"
                expandedIcon="add"
                headerStyle={{
                  backgroundColor: '#FFD700',
                }}
                dataArray={openingHoursArray}
                renderContent={() => {
                  return resultFromApi.openDays.map((data) => {
                    return <OpenHoursComponent data={data} />;
                  });
                }}
              />
              <GalleryComponent resultFromApi={resultFromApi} />
              <BtnsComponent
                openGps={openGps}
                openPhone={openPhone}
                resultFromApi={resultFromApi}
              />
            </Content>
          </Container>
        </View>
      ) : (
        <ScrollView>
          <View>
            <RestaurantNameBar resultFromApi={resultFromApi} />
            <CardComponent resultFromApi={resultFromApi} />

            <GalleryComponent resultFromApi={resultFromApi} />
            <BtnsComponent
              openGps={openGps}
              openPhone={openPhone}
              resultFromApi={resultFromApi}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
