import Link from "next/link";
import HomeHeader from "./HomeHeader";
import HomeNavLinks from "./HomeNavigationLinks";

const HomeMain = () => {
  return (
    <main className="font-inter flex flex-col items-center justify-center w-screen flex-1 px-20 text-center">
      <HomeHeader />
      <HomeNavLinks />
    </main>
  );
};

export default HomeMain;
