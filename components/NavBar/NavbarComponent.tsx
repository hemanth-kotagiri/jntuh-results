import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from './Navbar'
import { MdOutlineDarkMode, MdLightMode } from 'react-icons/md'
import { AiFillGithub as GitHubIcon } from 'react-icons/ai'

const NavBarComponent = () => {
  function handleMode() {
    setIsEnable(!isEnable)
  }

  const getMode = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mode') === 'true' ? true : false
    }
    return true
  }
  const [isEnable, setIsEnable] = useState(getMode() || false)

  useEffect(() => {
    const root = window.document.documentElement
    // Beginning of lone block
    isEnable ? root.classList.add('dark') : root.classList.remove('dark')
    // End of lone block
    localStorage.setItem('mode', JSON.stringify(isEnable))
  }, [isEnable])

  return (
    <nav className='bg-transparent shadow-xl h-20 flex items-center px-4 lg:p-8 border-b-[0.1px] dark:border-gray-800 sticky'>
      <h1 className='text-md font-bold md:text-lg lg:text-2xl flex-1 text-[#020E24] dark:text-white'>
        <Link href='/'>
          <a>JNTUH Results</a>
        </Link>
      </h1>
      <div className='hidden md:flex'>
        <Navbar />
      </div>
      <div className='flex items-center space-x-4 md:space-x-8'>
        <h1 className='cursor-pointer' onClick={handleMode}>
          {isEnable ? (
            <MdLightMode className='w-5 h-5 dark:text-white' />
          ) : (
            <MdOutlineDarkMode className='w-5 h-5' />
          )}
        </h1>
        <a
          href='https://github.com/hemanth-kotagiri/jntuh-results-stats'
          target={'_blank'}
        >
          <GitHubIcon size='1.5rem' className='dark:text-white text-black' />
        </a>
        <Link href='login'>
          <h1 className='bg-[#2465df] text-white sm:px-2 px-3 md:px-4 py-1 md:py-2 text-xs lg:text-[16px] font-medium  md:font-semibold rounded-sm  md:text-md cursor-pointer'>
            Login/Signup
          </h1>
        </Link>
      </div>
    </nav>
  )
}

export default NavBarComponent
