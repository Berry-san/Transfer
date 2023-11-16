import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: '/api',

  // baseURL: 'https://api.transfermelon.com/index.php/v1/api/',
  headers: {
    'x-api-key': 987654,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export const emailInstance = axios.create({
  baseURL: '/api2',
  headers: {
    'x-api-key': 987654,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})
