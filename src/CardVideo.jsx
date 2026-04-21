import React, { useState } from "react";
import { Link } from "react-router";

// YouTubeのURLまたはHTML(iframe)からIDを確実に抽出する関数
const getYoutubeId = (url, html) => {
  // 1. 通常のリンクから抽出試行
  if (url && typeof url === 'string' && url.trim() !== '') {
    const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[1].length === 11) return match[1];
  }

  // 2. HTML(description等)の中のiframe srcからIDを抽出試行
  if (html && typeof html === 'string') {
    const embedMatch = html.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];
  }
  
  return null;
};

const CardVideo = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { id, category, title, date, description } = props;
  
  const videoLink = props.link || props.youtubelink || props.url;
  
  const catName = Array.isArray(category) ? category[0] : (typeof category === 'object' ? category?.name : category) || 'works';
  const youtubeId = getYoutubeId(videoLink, description);
  
  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="card mb-8 w-full max-w-[720px] group border border-border-secondary">
      {youtubeId ? (
        <div className="video-embed aspect-video overflow-hidden border bg-[#cacbcc]">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      ) : (
        <div className="no-video aspect-video mb-4 bg-gray-100 flex items-center justify-center text-[12px] opacity-20 p-4">
          Video link not found
        </div>
      )}

      <div className="text-area px-2 py-1 text-left grid  gap-4 items-baseline grid-cols-[auto_40px_20px] bg-[#6b7557] border border-border-secondary">
        <Link to={`/${catName}/${id}`} className="hover:underline">
          <div className="title text-[12px] font-medium ">
            {title}
          </div>
        </Link>
        <div className="date text-[12px] opacity-30 mx-auto ">
          {date?.slice(0, 4)}
        </div>
        <div className="toggle mx-auto">
          <i class="fa-solid fa-angle-down text-[12px]" onClick={handleToggle}></i>
        </div>
      </div>
      <div className="textArea py-auto"></div>
        {isOpen && (
          <div className="text-[12px] p-2 border border-border-secondary" dangerouslySetInnerHTML={{ __html: description }}>
          </div>
        )}
      </div>
  );
};

export default CardVideo;
