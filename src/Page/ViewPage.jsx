import React, { useEffect } from 'react'
import { Link } from 'react-router'
import useWorkStore from '../Store/getWorks'
import List from '../list'
import PageComponent from '../PageComponent'

const ViewPage = () => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();

  useEffect(() => {
    if (works.length === 0) fetchWorks();
  }, [fetchWorks, works.length]);

  const filteredWorks = works
    .filter((work) => {
      const workCats = Array.isArray(work.category) ? work.category : [work.category];
      return workCats.some(cat => 
        (typeof cat === 'string' && cat.toLowerCase() === 'view') ||
        (cat && typeof cat === 'object' && cat.name && cat.name.toLowerCase() === 'view')
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
    <PageComponent title="view">
      <div className="works-list max-w-xl">
        {isLoading && <div className="p-4 text-center">Loading works...</div>}
        {error && <div className="p-4 text-center">Error: {error}</div>}
        {!isLoading &&
          !error &&
          (filteredWorks.length > 0 ? (
            sortedYears.map((year) => (
              <div key={year} className="year-section">
                {/* Viewは年は非表示 */}
                <div className="year-works">
                  {groupedByYear[year].map((work) => {
                    const imageUrl =
                      work.thumbnail?.url || work.thumbnail || null;
                    return (
                      <div key={work.id} className="space-y-2">
                        <List key={work.id} {...work} />
                        {imageUrl && (
                          <Link to={`/view/${work.id}`} className="block">
                            <img
                              src={imageUrl}
                              alt={work.title || "Work thumbnail"}
                              className="w-75 md:w-125 mb-4 mx-auto object-contain cursor-pointer"
                            />
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">表示できる作品がありません。</div>
          ))}
      </div>
    </PageComponent>
  );
};

export default ViewPage;
