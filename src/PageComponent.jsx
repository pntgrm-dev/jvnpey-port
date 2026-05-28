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
    <div className="relative flex flex-col py-8 pb-16 min-h-[calc(100dvh-2rem)]">
      <div
        className="note/content relative flex flex-1 flex-row items-stretch shadow-2xl bg-[#F9F9F9]/80 backdrop-blur-sm"
        style={{
          /* 方眼ノート（グリッド）パターンと背景画像の組み合わせ */
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.07) 1px, transparent 1px),
            var(--bg-url)
          `,
          backgroundSize: "24px 24px, 24px 24px, cover",
          backgroundPosition: "top left, top left, center",
          backgroundRepeat: "repeat, repeat, no-repeat",
          backgroundAttachment: "local, local, fixed",
          backgroundBlendMode: "multiply, multiply, normal",
        }}
      >
        <div
          className="relative shrink-0 self-stretch min-h-full -ml-[14px] w-[28px] overflow-visible bg-top bg-repeat-y bg-center bg-[length:28px_auto] md:-ml-[14px] md:w-[44px] md:bg-[length:44px_auto] mt-[8px]"
          style={{
            backgroundImage: "url('/assets/note/notering.png')",
          }}
        />
        {/* UKアートサイト風の大胆でたっぷりとられた余白（Padding） */}
        <div className="w-full min-w-0 pt-12 pb-24 pl-8 pr-8 md:pl-16 md:pr-24 lg:pl-24 lg:pr-32 xl:pl-32 xl:pr-48">
          {children}
        </div>
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
