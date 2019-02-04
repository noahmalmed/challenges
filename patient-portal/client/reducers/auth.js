import { AUTHENTICATION_ACTIONS } from '../actions/auth';

const INITIAL_STATE = {
  isAuthenticated: false,
  authenticationRequest: false,
  authenticationFail: false,
  data: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case AUTHENTICATION_ACTIONS.AUTHENTICATED:
      newState = { ...state, isAuthenticated: true, data: action.user };
      break;
    case AUTHENTICATION_ACTIONS.AUTHENTICATION_REQUEST:
      newState = { ...state, authenticationRequest: true };
      break;
    case AUTHENTICATION_ACTIONS.AUTHENTICATION_FAIL:
      newState = { ...state, authenticationFail: true, authenticationRequest: false };
      break;
    case AUTHENTICATION_ACTIONS.RESET_STATE:
      newState = INITIAL_STATE;
      break;
    default:
      newState = state;
  }
  return newState;
};

export default authReducer;
