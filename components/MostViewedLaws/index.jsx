import {Spinner, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLaws} from '../../store/actions/lawsActions';
import moment from 'moment';

const MostViewedLaws = () => {
  const dispatch = useDispatch();
  const laws = useSelector(state => state.laws.laws);
  const loading = useSelector(state => state.laws.loading);

  useEffect(() => {
    dispatch(fetchLaws());
  }, [dispatch]);

  // Filtering laws based on SQL query conditions
  const filteredLaws = laws
    .filter(
      law =>
        law.law_type === 'Subordinate Legislation' && law.archiv_actid === '0',
    )
    .sort((a, b) =>
      moment(b.promulgate_dt).isBefore(a.promulgate_dt) ? -1 : 1,
    ) // Sorting by date
    .slice(0, 4); // Limiting the results to top 4

  return (
    <View>
      {loading ? (
        <View style={styles.lawLoader}>
          <Spinner style={styles.loader} status="success" />
        </View>
      ) : (
        <View style={styles.lawList}>
          {filteredLaws?.map(law => (
            <TouchableOpacity
              onPress={() => handlePress(law)}
              style={styles.lawUrl}
              title={law.title_act_help}
              key={law.ACTID_help}>
              <Text style={styles.lawUrlText}>{'- ' + law.title_act_help}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lawLoader: {
    flex: 1,
    zIndex: 100,
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  lawList: {
    paddingVertical: 20,
  },
  loader: {color: '#43a047', paddingVertical: 30},
  lawUrl: {
    borderBottom: 2,
    borderBottomColor: '#43a047',
  },
  lawUrlText: {
    textAlign: 'left',
    paddingVertical: 6,
    fontSize: 16,
    fontWeight: 600,
    color: '#43a047',
  },
});

export default MostViewedLaws;
