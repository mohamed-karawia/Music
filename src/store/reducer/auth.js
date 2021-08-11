import * as actionTypes from '../actions/actionTypes';

const initalState = {
    token: null,
    error: '',
    loading: false,
    verify: 'false',
    checkCodeError: '',
    checkCodeLoading: false
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.VERIFY_FINISHED:
            return {
                ...state,
                loading: false
            }
        case actionTypes.CHECK_CODE_START:
            return {
                ...state,
                checkCodeLoading: true
            }
        case actionTypes.CHECK_CODE_SUCCESS:
            return {
                ...state,
                checkCodeLoading: false,
                verify: 'true',
                checkCodeError: ''
            }
        case actionTypes.CHECK_CODE_FAILED:
            return {
                ...state,
                checkCodeError: action.error,
                checkCodeLoading: false
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                error: '',
                verify: action.verify.toString()
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