export const SCAN_NFC = 'SCAN_NFC';


export const scanNFC = (tid) => async dispatch => {
      console.log("dispatching SCAN_NFC action")
      return dispatch({ type: SCAN_NFC, tid });
};

