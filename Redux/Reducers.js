const initialState = {
  start: false,
  loginData: {},
  restaurantDataList: [],
  loading: false,
  loginState: false,
  loginFailed : false
};

// Redux: Restaurant Reducer
const RestaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_LOADING': {
      return {
        ...state,
        loading: action.value,
      };
    }
    case 'FETCH_DATA_ASYNC': {
      return {
        ...state,
        restaurantDataList: action.value,
      };
    }
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        loginData: action.value,
        loginState: true,
        loginFailed: false,
        loading : false
      };
    }
    case 'INITIATE_LOGIN': {
      return {
        ...state,
        loginData: {},
        loginState: false,
        loginFailed: false,
        loading : true

      };
    }

    case 'LOGIN_FAILED': {
      return {
        ...state,
        loginData: {},
        loginState: false,
        loading : false,
        loginFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default RestaurantReducer;
