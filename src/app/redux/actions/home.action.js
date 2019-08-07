import { getUsers } from '../../../utils/request';

export const FETCH_USERS = '@@home/FETCH_USERS';

export const fetchUsers = () => async (dispatch) => {
  const data = await getUsers();
  
  return dispatch({ type: FETCH_USERS, payload: data });
}