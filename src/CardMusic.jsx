import React from "react";
import { Link } from "react-router";

const CardMusic = (props) => {
  const { id, category, title, date, description, link, thumbnail } = props;

  // 1. 画像URLの取得 (thumbnailから取得)
  const imageUrl = thumbnail?.url || null;

  // 2. descriptionから画像（figureタグやimgタグ）を削除してテキスト部分を残す
  let cleanDescription = description || "";
  if (cleanDescription) {
    // figureタグとその中身を削除
    cleanDescription = cleanDescription.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, '');
    // 単体のimgタグも削除
    cleanDescription = cleanDescription.replace(/<img[^>]*>/gi, '');
    cleanDescription = cleanDescription.trim();
  }

  // 3. タイトルのパース (例: "Munch, EP, 2026")
  const titleParts = title ? title.split(',').map(part => part.trim()) : [];
  
  // アーティスト名 / タイトル
  const artistName = titleParts[0] || title || "Unknown Artist";
  // アルバム名/フォーマット
  const albumName = titleParts[1] || "";
  // リリース年
  const releaseYear = titleParts[2] || (date ? date.slice(0, 4) : "");

  // 4. 下部フッターのテキスト表示 (例: "LP 180G $27.99")
  let format = "LP";
  if (albumName) {
    format = albumName.toUpperCase();
  } else if (title && title.toLowerCase().includes("12inch")) {
    format = "12INCH";
  } else if (title && title.toLowerCase().includes("ep")) {
    format = "EP";
  }

  // 表示用テキストのフォーマット (例: "EP 2026")
  const footerRightText = releaseYear ? `${format} ${releaseYear}` : format;

  const catName = Array.isArray(category) ? category[0] : (typeof category === 'object' ? category?.name : category) || 'music';

  return (
    <div className="card w-full bg-[#cacbcc] m-auto border-x-8 border-y-8 border-[#393542] overflow-hidden flex flex-col font-sans text-black shadow-sm">
      {/* メインレイアウト部分: ジャケットとテキストの横並び (モバイルでは縦並び) */}
      <div className="flex flex-row gap-6 items-stretch">
        
        {/* 左側: ジャケット画像 (黒枠の中に配置) */}
        <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] flex-shrink-0 bg-[#0c0c0c] flex items-center justify-center mx-auto md:mx-0 shadow-md">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={artistName}
              className="w-full h-full object-cover select-none"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
              No Image
            </div>
          )}
        </div>

        {/* 右側: テキスト情報 */}
        <div className="flex-1 flex flex-col justify-start text-left min-w-0 my-2">
          {/* メインタイトル (アーティスト名) */}
            <h2 className="text-[18px] font-bold tracking-tight leading-tight mb-1 text-black">
              {artistName}
            </h2>


          {/* サブタイトル (アルバム名/作品名) */}
          {albumName && (
            <h3 className="text-[14px] text-[#333333] font-medium leading-snug mb-1">
              {albumName}
            </h3>
          )}

          {/* 詳細説明文 */}
          {cleanDescription ? (
            <div 
              className="text-[11px] leading-relaxed text-[#333333] overflow-y-auto max-h-[110px] pr-2 custom-scrollbar"
              dangerouslySetInnerHTML={{ __html: cleanDescription }}
            />
          ) : (
            <div className="text-[11px] text-gray-500 italic">
              No description available.
            </div>
          )}
        </div>
      </div>

      {/* 下部: オリーブグリーンのフッター帯 */}
      <div className="w-full h-[28px] bg-[#6b7557] text-[#fef08a] px-4 flex justify-between items-center text-[10px] font-semibold tracking-widest border-t border-[#393542]">
        {/* 左側: ボリュームアイコン */}
        <div className="flex items-center">
          {/* <i className="fa-solid fa-volume-high text-[11px]"></i> */}
        </div>
        {/* 右側: フォーマット / 価格 / 年情報 */}
        <div className="uppercase">
          {footerRightText}
        </div>
      </div>
    </div>
  );
};

export default CardMusic;
