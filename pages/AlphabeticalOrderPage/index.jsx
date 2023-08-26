import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import LatestLaws from '../../components/LatestLaws';

const AlphabeticalOrder = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alphabetical Order</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: 600,
  },
});

export default AlphabeticalOrder;
