import { createSelector } from 'reselect';
import {
  getSortedBookedOutTools,
  getSortedDealerWipsItemsForUser,
} from '../helpers/dealerWips';

import Types from '../constants/Types';
const INITIAL_STATE = {
  dealerWipsItems: [],
  userIntId: null,
  isLoading: false,
  isSending: false,
  error: null,
  statusCode: null,
  dataErrorUrl: null,
  lastWipProcessed: null,
  unavailableTools: false,
  fetchTime: null,
};

export const selectDealerWipsForUser = createSelector(
  (state) => state.dealerWips.dealerWipsItems,
  (state) => state.dealerWips.userIntId,

  (dealerWipsItems, userIntId) => {
    let retArr = getSortedDealerWipsItemsForUser(dealerWipsItems, userIntId);
    // console.log(
    //   '************** in selectWipsForUser',
    //   'userIntId',
    //   userIntId,
    //   'dealerWipsItems',
    //   dealerWipsItems.length,
    //   'retArr',
    //   retArr.length
    // );
    return retArr;
  }
);
export const selectBookedOutToolsForUser = createSelector(
  (state) => state.dealerWips.dealerWipsItems,

  (dealerWipsItems) => {
    let retArr = getSortedBookedOutTools(dealerWipsItems);
    // console.log(
    //   '************** in selectBookedOutToolsForUser',

    //   'dealerWipsItems',
    //   dealerWipsItems.length,
    //   'retArr',
    //   retArr
    // );
    return retArr;
  }
);

export default function dealerWips(state = INITIAL_STATE, action) {
  //   console.log(Types);
  //   console.log('action.type is:', action.type);
  switch (action.type) {
    case Types.GET_DEALER_WIPS_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.GET_DEALER_WIPS_SUCCESS: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerWipsItems: action.payload.items,
        userIntId: action.payload.userIntId || null,
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        fetchTime:
          (action.payload.fetchTime && action.payload.fetchTime) || null,
      };
    }
    case Types.CREATE_DEALER_WIP_START: {
      return {
        ...state,
        isSending: true,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.CREATE_DEALER_WIP_SUCCESS: {
      //   console.log('action.type is:', action.type);
      //   console.log('CREATE_DEALER_WIP_SUCCESS', action);
      return {
        ...state,
        lastWipProcessed: {
          ...action.payload.wipProcessed,
          statusCode:
            (action.payload.statusCode && action.payload.statusCode) || null,
          message: (action.payload.message && action.payload.message) || null,
        },
        isLoading: false,
        isSending: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.DEALER_WIP_UNAVAILABLE_TOOLS: {
      console.log('action.type is:', action.type);
      console.log(action.payload);
      return {
        ...state,
        lastWipProcessed: {
          ...action.payload.wipProcessed,
          statusCode:
            (action.payload.statusCode && action.payload.statusCode) || null,
          message: (action.payload.message && action.payload.message) || null,
        },
        isLoading: false,
        isSending: false,
        unavailableTools: true,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.DELETE_DEALER_WIP_SUCCESS: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        lastWipProcessed: {
          statusCode:
            (action.payload.statusCode && action.payload.statusCode) || null,
          message: (action.payload.message && action.payload.message) || null,
          wipNumber:
            (action.payload.wipNumber && action.payload.wipNumber) || '',
        },
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
      };
    }
    case Types.DELETE_DEALER_WIP_TOOL_SUCCESS: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        lastWipProcessed: {
          statusCode:
            (action.payload.statusCode && action.payload.statusCode) || null,
          message: (action.payload.message && action.payload.message) || null,
          wipNumber:
            (action.payload.wipNumber && action.payload.wipNumber) || '',
        },
        isLoading: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null,
      };
    }
    case Types.EMPTY_DEALER_WIPS_REQUEST: {
      //   console.log(action.payload);
      //   console.log('reducer end data');
      return {
        ...state,
        dealerWipsItems: [],
        isLoading: false,
        error: null,
        dataErrorUrl: null,
        statusCode: null,
      };
    }
    case Types.DEALER_WIPS_ERROR: {
      console.log('action.type is:', action.type);
      console.log('action.payload starts');
      console.log(action.payload);
      console.log('action.payload ends');
      return {
        ...state,
        lastWipProcessed: {},
        isLoading: false,
        isSending: false,
        error: (action.payload.error && action.payload.error) || null,
        statusCode:
          (action.payload.statusCode && action.payload.statusCode) || null,
        dataErrorUrl:
          (action.payload.dataErrorUrl && action.payload.dataErrorUrl) || null,
      };
    }
    default: {
      //   console.log(state);
      return state;
    }
  }
}
