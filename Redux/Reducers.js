const initialState = {
  start: false,
  loginData: {},
  restaurantDataList: [],
  loading: false,
  loginState: false,
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
    case 'STORE_LOGIN_DATA': {
      return {
        ...state,
        loginData: action.value,
        loginState: true,
      };
    }
    default: {
      return state;
    }
  }
};
// Exports
export default RestaurantReducer;
