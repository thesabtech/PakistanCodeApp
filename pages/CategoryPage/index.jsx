import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  IndexPath,
  Select,
  SelectItem,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../../store/actions/categoriesAction';
import {fetchLaws} from '../../store/actions/lawsActions';
import {fetchCategoryDetails} from '../../store/actions/categoryDetailsAction';
import {useNavigation} from '@react-navigation/native';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  const categoryDetails = useSelector(
    state => state.categoryDetails.categoryDetails,
  );
  const loading = useSelector(state => state.loading);

  // const [filteredCategory, setFilteredCategory] = useState([]);
  const filteredCategory = [];
  const [selectedOption, setSelectedOption] = useState(new IndexPath(0));

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCategoryDetails());
  }, [dispatch]);

  const [categoryLaws, setCategoryLaws] = useState([]);

  const handleSelect = index => {
    setSelectedOption(index);
    const selectedCatid = categories[index.row]?.catid;

    // Check if both selectedCatid and categoryDetails array are populated
    if (selectedCatid !== undefined && categoryDetails.length > 0) {
      const filteredArray = categoryDetails.filter(
        detail => detail.category == selectedCatid,
      );

      if (filteredArray.length !== 0) {
        // setFilteredCategory(filteredArray);
        filteredCategory.push(filteredArray);
      }

      // Create an array to store laws that match filteredCategory
      const matchedLaws = [];

      // Loop through the filteredCategory and laws array to find matches
      for (let i = 0; i < filteredArray.length; i++) {
        for (let j = 0; j < laws.length; j++) {
          if (filteredArray[i].ACTID == laws[j].ACTID_help) {
            matchedLaws.push(laws[j]);
          }
        }
      }

      setCategoryLaws(matchedLaws);
    } else {
      console.log('Either selectedCatid or categoryDetails is not populated.');
      filteredCategory.push([]);
      setCategoryLaws([]);
    }
  };

  const renderSelectItem = title => <SelectItem key={title} title={title} />;

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
      <Text style={styles.pageTitle}>Categorywise Laws</Text>
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
          <Text style={styles.label}>Select Category</Text>
          <Select
            style={styles.select}
            selectedIndex={selectedOption}
            onSelect={handleSelect}
            value={categories[selectedOption.row]?.CATEGOR}
            placeholder="Select Option">
            {categories.map(cat => renderSelectItem(cat.CATEGOR))}
          </Select>
          {/* Law Mapping */}
          {loadingLaw ? (
            <View
              style={{
                flex: 1,
                backgroundColor: 'lightgrey',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Spinner style={{zIndex: 10}} />
            </View>
          ) : (
            <View>
              {categoryLaws?.map(law => (
                <TouchableOpacity
                  onPress={() => handlePress(law)}
                  style={styles.lawButton}
                  key={law.ACTID_help}>
                  <Text style={styles.lawButtonText}>{law.title_act_help}</Text>
                </TouchableOpacity>
              ))}
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

export default CategoryPage;
