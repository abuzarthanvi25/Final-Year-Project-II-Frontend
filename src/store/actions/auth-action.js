import ApiResource from '../../services/api'
import ApiConstants from '../../services/api-constants'

async function login(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.login, payload?.body)

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function register(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.signUp, payload?.body)

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}


export const AuthApiServices = {
  login,
  register,
}
