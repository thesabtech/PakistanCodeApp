import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Popover, Icon} from '@ui-kitten/components';

const MoreIcon = props => <Icon {...props} name="more-horizontal-outline" />;

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
          {/* <MoreIcon /> */}
        </TouchableOpacity>
      )}
      style={{marginTop: 16, paddingRight: 0, backgroundColor: '#efefef'}}
      onBackdropPress={togglePopover}
      placement="bottom end">
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
    width: 'auto',
  },
});

export default Dropdown;
