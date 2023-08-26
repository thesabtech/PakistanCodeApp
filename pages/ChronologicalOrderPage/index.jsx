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
import {fetchCategories} from '../../store/actions/categoriesAction';
import {fetchCategoryDetails} from '../../store/actions/categoryDetailsAction';
import {useNavigation} from '@react-navigation/native';
import {fetchLaws} from '../../store/actions/lawsActions';
import moment from 'moment';

const ChronoLogicalOrder = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);

  const years = Array.from(
    {length: moment().year() - 1839 + 1},
    (_, i) => 1839 + i,
  );

  const [selectedYear, setSelectedYear] = useState(moment().year()); // set to the current year by default
  const [selectedIndex, setSelectedIndex] = useState(
    new IndexPath(years.length - 1),
  ); // set to the last index by default

  console.log('Selected Year: ', selectedYear);

  const [filteredLaws, setFilteredLaws] = useState([]);

  const handleSelectYear = index => {
    setSelectedYear(years[index.row]);
    setSelectedIndex(index);
    const filteredLaws = laws.filter(
      law =>
        law.title_act_help && law.Year_help === years[index.row].toString(),
    );
    setFilteredLaws(filteredLaws);
  };

  const renderYearItem = year => (
    <SelectItem key={year} title={year.toString()} />
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCategoryDetails());
  }, [dispatch]);

  const navigation = useNavigation();

  const handlePress = law => {
    const simplifiedLaw = {
      title_act_help: law.title_act_help,
      ACTID_help: law.ACTID_help,
      lawFile: JSON.stringify(law.title_act_help),
    };
    navigation.navigate('SingleLaw', {law: simplifiedLaw});
  };

  const laws = useSelector(state => state.laws.laws);
  const loadingLaw = useSelector(state => state.loading);

  useEffect(() => {
    dispatch(fetchLaws());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <Text style={styles.pageTitle}>Chronological Order Laws</Text>
      {loading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'lightgrey',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spinner />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.label}>Select Year</Text>
          <Select
            style={styles.select}
            value={selectedYear?.toString() || 'Select Year'}
            onSelect={handleSelectYear}
            placeholder="Select Year">
            {years.map(year => renderYearItem(year))}
          </Select>
          {loadingLaw ? (
            <View
              style={{
                flex: 1,
                backgroundColor: 'lightgrey',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Spinner />
            </View>
          ) : (
            <View>
              {filteredLaws.length !== 0 ? (
                filteredLaws?.map(law => (
                  <TouchableOpacity
                    onPress={() => handlePress(law)}
                    style={styles.lawButton}
                    key={law.ACTID_help}>
                    <Text style={styles.lawButtonText}>
                      {law.title_act_help}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 600,
                    marginVertical: 20,
                    color: 'red',
                  }}>
                  No Laws in {selectedYear}
                </Text>
              )}
            </View>
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
    fontWeight: 600,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 5,
  },
  select: {
    paddingVertical: 10,
  },
  lawLoader: {
    flex: 1,
    zIndex: 100,
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
    maxWidth: '100%',
  },
  lawButtonText: {
    color: '#43a047',
    textAlign: 'center',
    fontWeight: 600,
  },
});

export default ChronoLogicalOrder;
