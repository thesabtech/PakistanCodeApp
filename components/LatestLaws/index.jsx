import {Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLaws} from '../../store/actions/lawsActions';
import SingleLaw from '../SingleLaw';
import {Screen} from 'react-native-screens';

const LatestLaws = () => {
  const dispatch = useDispatch();
  const laws = useSelector(state => state.laws.laws);
  const loading = useSelector(state => state.loading);

  useEffect(() => {
    dispatch(fetchLaws());
  }, [dispatch]);
  // Filtering laws based on SQL query conditions
  const filteredLaws = laws
    .filter(
      law =>
        law.law_type !== 'Subordinate Legislation' &&
        law.law_type !== 'Presidental Order' &&
        law.archiv_actid !== '0' &&
        !law.title_act_help.toLowerCase().includes('mendment'),
    )
    .slice(0, 4);

  return (
    <View>
      {loading ? (
        <View style={styles.lawLoader}>
          <Spinner />
        </View>
      ) : (
        <View style={styles.lawList}>
          {filteredLaws?.map(law => (
            <Button
              style={styles.lawUrl}
              title={law.title_act_help}
              key={law.ACTID_help}>
              {law.title_act_help}
            </Button>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lawLoader: {
    flex: 1,
  },
  lawList: {},
  lawUrl: {
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
});

export default LatestLaws;
