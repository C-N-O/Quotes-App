import axios from 'axios';

//action creator for the fetch request
export const request = () => {
  return {
    type: 'FETCH_QUOTES_REQUEST',
  };
};

//action creator for a succesful fetch
export const success = (quotes) => {
  return {
    type: 'FETCH_QUOTES_SUCCESS',
    payload: quotes,
  };
};

//action creator for a failed fetch
export const failure = (error) => {
  return {
    type: 'FETCH_QUOTES_FAILURE',
    payload: error,
  };
};

//this is an action creator
export const fetchQuotes = () => {
  return (dispatch) => {
    //dispatching the fetch request will set loading to true
    dispatch(request);

    //using axios to make the request
    axios
      .get('https://type.fit/api/quotes')
      .then((response) => {
        const quotes = response.data;

        //when we get the response, we dispatch the success action
        dispatch(success(quotes));
      })
      .catch((err) => {
        const errMsg = err.message;

        //when we do not get the response, we dispatch the failure action
        dispatch(failure(errMsg));
      });
  };
};
