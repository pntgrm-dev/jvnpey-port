import React from 'react'
import useWorkStore from '../Store/getWorks'
import PageComponent from '../PageComponent'

const TopPage = () => {
  const { works, isLoading, error } = useWorkStore();
  return (
    <PageComponent title="All Works">
      <div className="works-list">
        {isLoading && (
          <div className="text-white p-4 text-center">Loading works...</div>
        )}
        {error && (
          <div className="text-red-500 p-4 text-center">Error: {error}</div>
        )}
        {!isLoading &&
          !error &&
          works.map((work) => (
            <Card
              key={work.id}
              date={work.date}
              title={work.title}
              img={work.img}
              name={work.name}
              description={work.description}
              link={work.link}
            />
          ))}
      </div>
    </PageComponent>
  );
}

export default TopPage