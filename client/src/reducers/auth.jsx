import { AUTH_SUCCESS, SIGN_OUT, AUTH_REFRESH } from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  accessToken: '',
  role: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, isAuth: true, accessToken: action.payload.token, role: action.payload.role,
      };
    case AUTH_REFRESH:
      return {
        ...state, isAuth: true, accessToken: action.payload.token, role: action.payload.role,
      };
    case SIGN_OUT:
      return initialState;
    default: return state;
  }
};
