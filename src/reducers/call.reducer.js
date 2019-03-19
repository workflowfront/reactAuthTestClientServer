import { callConstants } from '../constants';

export function calling(state = {}, action) {
  switch (action.type) {
    case callConstants.SUCCESS:
      return {
        type: 'calling-success',
        message: action.message
      };
    case callConstants.ERROR:
      return {
        type: 'calling-danger',
        message: action.message
      };
    case callConstants.CLEAR:
      return {};
    default:
      return state
  }
}