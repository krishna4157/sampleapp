// Imports: Dependencies
import { all, fork} from 'redux-saga/effects';
// Imports: Redux Sagas
import { fetchRestaurantDetails } from './RestaurantSaga';
// Redux Saga: Root Saga
export function* rootSaga () {
  yield all([
    fork(fetchRestaurantDetails),
  ]);
};