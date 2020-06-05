import axios from 'axios';
import Fingerprint2 from 'fingerprintjs2';
import alert from './alert';
import { AUTH_SUCCESS, SIGN_OUT } from './actionTypes';


// eslint-disable-next-line import/prefer-default-export
export const login = (formData) => async (dispatch) => {
  const fingerprint = Fingerprint2.getV18((result) => result);

  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const body = {
      email: formData.email,
      password: formData.password,
      fingerprint,
    };

    const res = await axios.post('/auth/login', body, config);

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    });

    if (res.status === 200) {
      window.location.replace('http://localhost:3000');
    }
  } catch (err) {
    const { errors } = err.response.data;

    errors.forEach((error) => dispatch(alert(error.msg, 'error')));
  }
};

export const signOut = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout', { withCredentials: true });

    dispatch({
      type: SIGN_OUT,
    });

  } catch (err) {
    const { errors } = err.response.data;
    errors.forEach((error) => dispatch(alert(error.msg, 'error')));
  }
};
