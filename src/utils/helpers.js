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

export function formatDate(inputDate) {
  // Create a Date object from the input string
  const date = new Date(inputDate);

  // Extract day, month, and year
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are zero-based
  const year = date.getFullYear();

  // Format the date as "DD-MM-YYYY"
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}