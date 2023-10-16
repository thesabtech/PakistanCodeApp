import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLaws} from '../../store/actions/lawsActions';
import {fetchCategories} from '../../store/actions/categoriesAction';
import {fetchCategoryDetails} from '../../store/actions/categoryDetailsAction';
import {useNavigation} from '@react-navigation/native';

const SearchResults = ({route}) => {
  const dispatch = useDispatch();
  //   const {searchTerm, category, year} = route?.params?.searchData ?? {};
  const {
    searchTerm = '',
    category = '',
    year = '',
  } = route?.params?.searchData ?? {};

  const [filteredLaws, setFilteredLaws] = useState([]);

  // Data calls
  const categories = useSelector(state => state?.categories?.categories);
  const categoryDetails = useSelector(
    state => state?.categoryDetails?.categoryDetails,
  );
  const laws = useSelector(state => state?.laws?.laws);

  useEffect(() => {
    dispatch(fetchLaws());
    dispatch(fetchCategories());
    dispatch(fetchCategoryDetails());
  }, [dispatch]);

  useEffect(() => {
    if (!laws.length || !categories.length || !categoryDetails.length) return;
    // Start with all laws
    let filteredLawsList = [...laws];

    // Filter by category
    if (category) {
      const selectedCatid = categories.find(
        cat => cat?.catid == category,
      )?.catid;
      if (selectedCatid) {
        const categoryDetailIds = categoryDetails
          ?.filter(detail => detail?.category == selectedCatid)
          .map(detail => detail?.ACTID);
        filteredLawsList = filteredLawsList?.filter(law =>
          categoryDetailIds.some(id => String(id) === String(law.ACTID_help)),
        );
      }
    }

    // Filter by year
    console.log('Year From Search: ', year);
    if (year) {
      filteredLawsList = filteredLawsList?.filter(
        law => law?.Year_help?.toString() === year.toString(),
      );
    }

    // Filter by search term
    if (searchTerm) {
      filteredLawsList = filteredLawsList?.filter(law =>
        law?.title_act_help
          ? law?.title_act_help
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
          : false,
      );
    }

    setFilteredLaws(filteredLawsList);
  }, [laws, categoryDetails, categories, searchTerm, year]);

  const navigation = useNavigation();

  const handlePress = law => {
    const simplifiedLaw = {
      title_act_help: law.title_act_help,
      ACTID_help: law.ACTID_help,
      lawFile: JSON.stringify(law.title_act_help),
    };
    navigation.navigate('SingleLaw', {law: simplifiedLaw});
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Search Results</Text>
      <View>
        {filteredLaws?.length !== 0 ? (
          filteredLaws?.map(
            law =>
              law?.title_act_help && (
                <TouchableOpacity
                  onPress={() => handlePress(law)}
                  style={styles.lawButton}
                  key={law?.ACTID_help}>
                  <Text style={styles.lawButtonText}>{law.title_act_help}</Text>
                </TouchableOpacity>
              ),
          )
        ) : (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 600,
              paddingVertical: 10,
            }}>
            No Laws matching this data
          </Text>
        )}
      </View>
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
  searchData: {
    paddingHorizontal: 5,
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
    maxWidth: '100%',
  },
  lawButtonText: {
    color: '#43a047',
    textAlign: 'center',
    fontWeight: 600,
  },
});

export default SearchResults;
