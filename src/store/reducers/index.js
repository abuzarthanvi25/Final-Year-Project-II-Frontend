import { combineReducers } from 'redux'
import AuthReducer from '../reducers/auth-reducer';
import UserReducer from './user-reducer';
import CourseReducer from "./course-reducer"
import NoteReducer from "./note-reducer"
import ChatReducer from "./chat-reducer"

// Concatenate all reducers

export const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  courses: CourseReducer,
  notes: NoteReducer,
  chats: ChatReducer
})
