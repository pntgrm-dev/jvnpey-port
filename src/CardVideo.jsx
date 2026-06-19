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
  const [isPlaying, setIsPlaying] = useState(false);
  const { id, category, title, date, description } = props;
  
  const videoLink = props.link || props.youtubelink || props.url;
  
  const catName = Array.isArray(category) ? category[0] : (typeof category === 'object' ? category?.name : category) || 'works';
  const youtubeId = getYoutubeId(videoLink, description);

  return (
    <div className="card w-full max-w-[720px] group border-4 border-border-secondary">
      {youtubeId ? (
        <div className="video-embed aspect-video overflow-hidden border bg-[#cacbcc] relative">
          {isPlaying ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : (
            <div 
              className="relative w-full h-full cursor-pointer flex items-center justify-center"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover select-none"
              />
              {/* カスタム再生ボタンオーバーレイ */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 flex items-center justify-center transition-colors">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-black fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="no-video aspect-video mb-4 bg-gray-100 flex items-center justify-center text-[10px] opacity-20 p-4">
          Video link not found
        </div>
      )}

      <div className="text-area px-2 py-1 text-left grid gap-4 items-baseline grid-cols-[auto_40px] bg-[#6b7557] border border-border-secondary">
        <div className="title text-[10px] font-medium text-white">
          {title}
        </div>
        <div className="date text-[10px] opacity-50 mx-auto text-white">
          {date?.slice(0, 4)}
        </div>
      </div>
    </div>
  );
};

export default CardVideo;
