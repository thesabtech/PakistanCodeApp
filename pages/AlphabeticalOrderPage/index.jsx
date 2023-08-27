import {
  IndexPath,
  Select,
  SelectItem,
  Spinner,
  Text,
} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLaws} from '../../store/actions/lawsActions';
import {useNavigation} from '@react-navigation/native';

const AlphabeticalOrder = () => {
  const dispatch = useDispatch();
  const laws = useSelector(state => state.laws.laws);
  const loading = useSelector(state => state.loading);

  const alphabets = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const [selectedAlphabet, setSelectedAlphabet] = useState('A');
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [filteredLaws, setFilteredLaws] = useState([]);

  const handleSelectAlphabet = index => {
    setSelectedAlphabet(alphabets[index.row]);
    setSelectedIndex(index);
    filterLaws(alphabets[index.row]);
  };

  const filterLaws = alphabet => {
    const filtered = laws.filter(
      law =>
        law.title_act_help && law.title_act_help[0].toUpperCase() === alphabet,
    );
    setFilteredLaws(filtered);
  };

  useEffect(() => {
    dispatch(fetchLaws());
    filterLaws('A'); // Render content for alphabet 'A' by default
  }, [dispatch]);

  const navigation = useNavigation();

  const handlePress = law => {
    const simplifiedLaw = {
      title_act_help: law.title_act_help,
      ACTID_help: law.ACTID_help,
    };
    navigation.navigate('SingleLaw', {law: simplifiedLaw});
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Alphabetical Order Laws</Text>
      {loading ? (
        <View style={styles.loader}>
          <Spinner />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.label}>Select Alphabet</Text>
          <Select
            style={styles.select}
            value={selectedAlphabet}
            onSelect={handleSelectAlphabet}>
            {alphabets.map(alphabet => (
              <SelectItem key={alphabet} title={alphabet} />
            ))}
          </Select>
          {filteredLaws.length !== 0 ? (
            filteredLaws.map(law => (
              <TouchableOpacity
                onPress={() => handlePress(law)}
                style={styles.lawButton}
                key={law.ACTID_help}>
                <Text style={styles.lawButtonText}>{law.title_act_help}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noLawsText}>
              No Laws starting with {selectedAlphabet}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  pageTitle: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 5,
  },
  select: {
    paddingVertical: 10,
  },
  loader: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lawButton: {
    alignSelf: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#43a047',
    borderRadius: 4,
    marginVertical: 8,
  },
  lawButtonText: {
    color: '#43a047',
    textAlign: 'center',
    fontWeight: '600',
  },
  noLawsText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
    color: 'red',
  },
});

export default AlphabeticalOrder;
