import {
    GET_PALAVRA_REQUEST, GET_PALAVRA_SUCCESS, GET_PALAVRA__ERROR,
    POST_PALAVRA_REQUEST, POST_PALAVRA_SUCCESS, POST_PALAVRA__ERROR,
    ADD_LIST_PALAVRAS_VISTAS, CHANGE_PALAVRA_DIGITADA, T
  } from '../actions/actionsTypes'

export const findPalavra = () => dispatch => {
    console.log('findPalavra')
} 

export const sendPalavra = () => dispatch =>{
    console.log('sendPalavra')
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