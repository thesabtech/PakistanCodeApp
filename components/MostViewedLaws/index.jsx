import {Button, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLaws} from '../../store/actions/lawsActions';
import moment from 'moment';

const MostViewedLaws = () => {
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
        law.law_type === 'Subordinate Legislation' && law.archiv_actid === '0',
    )
    .sort((a, b) =>
      moment(b.promulgate_dt).isBefore(a.promulgate_dt) ? -1 : 1,
    ) // Sorting by date
    .slice(0, 4); // Limiting the results to top 4

  return (
    <View>
      {loading ? (
        <View style={{flex: 1}}>
          <Spinner />
        </View>
      ) : filteredLaws.length !== '0' || filteredLaws !== '' ? (
        <View>
          {filteredLaws?.map(law => (
            <Button title={law.title_act_help} key={law.ACTID_help}>
              {law.title_act_help}
            </Button>
          ))}
        </View>
      ) : (
        <View>
          <Text>No Laws</Text>
        </View>
      )}
    </View>
  );
};

export default MostViewedLaws;
