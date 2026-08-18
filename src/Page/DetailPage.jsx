import React, { useEffect } from 'react'
import PageComponent from '../PageComponent'
import { useParams } from 'react-router'
import useWorkStore from '../Store/getWorks'
import DetailComponent from '../DetailComponent'

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

  return (
    <PageComponent title={work.title}>
      <DetailComponent work={work} />
    </PageComponent>
  )
}

export default DetailPage
