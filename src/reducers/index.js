
import { combineReducers }  from 'redux';
import {
    GET_PALAVRA_REQUEST, GET_PALAVRA_SUCCESS, GET_PALAVRA__ERROR,
    POST_PALAVRA_REQUEST, POST_PALAVRA_SUCCESS, POST_PALAVRA__ERROR,
    ADD_LIST_PALAVRAS_VISTAS, CHANGE_PALAVRA_DIGITADA, T
  } from '../actions/actionsTypes'

const initialState = {
    palavrasVista: {
        list: [
            {
                palavra: 'macaco',
                pontuacoa: 30,
            },
            {
                palavra: 'garc',
                dica: 'Animal que mia'
            }
        ]
    },
    get: {
        data: {
            valor:   'te?te',
            id: '01'
        },
        error: null,
        buscando: false
    },
    post: {
        data: {},
        error: null,
        buscando: false
    },
    palavraDigitada: ' '
};

const palavra =  (state = initialState, action) => {
    switch (action.type) {
        case GET_PALAVRA_REQUEST:
            return {
                ...state,
                get: {
                    ...state.get,
                    buscando: true
                }
            };

        case GET_PALAVRA_SUCCESS:
            return {
                ...state,
                get: {
                    ...state.get,
                    buscando: false,
                    data: action.payload,
                    error: null
                }
            };

        case GET_PALAVRA__ERROR:
            return {
                ...state,
                get: {
                    ...state.get,
                    buscando: false,
                    data: {},
                    error: action.payload
                }
            };

        case POST_PALAVRA_REQUEST:
            return {
                ...state,
                post: {
                    ...state.get,
                    buscando: true
                }
            };

        case POST_PALAVRA_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.get,
                    buscando: false,
                    data: action.payload,
                    error: null
                }
            };

        case POST_PALAVRA__ERROR:
            return {
                ...state,
                post: {
                    ...state.get,
                    buscando: false,
                    data: {},
                    error: action.payload
                }
            };

        case ADD_LIST_PALAVRAS_VISTAS:
            const list = state.palavrasVista.list
            list.push(action.payload)
            return {
                ...state,
                palavrasVista: {
                    ...state.palavrasVista,
                    list: list
                }
            }

        case CHANGE_PALAVRA_DIGITADA:
            return {
                ...state,
                palavraDigitada: action.payload
            }

        default:
            return state;
    }
}

const teste =  (state = initialState, action) => {
    switch (action.type) {
        case T:
            return {
                ...state,
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    palavra,
    teste
});

export default rootReducer
