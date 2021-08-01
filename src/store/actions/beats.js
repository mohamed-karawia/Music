import * as actionTypes from './actionTypes';
// Axios
import axios from 'axios';

export const getBeatsStart = () => {
    return {
        type: actionTypes.GET_BEATS_START
    }
}

export const getBeatsSuccess = (data) => {
    return {
        type: actionTypes.GET_BEATS_SUCCESS,
        beats: data.beet,
        total: data.total
    }
}


export const getBeats = (queries) => {
    return dispatch => {
        dispatch(getBeatsStart())
        axios.get(`/music?page=${1}&sort=1&tap=${queries.tab}`)
        .then(res => {
            dispatch(getBeatsSuccess(res.data.data))
            console.log(res)
        })
        .catch(err => {
            console.log(err.response)
        })
    }
}
