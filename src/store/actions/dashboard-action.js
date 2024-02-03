import ApiResource from '../../services/api'
import ApiConstants from '../../services/api-constants'
import { requestHeaders } from '@/utils/helpers'

async function getDashboardStatistics(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.getDashboardStatistics, requestHeaders(payload?.token))

    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const DashboardApiServices = {
  getDashboardStatistics,
}
