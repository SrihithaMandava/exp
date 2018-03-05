import {
  SCAN_NFC,
} from './Actions';

const initialState = {
  tid: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SCAN_NFC:
      return {
        ...state,
        tid: action.tid,
      };
    default:
      return state;
  }
};
