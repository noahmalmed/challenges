import { FILES_ACTIONS } from '../actions/files';

const INITIAL_STATE = [];

const doctorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILES_ACTIONS.GET_FILES_SUCCESS:
      return action.fileData;
    default:
      return state;
  }
};

export default doctorReducer;
