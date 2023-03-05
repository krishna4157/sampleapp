// Imports: Dependencies
import { delay, takeEvery, takeLatest, put } from 'redux-saga/effects';
import API from '../Api/quiries';

// Worker: Increase Counter Async (Delayed By 4 Seconds)

export const fetchDetails = async () => {
  const response = await API.getRestarentsList();
  const responseData = response;
  if (responseData?.data?.data?.data) {
    return responseData.data.data.data;
  } else {
    // throw new Error('Something Went Wrong!!');
    return [];
  }
};

export const loginDetails = async params => {
  if (params.email == 'krishna@123' && params.password == '12345678') {
    return params;
  } else {
    return false;
  }
};

function* fetchDataAsync() {
  try {
    // Delay 4 Seconds
    yield put({
      type: 'START_LOADING',
      value: true,
    });

    const data = yield fetchDetails();

    // Dispatch Action To Redux Store
    yield put({
      type: 'FETCH_DATA_ASYNC',
      value: data,
    });
    yield put({
      type: 'START_LOADING',
      value: false,
    });
  } catch (error) {
    console.log(error);
  }
}

function* fetchLoginData(action) {
  const { params } = action;

  try {
    // Delay 4 Seconds
    yield put({
      type: 'START_LOADING',
      value: true,
    });
    yield delay(4000);
    const data = loginDetails(params);
    if (!data) {
      yield put({
        type: 'START_LOADING',
        value: false,
      });
    } else {
      yield put({
        type: 'STORE_LOGIN_DATA',
        value: data,
      });
      yield put({
        type: 'START_LOADING',
        value: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// Watcher: fetch restaurant data
export function* fetchRestaurantDetails() {
  // Take Last Action Only
  yield takeLatest('FETCH_DATA', fetchDataAsync);
}

// Watcher: fetch login data
export function* fetchLoginDetails() {
  yield takeLatest('FETCH_LOGIN_DATA', fetchLoginData);
}
