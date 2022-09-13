import HomeHeader from './HomeHeader'
import HomeNavLinks from './HomeNavigationLinks'
const HomeMain = () => {
  return (
    <main className='text-center flex flex-col items-center'>
      <HomeHeader />
      <HomeNavLinks />
    </main>
  )
}

export default HomeMain
