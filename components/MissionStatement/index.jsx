import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const MissionStatement = () => {
  return (
    <View style={styles.views}>
      <Text>
        Our mission is to make the Federal Laws accessible to the general
        public, judges, prosecution, lawyers, law students and researchers,
        anywhere, anytime via their channel of choice.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  views: {
    padding: 10,
  },
});

export default MissionStatement;
