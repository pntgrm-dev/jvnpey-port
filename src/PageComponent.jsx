import React from 'react'
import { useParams, useNavigate } from 'react-router'

const PageComponent = ({ title, children }) => {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    if (category) {
      navigate(`/${category}`);
    } else {
      navigate('/');
    }
  };

  return (
      <div className=' flex flex-col py-4  lg:min-h-[calc(100vh-200px)] '>
      {/* <div className='text-left text-[10px] my-2 border border-border-primary'>{title}</div> */}

      <div className="note/content flex flex-row items-stretch gap-4 absolute">
        <div
          className="shrink-0 w-[64px] overflow-hidden bg-top bg-repeat-y relative -translate-x-[70%]"
          style={{
            backgroundImage: "url('/assets/note/notering.png')",
            backgroundSize: '64px auto',
          }}
        />
        <div className='w-full mx-auto '>{children}</div>
      </div>
        
      {/* {id && (
            <div className="backButton">
                <button onClick={handleBack} className="text-[10px] opacity-60 hover:underline bg-none border-none cursor-pointer p-0">Back</button>
            </div>
            )}
      </div> */}
    </div>
  )
}

export default PageComponent
