import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import './index.css'
import App from './App'

const initialToken = {
    token: ''
}
function tokenReducer(state = initialToken, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return { ...state, token: action.payload }
        default:
            return state;
    }
}

const initialIsLogged = {
    isLogged: false
}
function isLoggedReducer(state = initialIsLogged, action) {
    switch (action.type) {
        case 'SET_LOGGED':
            return { ...state, isLogged: action.payload }
        default:
            return state;
    }
}
  
const rootReducer = combineReducers({
    token: tokenReducer,
    isLogged: isLoggedReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
