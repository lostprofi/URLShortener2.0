import axios from 'axios';
import getFingerpint from '../utils/getFingerprint';
import { LINK_SHORTENED, AUTH_REFRESH } from './actionTypes';
import alert from './alert';


export default (fullURL, accessToken) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'x-auth-token': accessToken,
      },
    };

    const body = {
      fullURL,
    };

    const res = await axios.post('/shortcuts', body, config);

    dispatch({
      type: LINK_SHORTENED,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response;

    /* dispatch({
      type: AUTH_FAIL
    })*/

    // refresh token

    if (error.status === 401) {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };

        const fingerprint = await getFingerpint();

        const body = {
          fingerprint,
        };

        const res = await axios.post('/auth/refresh-token', body, config);

        console.log(res.data);
        dispatch({
          type: AUTH_REFRESH,
          payload: res.data,
        });
      } catch (e) {
        console.log(e.response.data.errors);
        // sessionStorage.clear();
        // window.location.replace('http://localhost:3000/auth');
      }
      
    }
  }
};
