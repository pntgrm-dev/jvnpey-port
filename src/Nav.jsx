import React, { useEffect } from "react";
import { Link } from "react-router";
import useWorkStore from "./Store/getWorks";

const CATEGORIES = [
  { label: "Publish", path: "/publish" },
  { label: "Music", path: "/music" },
  { label: "Video", path: "/video" },
  { label: "Archive", path: "/archive" },
  { label: "View", path: "/view" },
  { label: "Works", path: "/works" },
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
        className="block w-full hover-band text-xxs text-text-gray leading-none py-1 text-italic"
      >
        {children}
      </Link>
    </li>
  );

  return (
    <nav className="w-full font-[WrittingMimnimalist} ml-1">
      <div className="menu text-left w-full">
        <ul className="flex flex-col items-start w-full text-xl">
          <NavItem to="/CV">CV</NavItem>
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
