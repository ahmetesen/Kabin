import { combineReducers } from 'redux';
import loginReducer from './login-slice'
import languageReducer from './language-slice'

export default combineReducers({
  login: loginReducer,
  language: languageReducer
})