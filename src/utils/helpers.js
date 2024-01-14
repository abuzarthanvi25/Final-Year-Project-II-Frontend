export const truncateString = (str = '', limit = 10) => {
    if (typeof str !== 'string') return
  
    if (str.length > limit) {
      return str.slice(0, limit) + '...'
    }
  
    return str
  }

export const requestHeaders = token => {
  const config = {
    headers: {
      'x-access-token': token
    }
  }

  return config
}