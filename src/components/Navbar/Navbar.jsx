import { Menu } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

const pages = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Services", path: "/services" },
  { id: 4, name: "Blog", path: "/blog" },
  { id: 5, name: "Contact", path: "/contact" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  // Click anywhere outside the menu to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav ref={navRef} className='mx-10 my-10'>
      {/* Top Bar */}
      <div className='flex justify-between items-center'>
        <span className='flex items-center'>
          {/* Menu icon (only small device) */}
          <button
            className='md:hidden'
            onClick={(e) => {
              e.stopPropagation(); // prevent click from bubbling to document
              setOpen(!open);
            }}
          >
            <Menu />
          </button>
          <h1 className='ml-3'>My Navbar</h1>
        </span>

        {/* Desktop Menu */}
        <ul className='hidden md:flex'>
          {pages.map(route => (
            <li key={route.id} className='mr-10'>
              <a href={route.path}>{route.name}</a>
            </li>
          ))}
        </ul>

        {/* Sign In button - always visible */}
        <button>Sign In</button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className='md:hidden mt-5 space-y-3'>
          {pages.map(route => (
            <li key={route.id}>
              <a href={route.path}>{route.name}</a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
