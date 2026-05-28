import React from 'react'
import { Link } from 'react-router'

const CATEGORIES = [
  { label: 'Publish', path: '/publish' },
  { label: 'Works',   path: '/works'   },
  { label: 'Archive', path: '/archive' },
  { label: 'Music',   path: '/music'   },
  { label: 'Video',   path: '/video'   },
]

const Nav = () => {
  const NavItem = ({ to, children }) => (
    <li className="mx-auto md:mx-0 border-none">
      <Link to={to}>{children}</Link>
    </li>
  );

  return (
    <nav className="sticky top-0 z-0 py-4 px-12 h-auto w-full md:px-32 bg-black text-white">
      <div className="menu text-left text-[12px]">
        <ul className="flex flex-row justify-between gap-2">
          <NavItem to="/">
            <Link to="/"><div className="w-[12px] h-[12px] bg-white rounded-full"></div></Link>
          </NavItem>
          <NavItem to="/CV">CV</NavItem>
          {CATEGORIES.map(({ label, path }) => (
            <NavItem key={path} to={path}>{label}</NavItem>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav

