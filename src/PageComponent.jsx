import React from 'react'

const PageComponent = ({ title, children }) => {
  return (
      <div className='min-h-[calc(100vh-200px)] m-1 flex flex-col p-4'>
          {/* <div className='text-left text-[10px] my-2 border border-black-300'>{title}</div> */}
          <div className='w-full mx-auto '>{children}</div>
      </div>
  )
}

export default PageComponent