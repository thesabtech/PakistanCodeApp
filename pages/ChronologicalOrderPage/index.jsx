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
import {useNavigation} from '@react-navigation/native';
import {fetchLaws} from '../../store/actions/lawsActions';
import moment from 'moment';

const ChronoLogicalOrder = () => {
  const dispatch = useDispatch();

  const years = Array.from(
    {length: moment().year() - 1839 + 1},
    (_, i) => 1839 + i,
  );

  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [filteredLaws, setFilteredLaws] = useState([]);

  const handleSelectYear = index => {
    setSelectedYear(years[index.row]);
    const filtered = laws.filter(
      law =>
        law.title_act_help && law.Year_help === years[index.row].toString(),
    );
    setFilteredLaws(filtered);
  };

  const renderYearItem = year => (
    <SelectItem key={year} title={year.toString()} />
  );

  useEffect(() => {
    dispatch(fetchLaws());
  }, [dispatch]);

  useEffect(() => {
    if (laws.length) {
      const filtered = laws.filter(
        law => law.title_act_help && law.Year_help === selectedYear.toString(),
      );
      setFilteredLaws(filtered);
    }
  }, [laws, selectedYear]);

  const navigation = useNavigation();
  const laws = useSelector(state => state.laws.laws);
  const loading = useSelector(state => state.laws.loading);

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <Text style={styles.pageTitle}>Chronological Order Laws</Text>
      {loading ? (
        <View style={styles.loader}>
          <Spinner status="success" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.label}>Select Year</Text>
          <Select
            style={styles.select}
            value={selectedYear?.toString()}
            onSelect={handleSelectYear}
            placeholder="Select Year">
            {years.map(year => renderYearItem(year))}
          </Select>
          {filteredLaws.length !== 0 ? (
            filteredLaws.map(law => (
              <TouchableOpacity
                onPress={() => {
                  const simplifiedLaw = {
                    title_act_help: law.title_act_help,
                    ACTID_help: law.ACTID_help,
                    lawFile: JSON.stringify(law.title_act_help),
                  };
                  navigation.navigate('SingleLaw', {law: simplifiedLaw});
                }}
                style={styles.lawButton}
                key={law.ACTID_help}>
                <Text style={styles.lawButtonText}>{law.title_act_help}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noLawsText}>No Laws in {selectedYear}</Text>
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ChronoLogicalOrder;
