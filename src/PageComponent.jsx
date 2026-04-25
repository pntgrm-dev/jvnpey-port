import React from 'react'
import { useParams, useNavigate } from 'react-router'

const PageComponent = ({ title, children }) => {
  const { id, category } = useParams()
  const navigate = useNavigate()

  const handleBack = () => {
    if (category) {
      navigate(`/${category}`)
    } else {
      navigate('/')
    }
  }

  return (
    <div className='relative flex flex-col py-4 pb-12 lg:min-w-xl lg:min-h-[calc(100vh-200px)]'>
      {/* <div className='text-left text-[10px] my-2 border border-border-primary'>{title}</div> */}

      <div className="note/content relative -ml-[12px] flex min-h-full flex-row items-stretch gap-3 md:-ml-[28px] md:gap-4">
        <div
          className="relative shrink-0 w-[28px] overflow-visible bg-top bg-repeat-y bg-center bg-[length:28px_auto] md:w-[64px] md:bg-[length:64px_auto]"
          style={{
            backgroundImage: "url('/assets/note/notering.png')",
          }}
        />
        <div className='w-full min-w-0 md:mx-auto'>
          {children}
        </div>
      </div>

      {/* {id && (
        <div className="backButton">
          <button onClick={handleBack} className="text-[10px] opacity-60 hover:underline bg-none border-none cursor-pointer p-0">Back</button>
        </div>
      )} */}
    </div>
  )
}

export default PageComponent
