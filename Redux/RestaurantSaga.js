// Imports: Dependencies
import { delay, takeLatest, put, call } from 'redux-saga/effects';
import API from '../Api/quiries';

// Worker: Fetch Details Async 

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
  if (params?.userName?.toLowerCase() == 'krishna@123' && params?.password == 'Asdx#123') {
    return params;
  } else {
    return false;
  }
};

function* fetchDataAsync() {
  try {
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
  yield put({
    type: 'INITIATE_LOGIN',
  });
  try {

    // Delay 4 Seconds
    yield delay(4000);
    const data = yield call(loginDetails, params);
    if (!data) {
      yield put({
        type: 'LOGIN_FAILED',
      });
    } else {
      yield put({
        type: 'LOGIN_SUCCESS',
        value: data,
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
