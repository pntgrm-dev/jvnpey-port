import React, { useEffect } from "react";
import { Link } from "react-router";
import useWorkStore from "./Store/getWorks";

const CATEGORIES = [
  { label: "publish", path: "/publish" },
  { label: "music", path: "/music" },
  { label: "video", path: "/video" },
  { label: "archive", path: "/archive" },
  { label: "works", path: "/works" },
];

const Nav = () => {
  const { works, fetchWorks } = useWorkStore();

  useEffect(() => {
    if (works.length === 0) {
      fetchWorks();
    }
  }, [fetchWorks, works.length]);

  const hasWorkForCategory = (categoryName) => {
    return works.some((work) => {
      const workCats = Array.isArray(work.category)
        ? work.category
        : [work.category];
      return workCats.some((cat) => {
        if (typeof cat === "string") {
          return cat.toLowerCase() === categoryName.toLowerCase();
        }
        if (cat && typeof cat === "object" && cat.name) {
          return cat.name.toLowerCase() === categoryName.toLowerCase();
        }
        return false;
      });
    });
  };

  const NavItem = ({ to, children }) => (
    <li className="w-full border-none font-writing-minimalist">
      <Link
        to={to}
        className="block w-full hover:underline text-xxs text-[#1a0f1b] leading-none py-1 text-italic"
      >
        {children}
      </Link>
    </li>
  );

  return (
    <nav className=" px-1 w-full text-black font-[WrittingMimnimalist}">
      <div className="menu text-left w-full">
        <ul className="flex flex-col items-start w-full text-xl">
          <NavItem to="/CV">cv</NavItem>
          {CATEGORIES.filter(({ label }) => hasWorkForCategory(label)).map(
            ({ label, path }) => (
              <NavItem key={path} to={path}>
                {label}
              </NavItem>
            ),
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
