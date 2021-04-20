//App initial state
const initialState = {
  loading: false,
  quotes: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_QUOTES_REQUEST':
      return {
        loading: true,
        ...state,
      };

    case 'FETCH_QUOTES_SUCCESS':
      return {
        loading: false,
        quotes: action.payload,
        error: '',
      };

    case 'FETCH_QUOTES_FAILURE':
      return {
        loading: false,
        quotes: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
