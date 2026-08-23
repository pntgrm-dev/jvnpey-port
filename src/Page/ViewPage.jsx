import React, { useEffect, useState, useRef } from 'react'
import useWorkStore from '../Store/getWorks'
import List from '../list'
import PageComponent from '../PageComponent'
import DetailComponent from '../DetailComponent'

const ViewPage = () => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();
  const [selectedWork, setSelectedWork] = useState(null);
  const detailRef = useRef(null);

  useEffect(() => {
    if (works.length === 0) fetchWorks();
  }, [fetchWorks, works.length]);

  const handleSelectWork = (work) => {
    if (selectedWork?.id === work.id) return;
    setSelectedWork(work);
    setTimeout(() => {
      detailRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

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
      <div className='flex flex-row h-[calc(100dvh-4rem)] min-h-[450px] w-full gap-1 overflow-x-visible '>
        <div className="works-list hide-scrollbar flex-1 basis-0 min-w-0 py-2 overflow-y-auto h-full overflow-x-visible pr-2">
          {isLoading && <div className="p-4 text-center">Loading works...</div>}
          {error && <div className="p-4 text-center">Error: {error}</div>}
          {!isLoading && !error && (
            filteredWorks.length > 0 ? (
              sortedYears.map((year) => (
                <div key={year} className="year-section w-full min-w-0">
                  <div className="year-header text-xxs text-gray-500 my-0.5 w-full min-w-0">
                    {year}
                  </div>
                  <div className="year-works w-full min-w-0">
                    {groupedByYear[year].map((work) => (
                      <List
                        key={work.id}
                        {...work}
                        onClick={() => handleSelectWork(work)}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center">表示できる作品がありません。</div>
            )
          )}
        </div>

        <div className="worksDetail hide-scrollbar flex-3 basis-0 min-w-0 py-2 overflow-y-auto h-full overflow-x-visible pr-1 md:pr-0" ref={detailRef}>
          {selectedWork ? (
            <DetailComponent work={selectedWork} />
          ) : (
            <div className="text-xxs text-gray-400 taext-center py-4">
              ...
            </div>
          )}
        </div>
      </div>
    </PageComponent>
  );
};

export default ViewPage;
