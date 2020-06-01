import axios from 'axios';
import Fingerprint2 from 'fingerprintjs2';
import alert from './alert';
import { AUTH_SUCCESS } from './actionTypes';

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
  } catch (err) {
    const { errors } = err.response.data;

    errors.forEach((error) => dispatch(alert(error.msg, 'error')));
  }
};
