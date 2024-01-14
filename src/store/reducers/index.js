import { combineReducers } from 'redux'
import AuthReducer from '../reducers/auth-reducer';
import UserReducer from './user-reducer';

// Concatenate all reducers

export const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer
})
