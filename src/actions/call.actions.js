import { callConstants } from '../constants';

export const callActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: callConstants.SUCCESS, message };
}

function error(message) {
    return { type: callConstants.ERROR, message };
}

function clear() {
    return { type: callConstants.CLEAR };
}