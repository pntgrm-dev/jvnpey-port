import React from "react";

const CardMusic = (props) => {
  const { title, thumbnail, artistName, releaseYear, year } = props;

  const imageUrl = thumbnail?.url || null;
  const mainTitle = artistName || title || "Untitled";
  const yearText = releaseYear || year || null;

  return (
    <div className="w-full flex flex-col items-start">
      {/* ジャケット画像 */}
      <div className="w-[120px] h-[120px] bg-black flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={mainTitle}
            className="w-full h-full object-cover select-none"
          />
        ) : (
          <div className="text-xs text-gray-500">No Image</div>
        )}
      </div>

      {/* タイトル */}
      <h2 className="mt-2 text-sm md:text-base font-semibold text-left">
        {mainTitle}
      </h2>

      {/* 年数 */}
      {yearText && (
        <p className="text-xs md:text-sm text-gray-600 text-left">{yearText}</p>
      )}
    </div>
  );
};

export default CardMusic;
