import { AUTH_SUCCESS } from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  accessToken: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, isAuth: true, accessToken: action.payload.token };
    default: return state;
  }
};
