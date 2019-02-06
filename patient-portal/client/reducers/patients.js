import { PATIENT_ACTIONS } from '../actions/patients';

const INITIAL_STATE = {
  patientsRequestIsLoading: false,
  patientsRequestIsSuccess: false,
  patientsRequestIsFail: false,
  data: [],
};

const patientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PATIENT_ACTIONS.ALL_PATIENTS_REQUEST:
      return {
        ...state,
        patientsRequestIsLoading: true,
        patientsRequestIsFail: false,
        patientsRequestIsSuccess: false,
      };
    case PATIENT_ACTIONS.ALL_PATIENTS_SUCCESS:
      return {
        ...state,
        patientsRequestIsSuccess: true,
        patientsRequestIsLoading: false,
        data: action.data,
      };
    case PATIENT_ACTIONS.ALL_PATIENTS_FAIL:
      return {
        ...state,
        patientsRequestIsFail: true,
        patientsRequestIsLoading: false,
      };
    default:
      return state;
  }
};

export default patientsReducer;
