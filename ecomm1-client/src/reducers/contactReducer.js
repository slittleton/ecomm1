import { MESSAGE_SUCCESS, MESSAGE_ERROR ,MESSAGE_ARCHIVED, MESSAGES_BUNDLE, MESSAGE_DELETED} from "../actions/actionTypes";

const INITIAL_STATE = {
  messageData: null,
  error: null,
  messages: null,
  messageDeleted: false,
  messageArchived: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_SUCCESS:
      return {
        ...state,
        messageData: action.payload
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case MESSAGE_ARCHIVED:
      return {
        ...state,
        messageArchived: action.payload
      };
    case MESSAGES_BUNDLE:
      return {
        ...state,
        messages: action.payload
      }
    case MESSAGE_DELETED:
      return {
        ...state,
        messageDeleted: action.payload
      }
    default:
      return state;
  }
};
