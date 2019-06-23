import axios from 'axios'
import {
    GET_PALAVRA_REQUEST, GET_PALAVRA_SUCCESS, GET_PALAVRA__ERROR,
    POST_PALAVRA_REQUEST, POST_PALAVRA_SUCCESS, POST_PALAVRA__ERROR,
    ADD_LIST_PALAVRAS_VISTAS, CHANGE_PALAVRA_DIGITADA, T
  } from '../actions/actionsTypes'

export const findPalavra = () => dispatch => {
    console.log('findPalavra')
    return axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(
        response => findPalavraSuccess(response),
        error => findPalavraError(error)
    )
}


const findPalavraSuccess = response => {
    console.log(response)
}

const findPalavraError = error => {
    console.log(error)
}

export const sendPalavra = (data) => dispatch =>{
    console.log('sendPalavra id = {}, palavra = {}', data.id, data.palavra)
}

export const addListPalavrasVistas = () => dispatch => {
    console.log('addListPalavrasVistas')
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