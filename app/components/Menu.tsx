"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Menu = ({ isHovered }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="flex items-center space-x-5 text-sm">
        {["Home", "About", "Contact"].map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`transition-opacity duration-300 ${
              hoveredIndex !== null && hoveredIndex !== index
                ? "opacity-50"
                : ""
            }`}
          >
            <Link
              href={`/${item.toLowerCase()}`}
              className={`transition-colors duration-300 ${
                hoveredIndex === index ? (scrolled || isHovered ? "text-black" : "text-white") : (scrolled || isHovered ? "text-black" : "text-white")
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
