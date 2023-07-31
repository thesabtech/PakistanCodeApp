import React, {useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLaws} from '../../store/actions/lawsActions';
import {useNavigation} from '@react-navigation/native';

const LatestLaws = () => {
  const dispatch = useDispatch();
  const laws = useSelector(state => state.laws.laws);
  const loading = useSelector(state => state.loading);

  const navigation = useNavigation();

  const handlePress = law => {
    const simplifiedLaw = {
      title_act_help: law.title_act_help,
      ACTID_help: law.ACTID_help,
    };
    navigation.navigate('SingleLaw', {law: simplifiedLaw});
  };

  useEffect(() => {
    dispatch(fetchLaws());
  }, [dispatch]);

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
              onPress={() => handlePress(law)}
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
