import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const LINK_CLASSES =
  "text-gray-500 dark:text-foreground px-3 py-2 rounded-md text-sm font-medium hover:text-primary dark:hover:text-primary-foreground transition-colors";
const ACTIVE_LINK_CLASSES = "text-orange-500";

const NavLink = ({ href, label, active, onClick }) => (
  <Link
    to={href}
    className={`${LINK_CLASSES} ${active ? ACTIVE_LINK_CLASSES : ""} hover:text-orange-400`}
    onClick={onClick}
  >
    {label}
  </Link>
);

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    setActiveLink((location.pathname).substring(1));
  },[]);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = (label) => {
    setActiveLink(label);
    setMobileMenuOpen(false); // Close the menu after clicking a link
  };

  return (
    <nav className="bg-opacity-20 backdrop-blur-md w-50 fixed md:top-3 top-2 md:left-16 md:right-16 left-8 right-8 z-50 p-2 pl-6 rounded-full shadow-lg bg-zinc-100 dark:bg-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-gray-300 dark:text-primary-foreground">
          DRIVEEZZ
        </div>
        <div className="hidden md:flex space-x-4">
          {["Home", "Cars", "Contact", "About"].map((label) => (
            <NavLink
              key={label}
              href={label}
              label={label}
              active={activeLink === label}
              onClick={() => handleLinkClick(label)}
            />
          ))}
        </div>
        <div className="md:hidden flex items-center">
          <button
            id="menu-button"
            className="text-foreground dark:text-foreground hover:text-primary dark:hover:text-primary-foreground p-2 rounded-md transition-colors"
            aria-label="Menu"
            onClick={handleMobileMenuToggle}
          >
            <img
              aria-hidden="true"
              alt="menu-icon"
              src="https://openui.fly.dev/openui/24x24.svg?text=☰"
            />
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"} absolute top-0 left-0 right-0 bg-zinc-100 dark:bg-zinc-800 backdrop-blur-md rounded-lg shadow-lg transition-transform`}
      >
        <ul className="flex flex-col items-center space-y-4 py-4">
          {["Home", "Cars", "Contact", "About"].map((label) => (
            <li key={label}>
              <NavLink
                href={label}
                label={label}
                active={activeLink === label}
                onClick={() => handleLinkClick(label)}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
