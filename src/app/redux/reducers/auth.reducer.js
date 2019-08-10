import { ACTION_LOGIN } from '../actions/auth.action';

const initialState = {
  user: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_LOGIN: {
      return { ...state, user: action.payload };
    }
    default: return state;
  }
}