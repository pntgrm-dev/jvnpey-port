import React from "react";

const normalizeEmbeddedYoutubeHtml = (html) => {
  if (!html || typeof html !== 'string') return html;

  const getYoutubeVideoId = (value) => {
    if (!value) return null;

    const normalized = value.trim();
    const patterns = [
      /(?:https?:)?\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/)|youtube-nocookie\.com\/embed\/|youtu\.be\/|y2u\.be\/)([A-Za-z0-9_-]{11})/i,
      /[?&]v=([A-Za-z0-9_-]{11})/i,
      /\/([A-Za-z0-9_-]{11})(?:\?|&|$)/,
    ];

    for (const pattern of patterns) {
      const match = normalized.match(pattern);
      if (match && match[1]) return match[1];
    }

    return null;
  };

  const createEmbedIframe = (src) => {
    const videoId = getYoutubeVideoId(src);
    if (!videoId) return null;

    return `<iframe src="https://www.youtube.com/embed/${videoId}?rel=0" width="560" height="315" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" loading="lazy"></iframe>`;
  };

  let normalizedHtml = html.replace(/<iframe\s+[^>]*src=["']([^"']+)["'][^>]*>/gi, (match, src) => {
    const embed = createEmbedIframe(src);
    return embed || match;
  });

  normalizedHtml = normalizedHtml.replace(/<a\s+[^>]*href=["']([^"']*(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtube-nocookie\.com\/embed\/|youtu\.be\/)[^"']*)["'][^>]*>(.*?)<\/a>/gi, (match, href, text) => {
    const embed = createEmbedIframe(href);
    if (!embed) return match;
    return embed;
  });

  return normalizedHtml;
};

const DetailComponent = ({ work }) => {
  if (!work) return null;

  const imageUrl = Array.isArray(work.img) ? work.img[0]?.url : work.img?.url || null;
  const descriptionHtml = normalizeEmbeddedYoutubeHtml(work.description || '');

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
        {descriptionHtml && (
          <div
            className="description leading-relaxed text-xxs w-max-[200px]"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}
      </div>
    </div>
  );
};

export default DetailComponent;
