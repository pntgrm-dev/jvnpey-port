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

  console.log('Extracted categories:', categories); // デバッグ用ログ

  const NavItem = ({ to, children }) => (
    <li className="mx-auto md:mx-0 border-none">
      <Link to={to}>{children}</Link>
    </li>
  );

  return (
    <nav className="self-start py-2 px-4 h-auto md:h-full md:px-4 bg-black text-white">
      <div className="menu text-left text-[12px]">
        <ul className="flex flex-row md:flex-col items-start">
          <NavItem to="/CV">CV</NavItem>
          <li className="mx-auto md:mx-0 border-none">
            <a href="mailto:example@example.com">Contact</a>
          </li>
          {categories.map((cat) => (
            <NavItem key={cat} to={`/${cat}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </NavItem>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav
