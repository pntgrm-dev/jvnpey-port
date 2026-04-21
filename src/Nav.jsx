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

  const NavItem = ({ to, children }) => (
    <li className="mx-auto md:mx-0 border-none md:border-l border-black-300">
      <Link to={to}>{children}</Link>
    </li>
  );

  return (
    <nav className="md:border-r border-black-300 py-2 md:px-2 h-auto md:h-full border-b md:border-b-0 px-16">
      <div className="menu text-left text-[10px]">
        <ul className="flex flex-row md:flex-col justify-between items-left gap-2">
          <NavItem to="/CV">CV</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          {categories.map((cat) => (
            <NavItem key={cat} to={`/${cat}`}>
              {cat}
            </NavItem>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav