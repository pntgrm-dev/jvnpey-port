import React from 'react'
import { useParams } from 'react-router'

const PageComponent = ({ title, children }) => {
  const { id } = useParams();

  return (
      <div className='min-h-[calc(100vh-200px)] m-1 flex flex-col p-4'>
          {/* <div className='text-left text-[10px] my-2 border border-black-300'>{title}</div> */}
          <div className='w-full mx-auto '>{children}</div>
          {id && (
            <div className="backButton">
                <a href="/" className="text-[10px] opacity-60 hover:underline">Back to Home</a>
            </div>
            )}
      </div>
  )
}

export default PageComponent