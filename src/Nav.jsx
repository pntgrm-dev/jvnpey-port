import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import useWorkStore from './Store/getWorks'

const Nav = () => {
  const { works, fetchWorks } = useWorkStore();
  const [isWorksOpen, setIsWorksOpen] = useState(false);

  // コンポーネント読み込み時にデータがなければ取得
  useEffect(() => {
    if (works.length === 0) fetchWorks();
  }, [fetchWorks, works.length]);

  // データからユニークなカテゴリーを抽出（配列形式に対応）
  const categories = [...new Set(works.flatMap(work => {
    return Array.isArray(work.category) ? work.category : [work.category];
  }).filter(Boolean))];

  return (
    <nav className='my-2 mx-2 py-2 border border-gray-300'>
      <div className="menu text-left text-sm">
        <ul className='flex flex-row md:flex-col justify-between items-left md:ml-2'>
          <li className='mx-auto md:mx-0'><Link to="/CV">CV</Link></li>
          <li className='mx-auto md:mx-0'>
            <button 
              onClick={() => setIsWorksOpen(!isWorksOpen)}
              className="cursor-pointer hover:underline focus:outline-none text-left w-full"
            >
              Works
            </button>
            {isWorksOpen && (
              <ul className="ml-3 mt-1 space-y-1 border-l border-gray-400 pl-2">
                <li className="text-xs hover:text-gray-400 my-2">
                  <Link to="/works">All</Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat} className="text-xs hover:text-gray-400 my-2">
                    <Link to={`/works/${cat}`}>{cat}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className='mx-auto md:mx-0'><Link to="/contact">Contact</Link></li>
          <li className='mx-auto md:mx-0'><Link to="/memo">Memo</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav