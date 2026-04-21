import React, { useEffect } from 'react'
import useWorkStore from '../Store/getWorks'
import List from '../list'
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

  const filteredWorks = (category
    ? works.filter((work) => {
        // カテゴリー配列の中に選択されたものが含まれているかチェック
        const workCats = Array.isArray(work.category) ? work.category : [work.category];
        return workCats.some(cat => cat.toLowerCase() === category.toLowerCase());
      })
    : works
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  const groupedByYear = filteredWorks.reduce((acc, work) => {
    const year = new Date(work.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(work);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

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
            sortedYears.map((year) => (
              <div key={year} className="year-section mb-8">
                <div className="year-header text-[10px] mb-4 pb-2 border-b border-border-primary">
                  {year}
                </div>
                <div className="year-works">
                  {groupedByYear[year].map((work) => {
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
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">表示できる作品がありません。</div>
          )
        )}
      </div>
    </PageComponent>
  )
}

export default WorksPage
