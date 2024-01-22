import { Skeleton } from '@mui/material'
import React from 'react'

const NoteSkeleton = () => {
  return (
    <div>
        <div style={{margin: '1rem', display:'flex', justifyContent:'center', height:'45px'}}>
            <Skeleton animation="wave" style={{height:'100%', width: '100%'}} variant='rectangular' component={'div'} className='p-0 m-0 w-100'/>
        </div>
        <div style={{height:'10in', margin: '1rem', display:'flex', justifyContent:'center'}} >
        <   Skeleton animation="wave" style={{height:'100%', width: '8.5in'}} variant='rectangular' component={'div'} className='p-0 m-0 w-100' />
        </div>
  </div>
  )
}

export default NoteSkeleton
