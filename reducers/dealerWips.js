// import { Types } from '../actions/dealerWips';
import Types from '../constants/Types';
const INITIAL_STATE = {
  dealerWipsItems: [],
  isLoading: false,
  error: null
};

export default function dealerWips(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_DEALER_WIPS_START: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case Types.GET_DEALER_WIPS_SUCCESS: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerWipsItems: action.payload.items,
        isLoading: false,
        error: null
      };
    }
    case Types.CREATE_DEALER_WIP_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        lastWipProcessed: {
          code: action.payload.code,
          message: action.payload.message,
          wipNumber: action.payload.wipNumber || ''
        },
        isLoading: false,
        error: null
      };
    }
    // case Types.UPDATE_DEALER_WIP_SUCCESS: {
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     lastWipProcessed: {
    //       code: action.payload.code,
    //       message: action.payload.message,
    //       wipNumber: action.payload.wipNumber || ''
    //     },
    //     isLoading: false,
    //     error: null
    //   };
    // }
    case Types.DELETE_DEALER_WIP_SUCCESS: {
      console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        lastWipProcessed: {
          code: action.payload.code,
          message: action.payload.message,
          wipNumber: action.payload.wipNumber || ''
        },
        isLoading: false,
        error: null
      };
    }
    case Types.DELETE_DEALER_WIP_TOOL_SUCCESS: {
      console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        lastWipProcessed: {
          code: action.payload.code,
          message: action.payload.message,
          wipNumber: action.payload.wipNumber || ''
        },
        isLoading: false,
        error: null
      };
    }
    case Types.DEALER_WIPS_ERROR: {
      return {
        ...state,
        lastWipProcessed: {},
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
