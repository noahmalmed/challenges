import axios from 'axios';

export const AUTHENTICATION_ACTIONS = {
  AUTHENTICATED: 'AUTHENTICATED',
  AUTHENTICATION_REQUEST: 'AUTHENTICATION_REQUEST',
  AUTHENTICATION_FAIL: 'AUTHENTICATION_FAIL',
  RESET_STATE: 'RESET_STATE',
};

const authenticated = (user) => ({
  type: AUTHENTICATION_ACTIONS.AUTHENTICATED,
  user,
});

const authenticationRequest = {
  type: AUTHENTICATION_ACTIONS.AUTHENTICATION_REQUEST,
};

const authenticationFail = {
  type: AUTHENTICATION_ACTIONS.AUTHENTICATION_FAIL,
};

export const resetState = {
  type: AUTHENTICATION_ACTIONS.RESET_STATE,
};

export const login = (email, password) => (dispatch) => {
  dispatch(authenticationRequest);
  axios.post(
    '/api/auth/login',
    { email, password },
  )
    .then((res) => {
      dispatch(authenticated(res.data));
    })
    .catch(() => dispatch(authenticationFail));
};
