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
        let link = `/music?page=${1}&sort=1&tap=${queries.tab}`
        if(queries.search){
            link = `/music?page=${1}&sort=1&tap=${queries.tab}&searchQ=${queries.search}`
        }
        axios.get(link)
        .then(res => {
            dispatch(getBeatsSuccess(res.data.data))
            console.log(res)
        })
        .catch(err => {
            console.log(err.response)
        })
    }
}

export const setFav = (id) => {
    return dispatch => {
        axios.put('/music/favourits', {
        beetId: id
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err.response)
    })
}
}
