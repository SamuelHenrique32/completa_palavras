import axios from 'axios'
import {
    GET_PALAVRA_REQUEST, GET_PALAVRA_SUCCESS, GET_PALAVRA__ERROR,
    POST_PALAVRA_REQUEST, POST_PALAVRA_SUCCESS, POST_PALAVRA__ERROR,
    ADD_LIST_PALAVRAS_VISTAS, CHANGE_PALAVRA_DIGITADA
} from '../actions/actionsTypes'

import {
    URL_GET_PALAVRA,
    URL_POST_PALAVRA
} from '../const/paths'

export const findPalavra = ( pontuacao, callback) => dispatch => {
    const url = URL_GET_PALAVRA + '?pontuacao=' + pontuacao
    dispatch(findPalavraRequest())
    return axios.get(url)
        .then(
            response => {
                if(callback){
                    callback(response.data)
                }
                dispatch(findPalavraSuccess(response.data))
            },
            error => dispatch(findPalavraError(error))
        )
}

const findPalavraRequest = () => {
    return{
        type: GET_PALAVRA_REQUEST
    }
}

const findPalavraSuccess = response => {
    return{
        type: GET_PALAVRA_SUCCESS,
        payload: response
    }
}

const findPalavraError = error => {
    return{
        type: GET_PALAVRA__ERROR,
        payload: error
    }
}

export const sendPalavra = (data, onSuccess, onError) => dispatch => {
    const url = URL_POST_PALAVRA + '?id=' + data.id + '&palavra=' + data.palavra
    dispatch(sendPalavraRequest())
    return axios.post(url, data)
    .then(
        response => {
            if(onSuccess){
                onSuccess(response.data)
            }
            dispatch(sendPalavraSuccess(response.data))
        },
        error => {
            if(onError){
                onError()
            }
            dispatch(sendPalavraError(error))
        }
    )
}

const sendPalavraRequest = () => {
    return{
        type: POST_PALAVRA_REQUEST
    }
}

const sendPalavraSuccess = response => {
    return{
        type: POST_PALAVRA_SUCCESS,
        payload: response
    }
}

const sendPalavraError = error => {
    return{
        type: POST_PALAVRA__ERROR,
        payload: error
    }
}

export const addListPalavrasVistas = (data) => dispatch => {
    dispatch(addListPalavrasVistasRequest(data))
}

const addListPalavrasVistasRequest = (response) => {
    return {
        type: ADD_LIST_PALAVRAS_VISTAS,
        payload: response
    }
}

export const changePalavraDigitada = (palavra) => dispatch => {
    dispatch(changePalavraDigitadaRequest(palavra))
}

const changePalavraDigitadaRequest = (response) => {
    return {
        type: CHANGE_PALAVRA_DIGITADA,
        payload: response
    }
}