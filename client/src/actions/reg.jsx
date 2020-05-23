import axios from 'axios';
import alert from './alert';

export default (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const res = await axios.post('/reg', body, config);

    setTimeout(() => {
      if (res.status === 201) {
        window.location.replace('http://localhost:3000');
      }
    }, 3000);

    dispatch(alert(res.data, 'success'));
  } catch (err) {
    const { errors } = err.response.data;

    errors.forEach((error) => dispatch(alert(error.msg, 'error')));
  }
};
