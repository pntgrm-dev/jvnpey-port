import React from 'react'
import useWorkStore from '../Store/getWorks'
import List from '../list'
import PageComponent from '../PageComponent'

const TopPage = () => {
  const { works, isLoading, error } = useWorkStore();
  return (
    <PageComponent title="">
    </PageComponent>
  );
}

export default TopPage