// Imports: Dependencies
import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
import API from '../Api/quiries';

// Worker: Increase Counter Async (Delayed By 4 Seconds)

export const fetchDetails = async () => {
    const response = await API.getRestarentsList();
    const responseData = response;
    if(responseData.data.data.data){
        return responseData.data.data.data;
    } else {
        throw new Error('Something Went Wrong!!');
    }
}

function* fetchDataAsync() {
  try {
    // Delay 4 Seconds
    yield put({
        type: 'START_LOADING',
        value: true,
      });

    const data = yield fetchDetails();
    yield put({
        type: 'START_LOADING',
        value: false,
      });
    // Dispatch Action To Redux Store
    yield put({
      type: 'FETCH_DATA_ASYNC',
      value: data,
    });
  }
  catch (error) {
    console.log(error);
  }
};
// Watcher: Increase Counter Async
export function* fetchRestaurantDetails() {
  // Take Last Action Only
  yield takeLatest('FETCH_DATA', fetchDataAsync);
};

