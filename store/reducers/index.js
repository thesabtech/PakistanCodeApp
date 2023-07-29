import {combineReducers} from 'redux';
import categoriesReducer from './categoriesReducer';
import lawsReducer from './lawsReducer';
// and any other reducers you might have

const rootReducer = combineReducers({
  categories: categoriesReducer,
  laws: lawsReducer,
  // and other reducers
});

export default rootReducer;
