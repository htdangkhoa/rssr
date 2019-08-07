import { FETCH_USERS } from '../actions/home.action';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS: {
      return { ...state, users: [...state.users, ...action.payload] };
    }
    default: {
      return state;
    }
  }
}