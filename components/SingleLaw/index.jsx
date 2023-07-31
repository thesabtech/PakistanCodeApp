import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';

const SingleLaw = ({route}) => {
  const source = {
    uri: 'https://pakistancode.gov.pk/pdffiles/administrator66aa0b48464dce4549a6b07f3bde45e5.pdf',
    cache: true,
  };
  return (
    <View>
      <Text>Single Law View</Text>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default SingleLaw;
