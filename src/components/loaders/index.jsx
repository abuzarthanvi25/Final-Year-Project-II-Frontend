import React from 'react'
import "../loaders/loader.css"

const Loader2 = () => {
  return (
    <div
      style={{
        opacity: '1 !important',
        visibility: 'visible !important',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        height: '100%',
        width: '100%',
        backgroundColor: '#fff'
      }}
    >
      <div className='lds-ellipsis' style={{ display: 'block' }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader2
