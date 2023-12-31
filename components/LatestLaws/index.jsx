import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLaws} from '../../store/actions/lawsActions';
import {useNavigation} from '@react-navigation/native';
import {Spinner} from '@ui-kitten/components';

const LatestLaws = () => {
  const dispatch = useDispatch();
  const laws = useSelector(state => state.laws.laws);
  const loading = useSelector(state => state.laws.loading);

  const navigation = useNavigation();

  const handlePress = law => {
    const simplifiedLaw = {
      title_act_help: law.title_act_help,
      ACTID_help: law.ACTID_help,
      lawFile: JSON.stringify(law.title_act_help),
    };
    navigation.navigate('SingleLaw', {law: simplifiedLaw});
  };

  useEffect(() => {
    dispatch(fetchLaws());
  }, [dispatch]);

  const filteredLaws = laws
    ?.filter(
      law =>
        law.law_type !== 'Subordinate Legislation' &&
        law.law_type !== 'Presidental Order' &&
        law.archiv_actid !== '0' &&
        !law.title_act_help?.toLowerCase()?.includes('mendment'),
    )
    .slice(0, 4);

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

export default LatestLaws;
