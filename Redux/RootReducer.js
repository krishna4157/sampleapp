// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import RestaurantReducer from './Reducers';

// Redux: Root Reducer
const RootReducer = combineReducers({
  restaurantDataList: RestaurantReducer,
});

// Exports
export default RootReducer;