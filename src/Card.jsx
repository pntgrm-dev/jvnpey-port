import React, { useMemo } from 'react'

const Card = ({ title, date, img, name, description, link }) => {
  // -15度から15度の間でランダムな角度を生成（コンポーネントごとに固定）
  const randomRotation = useMemo(() => Math.floor(Math.random() * 11) - 5, []);

  // imgが配列の場合とオブジェクトの場合の両方に対応
  const imageUrl = Array.isArray(img) ? img[0]?.url : img?.url || "/assets/image.jpg";
  return (
    <div 
      className="card border grid grid-cols-1 md:grid-cols-4 gap-4 text-white p-4 mx-2 my-2 shadow-md bg-[#808080]"
      style={{ transform: `rotate(${randomRotation}deg)` }}
    >
      <div className="cover col-span-1 md:col-span-2 overflow-hidden">
        <img src={imageUrl} alt={title} className='border border-gray-300 mx-auto object-cover w-full h-auto' />
      </div>
      <div className="text-area text-left col-span-1 md:col-span-2 flex flex-col">
        <div className="title text-lg font-bold">
          {title}
        </div>
        <div className="date text-gray-300 text-sm mb-2">
          {date.slice(0, 10)}
        </div>
        <div className="description text-gray-300 leading-tight text-sm my-2" dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="links border border-gray-300 col-span-full text-sm p-2">
          <a href={link} target="_blank" rel="noopener noreferrer" className=" hover:underline">{link}</a>
      </div>
    </div>
  )
}

export default Card