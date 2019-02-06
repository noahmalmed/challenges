import axios from 'axios';

export const FILES_ACTIONS = {
  FILE_UPLOAD_SUCCESS: 'FILE_UPLOAD_SUCCESS',
  GET_FILES_SUCCESS: 'GET_FILES_SUCCESS',
};

const fileUploadSuccess = {
  type: FILES_ACTIONS.FILE_UPLOAD_SUCCESS,
};

const getFilesSuccess = (fileData) => ({
  type: FILES_ACTIONS.GET_FILES_SUCCESS,
  fileData,
});

export const uploadFile = (file, patientId) => (dispatch) =>
  new Promise((resolve) => {
    const data = new FormData();
    data.append('file', file);
    axios.post(
      `/api/files/${patientId}`,
      data,
    )
      .then(() => {
        dispatch(fileUploadSuccess);
        resolve();
      })
      .catch(() => { /* TODO: Implement Some error handling */ });
  });

export const getFilesForPatient = (patientId) => (dispatch) => {
  axios.get(`/api/files/${patientId}`)
    .then((res) => {
      dispatch(getFilesSuccess(res.data));
    });
};
