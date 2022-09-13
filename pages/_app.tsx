import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import NavbarComponent from '../components/NavBar/NavbarComponent'
import Navbar from '../components/NavBar/Navbar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()
  const path = router.pathname
  const listenToScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement
    const { innerHeight } = window
    console.log(scrollTop, offsetHeight, innerHeight)

    const bottomOfWindow =
      Math.round(scrollTop) + innerHeight + 800 > offsetHeight

    if (bottomOfWindow) {
      isVisible && // to limit setting state only the first time
        setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }
  if (typeof window !== 'undefined') {
    useEffect(() => {
      window.addEventListener('scroll', listenToScroll)
      return () => window.removeEventListener('scroll', listenToScroll)
    }, [])
  }

  return (
    <>
      <div className='font-inter bg-white dark:bg-[#020E24]'>
        <NextNProgress />
        <NavbarComponent />
        <Component {...pageProps} />
        <div className='flex justify-center md:hidden w-screen mobilehidden'>
          {path != '/' ? (
            <div
              className={`${isVisible ? 'fixed bottom-2' : null
                } shadow-md bg-gray-300 text-white rounded-md dark:bg-[#2465df] px-2 sm:px-4 z-auto`}
            >
              <Navbar />
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default MyApp
