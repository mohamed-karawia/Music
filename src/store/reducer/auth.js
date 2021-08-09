import * as actionTypes from '../actions/actionTypes';

const initalState = {
    token: null,
    error: '',
    loading: false,
    verify: false
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.VERIFT_FINISHED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                error: '',
                verify: action.verify
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null
            }
        default:
            return state;
    }
}

export default reducer;