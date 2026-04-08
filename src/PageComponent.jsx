import React from 'react'

const PageComponent = ({ title, children }) => {
  return (
      <div className='border border-white/20 h-full'>
          <div className='text-left text-sm mx-4 my-2 font-bold'>{title}</div>
          <div className='text-left text-sm mx-4 my-4'>{children}</div>
      </div>
  )
}

export default PageComponent