import React, { useEffect } from 'react'
import { Link } from 'react-router'
import useWorkStore from '../Store/getWorks'
import List from '../list'
import CardVideo from '../CardVideo'
import CardMusic from '../CardMusic'
import PageComponent from '../PageComponent'

const WorksListPage = () => {
  const { works, fetchWorks, isLoading, error } = useWorkStore();

  useEffect(() => {
    if (works.length === 0) fetchWorks();
  }, [fetchWorks, works.length]);

  const filteredWorks = works
    .filter((work) => {
      const workCats = Array.isArray(work.category) ? work.category : [work.category];
      return workCats.some(cat => 
        (typeof cat === 'string' && cat.toLowerCase() === 'works') ||
        (cat && typeof cat === 'object' && cat.name && cat.name.toLowerCase() === 'works')
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
    <PageComponent title="Works">
      <div className="works-list">
        {isLoading && <div className="p-4 text-center">Loading works...</div>}
        {error && <div className="p-4 text-center">Error: {error}</div>}
        {!isLoading && !error && (
          filteredWorks.length > 0 ? (
            sortedYears.map((year) => (
              <div key={year} className="year-section">
                {/* Worksは年は非表示 */}
                <div className="year-works">
                  {(() => {
                    const items = groupedByYear[year];
                    const mainItems = [];
                    const otherItems = [];

                    items.forEach((work) => {
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

                      const cat = work.MusicCategory || work.musicCategory;
                      const isOtherMusic = isMusic && !!(
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
                        mainItems.push({
                          ...work,
                          _type: isVideo ? 'video' : (isMusic || isPublish ? 'music' : 'other')
                        });
                      }
                    });

                    const mainGroups = [];
                    let currentMainGroup = null;
                    mainItems.forEach((item) => {
                      if (currentMainGroup && currentMainGroup.type === item._type && item._type === 'music') {
                        currentMainGroup.items.push(item);
                      } else {
                        currentMainGroup = { type: item._type, items: [item] };
                        mainGroups.push(currentMainGroup);
                      }
                    });

                    return (
                      <div className={otherItems.length > 0 ? "grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6" : "grid grid-cols-1 md:grid-cols-12 md:gap-6"}>
                        {/* メインカラム */}
                        <div className={otherItems.length > 0 ? "col-span-1 md:col-span-8" : "col-span-1 md:col-span-12"}>
                          {mainGroups.map((group, gIdx) => {
                            if (group.type === 'music') {
                              return (
                                <div key={gIdx} className={otherItems.length > 0 ? "grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4" : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4"}>
                                  {group.items.map((work) => (
                                    <CardMusic key={work.id} {...work} />
                                  ))}
                                </div>
                              );
                            } else if (group.type === 'video') {
                              return group.items.map((work) => (
                                <CardVideo key={work.id} {...work} />
                              ));
                            } else {
                              return group.items.map((work) => {
                                const imageUrl = work.thumbnail?.url || work.thumbnail || null;
                                return (
                                  <div key={work.id} className="space-y-2">
                                    <List key={work.id} {...work} />
                                  </div>
                                );
                              });
                            }
                          })}
                        </div>

                        {/* Other カラム */}
                        {otherItems.length > 0 && (
                          <div className="col-span-1 md:col-span-4 mt-0 md:border-l md:border-gray-200 md:pl-6">
                            <div className="text-xxs text-gray-500 mb-4 tracking-wider uppercase">Other</div>
                            <div className="flex flex-wrap gap-2 md:gap-4">
                              {otherItems.map((work) => (
                                <CardMusic key={work.id} {...work} />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
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

export default WorksListPage;
