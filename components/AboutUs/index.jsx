import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.views}>
      <Text>
        An initiative of Ministry of Law & Justice to pave the path for access
        to justice in Pakistan. Click here for Publication of Laws of Pakistan
        Act, 2016
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  views: {
    padding: 10,
  },
});

export default AboutUs;
