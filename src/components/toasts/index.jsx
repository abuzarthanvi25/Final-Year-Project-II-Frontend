import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={1500}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}

export const showToast = (message, type = 'success') => {
  const options = {
    position: 'top-right',
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  }

  switch (type) {
    case 'success':
      toast.success(message, options)
      break
    case 'error':
      toast.error(message, options)
      break
    default:
      toast(message, options)
  }
}

export default Toast
