import React, { useEffect } from 'react'
import PageComponent from '../PageComponent'
import { useParams } from 'react-router'
import useWorkStore from '../Store/getWorks'

const DetailPage = () => {
  const { id } = useParams();
  const { works, fetchWorks, isLoading } = useWorkStore();
  
  // 直接URLを叩いた場合のためにデータを取得
  useEffect(() => {
    if (works.length === 0) fetchWorks();
  }, [fetchWorks, works.length]);

  const work = works.find((work) => work.id === id);

  if (isLoading) return <PageComponent title="Loading..."><div className="p-4 text-center">Loading...</div></PageComponent>;
  if (!work) return <PageComponent title="Not Found"><div className="p-4 text-center">Work not found.</div></PageComponent>;

  const imageUrl = Array.isArray(work.img) ? work.img[0]?.url : work.img?.url || "/assets/image.jpg";

  return (
    <PageComponent title={work.title}>
      <div className='max-w-4xl'>
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
        <div className="text-area ">
          <div className="title text-md font-bold ">{work.title}</div>
          <div className="date text-[10px] mb-2 text-gray-400">{work.date?.slice(0, 10)}</div>
          <div
            className="description leading-relaxed text-[16px]"
            dangerouslySetInnerHTML={{ __html: work.description }}
          />
          {/* {work.link && (
            <div className="links mt-2 pt-2  border-black/10 text-[10px] text-right">
              <a href={work.link} target="_blank" rel="noopener noreferrer" className="hover:underline opacity-60">
                Link: {work.link}
              </a>
            </div>
          )} */}
        </div>
      </div>
    </PageComponent>
  )
}

export default DetailPage
