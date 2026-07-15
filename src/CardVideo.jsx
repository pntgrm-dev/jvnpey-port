import React from "react";
import { Link } from "react-router";

// YouTubeのURLまたはHTML(iframe)からIDを確実に抽出する関数
const getYoutubeId = (url, html) => {
  if (url && typeof url === "string" && url.trim() !== "") {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[1].length === 11) return match[1];
  }

  if (html && typeof html === "string") {
    const embedMatch = html.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];
  }

  return null;
};

const CardVideo = (props) => {
  const { id, category, title, date, description } = props;
  const videoLink = props.link || props.youtubelink || props.url;

  const youtubeId = getYoutubeId(videoLink, description);
  const previewImageUrl = props.thumbnail?.url || props.thumbnail || null;

  const thumbnailContent = (
    <div className="relative w-full aspect-video flex items-center justify-center overflow-hidden bg-[#cacbcc]">
      <img
        src={previewImageUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover select-none cursor-pointer"
      />
    </div>
  );

  return (
    <div className="card w-full max-w-[720px] group my-4">
      {videoLink ? (
        <a
          href={videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
        >
          {thumbnailContent}
        </a>
      ) : (
        <Link to={`/${category}/${id}`} className="block w-full h-full">
          {thumbnailContent}
        </Link>
      )}

      <div className="text-area px-2 py-1 text-left grid gap-4 items-baseline grid-cols-[auto_40px] bg-[#6b7557] border border-border-secondary">
        <div className="title text-xxs font-medium text-black">{title}</div>
      </div>
    </div>
  );
};

export default CardVideo;
