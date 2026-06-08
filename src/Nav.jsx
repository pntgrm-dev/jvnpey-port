import React from 'react'
import { Link } from 'react-router'

const CATEGORIES = [
  { label: 'Publish', path: '/publish', icon: '/assets/icons/publish.png' },
  { label: 'Works',   path: '/works',   icon: '/assets/icons/works.png' },
  { label: 'Archive', path: '/archive', icon: '/assets/icons/archive.png' },
  { label: 'Music',   path: '/music',   icon: '/assets/icons/music.png' },
  { label: 'Video',   path: '/video',   icon: '/assets/icons/video.png' },
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
        <ul className="flex flex-row justify-between gap-2 items-center">
          <NavItem to="/">
            <div className="w-[12px] h-[12px] bg-white rounded-full"></div>
          </NavItem>
          <NavItem to="/CV">
            <img src="/assets/icons/cv.png" alt="CV" className="h-[14px] w-auto object-contain" />
          </NavItem>
          {CATEGORIES.map(({ label, path, icon }) => (
            <NavItem key={path} to={path}>
              <img src={icon} alt={label} className="h-[14px] w-auto object-contain" />
            </NavItem>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav

