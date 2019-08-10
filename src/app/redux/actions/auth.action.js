import { postLogin } from '../../../utils/request';

export const ACTION_LOGIN = '@@auth/ACTION_LOGIN';

export const login = ({ email, password }) => async (dispatch) => {
  const payload = await postLogin({ email, password });

  return dispatch({ type: ACTION_LOGIN, payload });
}