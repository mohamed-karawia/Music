import * as actionTypes from '../actions/actionTypes'

const initalState = {
    beats: [],
    loading: false,
    total: 0
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.GET_BEATS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_BEATS_SUCCESS:
            return {
                ...state,
                loading: false,
                total: action.total,
                beats: action.beats
            }
        default:
            return state;
    }
}

export default reducer;