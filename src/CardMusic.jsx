import React from "react";

const CardMusic = (props) => {
  const {
    id,
    category,
    title,
    date,
    description,
    link,
    thumbnail,
    artistName,
    albumName,
    releaseYear,
    subtitle,
    year,
  } = props;

  const imageUrl = thumbnail?.url || null;
  const mainTitle = artistName || title || "Untitled";
  const subTitle = albumName || subtitle || null;
  const yearText = releaseYear || year || null;

  let cleanDescription = description || "";
  if (cleanDescription) {
    cleanDescription = cleanDescription.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, "");
    cleanDescription = cleanDescription.replace(/<img[^>]*>/gi, "");
    cleanDescription = cleanDescription.trim();
  }
  return (
    <div className="card w-full bg-[#cacbcc] m-auto  overflow-hidden flex flex-col font-sans text-black shadow-sm">
      {/* メインレイアウト部分: ジャケットとテキストの横並び (モバイルでは縦並び) */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        
        {/* 左側: ジャケット画像 (黒枠の中に配置) */}
        <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] flex-shrink-0 bg-[#0c0c0c] flex items-center justify-center mx-auto md:mx-0 shadow-md">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={artistName}
              className="w-full h-full object-cover select-none"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xxs text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* 右側: テキスト情報 */}
        <div className="flex-1 flex flex-col justify-start text-left min-w-0 my-2">
          <h2 className="text-lg font-bold tracking-tight leading-tight mb-1 text-black">
            {mainTitle}
          </h2>

          {subTitle && (
            <h3 className="text-sm text-[#333333] leading-snug mb-1">
              {subTitle}
            </h3>
          )}

          {/* 詳細説明文 */}
          {cleanDescription ? (
            <div 
              className="text-xs leading-relaxed text-[#333333] overflow-y-auto max-h-[110px] pr-2 custom-scrollbar"
              dangerouslySetInnerHTML={{ __html: cleanDescription }}
            />
          ) : (
            <div className="text-xs text-gray-500 italic">
              No description available.
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[28px] px-4 flex justify-between items-center text-xxs tracking-wides bg-grey-100 border-t border-border-secondary">
        {yearText && (
          <span className="bg-amber-100">{yearText}</span>
        )}
      </div>
    </div>
  );
};

export default CardMusic;
