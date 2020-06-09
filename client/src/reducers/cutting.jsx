import { LINK_SHORTENED } from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case LINK_SHORTENED: {
      const isShortURLRepeat = state.find((obj) => obj.fullURL === action.payload.fullURL);

      if (isShortURLRepeat) {
        return [...state];
      }

      return [...state, action.payload];
    }
    default:
      return state;
  }
};
