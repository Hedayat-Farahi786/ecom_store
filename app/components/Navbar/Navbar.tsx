"use client";
import React, { useState, useEffect } from "react";
import logoBlack from "../../assets/images/logos/logoIcon_black.png";
import logoWhite from "../../assets/images/logos/logoIcon_white.png";
import Image from "next/image";
import UserOptions from "../UserOptions";
// import packageJson from "../../../package.json";
import NavbarEnd from "../Navbar/NavbarEnd";
import Menu from "../Menu";
import Link from "next/link";

const Navbar = () => {
  // const version = packageJson.version;
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
    <div
      className={`navbar fixed top-0 left-0 w-full px-4 md:px-6 transition-all ease-linear duration-400 hover:bg-white hover:text-black hover:from-[rgba(0,0,0,0)] hover:shadow-sm z-50 ${
        scrolled
          ? "bg-white text-black shadow-sm"
          : "bg-transparent text-white bg-gradient-to-b from-[rgba(0,0,0,0.45)] to-[rgba(0,0,0,0.0)]"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="navbar-start">
        <div className="indicator">
          {/* <span className="indicator-item badge badge-primary top-4 -right-8">
            {version}
          </span> */}
          <Link href="/" className="cursor-pointer">
            <Image
              src={scrolled || isHovered ? logoBlack : logoWhite}
              alt="logo"
              className="w-10 md:w-12"
            />
          </Link>
        </div>
      </div>

      <Menu isHovered={isHovered} />
      <NavbarEnd />
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost lg:hidden px-0 ml-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-1"
        >
          <UserOptions />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
