import {Spinner, Text} from '@ui-kitten/components';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {fetchCategories} from '../../store/actions/categoriesAction';
import {useDispatch, useSelector} from 'react-redux';

const CategoryPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  const loading = useSelector(state => state.loading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <View>
      {loading ? (
        <View style={{flex: 1}}>
          <Spinner />
        </View>
      ) : (
        <View>
          {categories?.map(cat => (
            <Text key={cat.catid}>{cat.CATEGOR}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default CategoryPage;
