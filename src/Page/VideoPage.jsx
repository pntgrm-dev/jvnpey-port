import React, { useEffect } from 'react'
import useWorkStore from '../Store/getWorks'
import CardVideo from '../CardVideo'
import PageComponent from '../PageComponent'

const VideoPage = () => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();

  useEffect(() => {
    if (works.length === 0) fetchWorks();
  }, [fetchWorks, works.length]);

  const filteredWorks = works
    .filter((work) => {
      const workCats = Array.isArray(work.category) ? work.category : [work.category];
      return workCats.some(cat => 
        (typeof cat === 'string' && cat.toLowerCase() === 'video') ||
        (cat && typeof cat === 'object' && cat.name && cat.name.toLowerCase() === 'video')
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const groupedByYear = filteredWorks.reduce((acc, work) => {
    const year = new Date(work.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(work);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

  return (
    <PageComponent title="video">
      <div className="works-list">
        {isLoading && <div className="p-4 text-center">Loading works...</div>}
        {error && <div className="p-4 text-center">Error: {error}</div>}
        {!isLoading && !error && (
          filteredWorks.length > 0 ? (
            sortedYears.map((year) => (
              <div key={year} className="year-section">
                {/* Videoは年は表示 */}
                <div className="year-header text-xxs text-gray-500 my-0.5">
                  {year}
                </div>
                <div className="year-works">
                  {groupedByYear[year].map((work) => (
                    <CardVideo key={work.id} {...work} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">表示できる作品がありません。</div>
          )
        )}
      </div>
    </PageComponent>
  );
};

export default VideoPage;
