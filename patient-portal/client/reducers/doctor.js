import { DOCTOR_ACTIONS } from '../actions/doctors';

const INITIAL_STATE = {
  doctorRequestIsLoading: false,
  doctorRequestIsSuccess: false,
  doctorRequestIsFail: false,
  data: [],
};

const doctorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DOCTOR_ACTIONS.REQUEST_DOCTORS:
      return {
        ...state,
        doctorRequestIsLoading: true,
        doctorRequestIsFail: false,
        doctorRequestIsSuccess: false,
      };
    case DOCTOR_ACTIONS.REQUEST_DOCTORS_SUCCESS:
      return {
        ...state,
        doctorRequestIsSuccess: true,
        doctorRequestIsLoading: false,
        data: action.doctors,
      };
    case DOCTOR_ACTIONS.REQUEST_DOCTORS_FAIL:
      return {
        ...state,
        doctorRequestIsFail: true,
        doctorRequestIsLoading: false,
      }
    default:
      return state;
  }
};

export default doctorReducer;
