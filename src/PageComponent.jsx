import React from "react";
import { useParams, useNavigate } from "react-router";

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
    <div className="relative flex  flex-col py-4 pb-12 min-h-[calc(100dvh-2rem)]">
      {/* <div className='text-left text-[10px] my-2 border border-border-primary'>{title}</div> */}

      <div
        className="note/content relative flex flex-1 flex-row items-stretch gap-3 md:gap-4 shadow-xl"
        style={{
          backgroundImage: "var(--bg-url)",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="relative shrink-0 self-stretch min-h-full -ml-[14px] w-[28px] overflow-visible bg-top bg-repeat-y bg-center bg-[length:28px_auto] md:-ml-[14px] md:w-[44px] md:bg-[length:44px_auto] mt-[8px]"
          style={{
            backgroundImage: "url('/assets/note/notering.png')",
          }}
        />
        <div className="w-full min-w-0 md:mx-auto pr-4">{children}</div>
      </div>

      {/* {id && (
        <div className="backButton">
          <button onClick={handleBack} className="text-[10px] opacity-60 hover:underline bg-none border-none cursor-pointer p-0">Back</button>
        </div>
      )} */}
    </div>
  );
};

export default PageComponent;
