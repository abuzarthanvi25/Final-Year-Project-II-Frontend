import { combineReducers } from 'redux'
import AuthReducer from '../reducers/auth-reducer'

// Concatenate all reducers

export const rootReducer = combineReducers({
  auth: AuthReducer,
})
