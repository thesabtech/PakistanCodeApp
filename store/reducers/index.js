import {combineReducers} from 'redux';
import categoriesReducer from './categoriesReducer';
import lawsReducer from './lawsReducer';
import categoryDetailReducer from './categoryDetailReducer';
// and any other reducers you might have

const rootReducer = combineReducers({
  categories: categoriesReducer,
  laws: lawsReducer,
  categoryDetails: categoryDetailReducer,
  // and other reducers
});

export default rootReducer;
