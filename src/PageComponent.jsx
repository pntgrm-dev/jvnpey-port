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
      <div className='min-h-[calc(100vh-200px)] m-1 flex flex-col p-4'>
          {/* <div className='text-left text-[10px] my-2 border border-border-primary'>{title}</div> */}
          <div className='w-full mx-auto '>{children}</div>
          {id && (
            <div className="backButton">
                <button onClick={handleBack} className="text-[10px] opacity-60 hover:underline bg-none border-none cursor-pointer p-0">Back</button>
            </div>
            )}
      </div>
  )
}

export default PageComponent