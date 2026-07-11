import React, { useEffect } from 'react'
import { Link } from 'react-router'
import useWorkStore from '../Store/getWorks'
import List from '../list'
import CardVideo from '../CardVideo'
import CardMusic from '../CardMusic'
import PageComponent from '../PageComponent'

const NO_YEAR_CATEGORIES = ['music', 'publish', 'works','video','selected'];

const WorksPage = ({ category }) => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();
  const showYear = !NO_YEAR_CATEGORIES.includes(category?.toLowerCase());

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
              <div key={year} className="year-section">
                {showYear && (
                  <div className="year-header text-xxs text-gray-500 my-0.5">
                    {year}
                  </div>
                )}
                <div className="year-works">
                  {groupedByYear[year].map((work) => {
                    const workCats = Array.isArray(work.category) ? work.category : [work.category];
                    const isVideo = workCats.some(cat => 
                      (typeof cat === 'string' && cat.toLowerCase() === 'video') ||
                      (cat && typeof cat === 'object' && cat.name && cat.name.toLowerCase() === 'video')
                    );
                    const isMusic = workCats.some(cat => 
                      (typeof cat === 'string' && cat.toLowerCase() === 'music') ||
                      (cat && typeof cat === 'object' && cat.name && cat.name.toLowerCase() === 'music')
                    );
                    const isPublish = workCats.some(cat => 
                      (typeof cat === 'string' && cat.toLowerCase() === 'publish') ||
                      (cat && typeof cat === 'object' && cat.name && cat.name.toLowerCase() === 'publish')
                    );
                    const imageUrl = work.thumbnail?.url || work.thumbnail || null;
                    const shouldShowThumbnail = category?.toLowerCase() === 'selected';

                    if (isVideo) {
                      return <CardVideo key={work.id} {...work} />;
                    } else if (isMusic || isPublish) {
                      return <CardMusic key={work.id} {...work} />;
                    } else {
                      return (
                        <div key={work.id} className="space-y-2">
                          <List key={work.id} {...work} />
                          {shouldShowThumbnail && imageUrl && (
                            <Link
                              to={`/${category}/${work.id}`}
                              className="block"
                            >
                              <img
                                src={imageUrl}
                                alt={work.title || 'Work thumbnail'}
                                className="w-75 md:w-125 mb-4 mx-auto object-contain cursor-pointer"
                              />
                            </Link>
                          )}
                        </div>
                      );
                    }
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
