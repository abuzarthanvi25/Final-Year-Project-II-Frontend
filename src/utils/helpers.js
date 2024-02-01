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

export function formatDateNew(inputDateString) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const date = new Date(inputDateString);
  const formattedDate = date.toLocaleDateString('en-US', options);

  return `${formattedDate}`;
}

export const objectToFormData = (obj) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== 'null') {
      formData.append(key, value);
    }
  }

  return formData;
};

export const isCurrentUser = (senderId, currentUserId) => {
  if(!senderId || !currentUserId) return false;

  return senderId == currentUserId
}

export const getRandomColor = () => {
  const characters = '0123456789ABCDEF';
  let color = '#';

  // Generate a random color
  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }

  // Check if the newly generated color is different from the previous one
  if (color === getRandomColor.previousColor) {
    return getRandomColor(); // Recursively call the function to get a different color
  }

  // Save the current color for future comparison
  getRandomColor.previousColor = color;

  return color;
}
