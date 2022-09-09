import React, { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "../NavBar/Nav"
import { MdOutlineDarkMode, MdOutlineWbSunny, MdLightMode } from 'react-icons/md';


const Navbar = (props) => {

  function handleMode() {
    setIsEnable(!isEnable);
  }

  const getMode = () => {
    return typeof window !== 'undefined' ? localStorage.getItem('mode') : 'null' || false;
  };
  const [isEnable, setIsEnable] = useState(getMode());

  useEffect(() => {
    const root = window.document.documentElement;
    // Beginning of lone block
    isEnable ? root.classList.add('dark') : root.classList.remove('dark');
    // End of lone block
    localStorage.setItem('mode', JSON.stringify(isEnable));
  }, [isEnable]);



  return (
    <>
      <nav className="bg-transparent shadow-xl h-20 flex items-center p-4 lg:p-8 border-b-[0.5px] border-white sticky">
        <h1 className="text-md font-bold md:text-lg lg:text-2xl flex-1 text-[#020E24] dark:text-white">
          <Link href='/'>
            <a>JNTUH Results.</a>
          </Link>
        </h1>
        <div className="hidden md:flex">
          <Nav />
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          <h1 className="cursor-pointer" onClick={handleMode}>
            {isEnable ? <MdLightMode className="w-5 h-5 dark:text-white" /> :
              <MdOutlineDarkMode className="w-5 h-5" />}</h1>
          <h1 className="bg-[#2465df] text-white sm:px-2 px-3 md:px-4 py-1 md:py-2 text-xs lg:text-[16px] font-medium  md:font-semibold rounded-sm  md:text-md cursor-pointer">Login/Signup</h1>
        </div>
      </nav>
    </>
  )
};

export default Navbar;
