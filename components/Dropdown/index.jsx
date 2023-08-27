import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Popover, Button} from '@ui-kitten/components';

const Dropdown = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const togglePopover = () => {
    setVisible(!visible);
  };

  return (
    <Popover
      visible={visible}
      anchor={() => (
        <TouchableOpacity onPress={togglePopover}>
          <Text>...</Text>
        </TouchableOpacity>
      )}
      onBackdropPress={togglePopover}
      placement="bottom start">
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </Popover>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: 200,
  },
});

export default Dropdown;
