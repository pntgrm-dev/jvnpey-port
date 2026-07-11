import React from "react";
import { useParams, useNavigate } from "react-router";
import Nav from "./Nav";

const PageComponent = ({ title, children }) => {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    if (category) {
      navigate(`/${category}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative flex  flex-col min-h-[calc(100dvh-2rem)] my-2">
      {/* <div className='text-left text-xxs my-2 border border-border-primary'>{title}</div> */}
      <div
        className="note/content relative flex flex-1 flex-row items-stretch gap-3 md:gap-4  shadow-[0px_0px_10px_rgba(0,0,0,0.5)] mr-4 py-4"
        style={{
          backgroundImage: "var(--bg-url)",
          backgroundAttachment: "scroll",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="relative shrink-0 self-stretch min-h-full -ml-[8px] w-[28px]  overflow-visible bg-top bg-center bg-[length:28px_auto] md:-ml-[14px] md:w-[44px] md:bg-[length:44px_auto] "
          style={{
            backgroundImage: "url('/assets/note/notering_05.png')",
            backgroundRepeat: "no-repeat space",
          }}
        />

        {/* <div className="shrink-0 w-[50px] z-30 pl-2 sticky top-4 h-fit self-start">
          <Nav />
          <img className="w-full mt-[5px]" src="/assets/gif/Face1.gif" alt="" />
        </div> */}

        <div className="flex-1 min-w-0 pr-4 relative overflow-x-hidden">
          <div className="absolute top-0 right-4 pointer-events-none">
            <img
              className="w-[100px] md:w-[120px]"
              src="/assets/gif/Bird.gif"
              alt=""
            />
          </div>
          <div className="absolute bottom-0 right-10 pointer-events-none">
            <img
              className="w-[120px] md:w-[120px]"
              src="/assets/gif/Dog.gif"
              alt=""
            />
          </div>
          {!id && (
            <div className="absolute z-10 left-[0px] md:left-[0px] top-[-10px] md:top-[-110px] pointer-events-none">
              <img
                className="w-[600px] md:w-[600px] mb-10"
                src="/assets/gif/Fly.gif"
                alt=""
              />
            </div>
          )}
          <div className="w-full max-w-full md:max-w-[550px] px-2 page-children overflow-x-hidden">{children}</div>
        </div>
        {/* <button onClick={handleBack} className="text-xxs opacity-60 hover:underline bg-none border-none cursor-pointer p-0">Back</button> */}
      </div>

      {/* <div className="backbutton mt-8 border-border-primary ">
        <button onClick={handleBack} className="text-xxs opacity-60 hover:underline bg-none border-none cursor-pointer p-0">Back</button>
      </div> */}

      {/* {id && (
        <div className="backButton">
          <button onClick={handleBack} className="text-xxs opacity-60 hover:underline bg-none border-none cursor-pointer p-0">Back</button>
        </div>
      )} */}
    </div>
  );
};

export default PageComponent;
