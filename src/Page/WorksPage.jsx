import React, { useEffect } from 'react'
import useWorkStore from '../Store/getWorks'
import Card from '../Card'
import CardVideo from '../CardVideo'
import PageComponent from '../PageComponent'
import { useParams } from 'react-router'

const WorksPage = () => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();
  const { category } = useParams();

  // ページを表示した際にもデータ取得を確認（Layoutで呼ばれているが念のため）
  useEffect(() => {
    if (works.length === 0) fetchWorks();
  }, [fetchWorks, works.length]);

  const filteredWorks = category
    ? works.filter((work) => {
        // カテゴリー配列の中に選択されたものが含まれているかチェック
        const workCats = Array.isArray(work.category) ? work.category : [work.category];
        return workCats.some(cat => cat.toLowerCase() === category.toLowerCase());
      })
    : works;

  return (
    <PageComponent title={category ? `${category}` : "Works"}>
      <div className="works-list">
        {isLoading && (
          <div className="p-4 text-center">Loading works...</div>
        )}
        {error && (
          <div className="p-4 text-center">Error: {error}</div>
        )}
        {!isLoading && !error && (
          filteredWorks.length > 0 ? (
            filteredWorks.map((work) => {
              const workCats = Array.isArray(work.category) ? work.category : [work.category];
              const isVideo = workCats.some(cat => 
                (typeof cat === 'string' && cat.toLowerCase() === 'video') ||
                (cat && typeof cat === 'object' && cat.name && cat.name.toLowerCase() === 'video')
              );

              return isVideo ? (
                <CardVideo key={work.id} {...work} />
              ) : (
                  <List key={work.id} {...work} />
              )
            })
          ) : (
            <div className="p-4 text-center">表示できる作品がありません。</div>
          )
        )}
      </div>
    </PageComponent>
  )
}

export default WorksPage
