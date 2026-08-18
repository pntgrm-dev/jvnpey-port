import React from "react";

const DetailComponent = ({ work }) => {
  if (!work) return null;

  const imageUrl = Array.isArray(work.img) ? work.img[0]?.url : work.img?.url || null;

  return (
    <div className="md:max-w-md px-2">
      <div className="cover max-w-lg my-2">
        {imageUrl && imageUrl !== "/assets/image.jpg" ? (
          <img
            src={imageUrl}
            alt={work.title}
            className="w-full h-auto"
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className="text-area">
        <div className="title text-xxs font-bold">{work.title}</div>
        {work.date && (
          <div className="date text-xxs mb-2 text-gray-400">
            {work.date.slice(0, 4)}
          </div>
        )}
        {work.description && (
          <div
            className="description leading-relaxed text-xxs w-max-[200px]"
            dangerouslySetInnerHTML={{ __html: work.description }}
          />
        )}
      </div>
    </div>
  );
};

export default DetailComponent;
