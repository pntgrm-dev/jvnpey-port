import React, { useEffect } from 'react'
import useWorkStore from '../Store/getWorks'
import CardMusic from '../CardMusic'
import PageComponent from '../PageComponent'

const MusicPage = () => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();

  useEffect(() => {
    if (works.length === 0) fetchWorks();
  }, [fetchWorks, works.length]);

  const filteredWorks = works
    .filter((work) => {
      const workCats = Array.isArray(work.category) ? work.category : [work.category];
      return workCats.some(cat => 
        (typeof cat === 'string' && cat.toLowerCase() === 'music') ||
        (cat && typeof cat === 'object' && cat.name && cat.name.toLowerCase() === 'music')
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
    <PageComponent title="music">
      <div className="works-list">
        {isLoading && <div className="p-4 text-center">Loading works...</div>}
        {error && <div className="p-4 text-center">Error: {error}</div>}
        {!isLoading && !error && (
          filteredWorks.length > 0 ? (
            sortedYears.map((year) => {
              const items = groupedByYear[year];
              const mainItems = [];
              const otherItems = [];

              items.forEach((work) => {
                const cat = work.MusicCategory || work.musicCategory;
                const isOtherMusic = !!(
                  cat && (
                    cat === 'Other' ||
                    cat === 'other' ||
                    cat?.id === 'other' ||
                    cat?.value === 'Other' ||
                    cat?.value === 'other' ||
                    (Array.isArray(cat) && cat.some(item => 
                      item === 'Other' || 
                      item === 'other' || 
                      item?.id === 'other' || 
                      item?.value === 'Other' ||
                      item?.value === 'other'
                    )) ||
                    (typeof cat === 'string' && cat.toLowerCase() === 'other')
                  )
                );

                if (isOtherMusic) {
                  otherItems.push(work);
                } else {
                  mainItems.push(work);
                }
              });

              return (
                <div key={year} className="year-section">
                  {/* Musicは年は非表示 */}
                  <div className="year-works">
                    <div className={otherItems.length > 0 ? "grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6" : "grid grid-cols-1 md:grid-cols-12 md:gap-6"}>
                      {/* メインカラム */}
                      <div className={otherItems.length > 0 ? "col-span-1 md:col-span-8" : "col-span-1 md:col-span-12"}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4">
                          {mainItems.map((work) => (
                            <CardMusic key={work.id} {...work} />
                          ))}
                        </div>
                      </div>

                      {/* Other カラム */}
                      {otherItems.length > 0 && (
                        <div className="col-span-1 md:col-span-4 mt-0">
                          <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-4">
                            {otherItems.map((work) => (
                              <CardMusic key={work.id} {...work} />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center">表示できる作品がありません。</div>
          )
        )}
      </div>
    </PageComponent>
  );
};

export default MusicPage;
