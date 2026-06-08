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

  // 画像URLの取得 (thumbnail -> img -> descriptionからの抽出)
  let imageUrl = work.thumbnail?.url || (Array.isArray(work.img) ? work.img[0]?.url : work.img?.url) || null;


  // descriptionから画像（figureタグやimgタグ）を削除してテキスト部分を残す
  let cleanDescription = work.description || "";
  if (cleanDescription) {
    // figureタグとその中身を削除
    cleanDescription = cleanDescription.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, '');
    // 単体のimgタグも削除
    cleanDescription = cleanDescription.replace(/<img[^>]*>/gi, '');
    cleanDescription = cleanDescription.trim();
  }

  return (
    <PageComponent title={work.title}>
      <div className='max-w-4xl flex flex-col md:flex-row gap-6 items-start'>
        {imageUrl && imageUrl !== "/assets/image.jpg" && (
          <div className="cover w-full md:w-[300px] flex-shrink-0 my-2">
            <img
              src={imageUrl}
              alt={work.title}
              className="w-full h-auto"
            />
          </div>
        )}
        <div className="text-area flex-1 min-w-0">
          <div className="title text-md font-bold ">{work.title}</div>
          <div className="date text-[10px] mb-2 text-gray-400">{work.date?.slice(0, 10)}</div>
          <div
            className="description leading-relaxed text-[12px] "
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
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
