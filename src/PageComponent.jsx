import React from 'react'

const PageComponent = ({ title, children }) => {
  return (
      <div className='min-h-screen max-w-[1080px] mx-auto my-4 bg-[#393542] flex flex-col'>
          <div className='text-left text-[10px] mx-2 my-2'>{title}</div>
          <div className='w-full mx-auto px-4 md:px-8'>{children}</div>
      </div>
  )
}

export default PageComponent