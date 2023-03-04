const initialState = {
    start : false,
    restaurantDataList: [],
    loading : true
}

// Redux: Counter Reducer
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
      default: {
        return state;
      }
    }
  };
  // Exports
  export default RestaurantReducer;