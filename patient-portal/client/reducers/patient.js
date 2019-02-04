import { PATIENT_ACTIONS } from '../actions/patients';

const INITIAL_STATE = {
  isSuccess: false,
  isLoading: false,
  isFail: false,
  data: {},
};

const patientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PATIENT_ACTIONS.PATIENT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.data,
      };
    case PATIENT_ACTIONS.PATIENT_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isFail: false,
      };
    case PATIENT_ACTIONS.PATIENT_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isFail: true,
      };
    default:
      return state;
  }
};

export default patientReducer;
