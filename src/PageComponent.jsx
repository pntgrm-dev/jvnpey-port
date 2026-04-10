import React from 'react'

const PageComponent = ({ title, children }) => {
  return (
      <div className='h-full mx-2'>
          <div className='text-left text-[10px] mx-2 my-2'>{title}</div>
          <div className='text-left text-[10px] mx-2 my-2'>{children}</div>
      </div>
  )
}

export default PageComponent