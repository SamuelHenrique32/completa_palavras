import axios from 'axios';
import {
    GET_PALAVRA_REQUEST,
    GET_PALAVRA_SUCCESS,
    GET_PALAVRA__ERROR,

    POST_PALAVRA_REQUEST,
    POST_PALAVRA_SUCCESS,
    POST_PALAVRA__ERROR

} from './actionsTypes'
import { URL_GET_PALAVRA, URL_POST_PALAVRA } from "../const/URL_GET_PALAVRA";

export const findPalavra = () => dispatch => {
    dispatch(findPalavraRequest())

    return axios.get(URL_GET_PALAVRA)
        .then(
            res => {
                dispatch(findPalavraSuccess(res.data))
            },
            error => {
                dispatch(findPalavraError(error))
            })
}

const findPalavraRequest = () => {
    return {
        type: GET_PALAVRA_REQUEST
    }
}

const findPalavraSuccess = (data) => {
    return {
        type: GET_PALAVRA_SUCCESS,
        payload: data
    }
}

const findPalavraError = (error) => {
    return {
        type: GET_PALAVRA__ERROR,
        payload: error
    }
}



export const sendPalavra = (data = {}) => dispatch => {
    dispatch(sendPalavraRequest())

    return axios.post(URL_POST_PALAVRA, JSON.parse(data))
        .then(
            res => {
                dispatch(sendPalavraSuccess(res.data))
            },
            error => {
                dispatch(sendPalavraError(error))
            })
}

const sendPalavraRequest = () => {
    return {
        type: POST_PALAVRA_REQUEST
    }
}

const sendPalavraSuccess = (data) => {
    return {
        type: POST_PALAVRA_SUCCESS,
        payload: data
    }
}

const sendPalavraError = (error) => {
    return {
        type: POST_PALAVRA__ERROR,
        payload: error
    }
}
