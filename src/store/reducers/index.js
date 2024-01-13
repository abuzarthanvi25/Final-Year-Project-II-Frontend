import { combineReducers } from 'redux'
import AuthReducer from 'src/store/reducers/auth-reducer'

// Concatenate all reducers

export const rootReducer = combineReducers({
  auth: AuthReducer,
})
