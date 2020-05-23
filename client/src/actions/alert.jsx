import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './actionTypes';

export default (msg, type) => (dispatch) => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      msg,
      type,
    },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, 3000);
};
