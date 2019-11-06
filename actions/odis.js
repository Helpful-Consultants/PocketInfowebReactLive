export const Types = {
  GET_ODIS_REQUEST: 'odis/get_odis_request',
  GET_ODIS_SUCCESS: 'odis/get_odis_success',
  ODIS_ERROR: 'odis/odis_error'
};

export const getOdisRequest = () => ({
  type: Types.GET_ODIS_REQUEST
});

export const getOdisSuccess = ({ items }) => ({
  type: Types.GET_ODIS_SUCCESS,
  payload: {
    items: items
  }
});

export const odisError = ({ error }) => ({
  type: Types.ODIS_ERROR,
  payload: {
    error
  }
});