import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import Navbar from "../components/NavBar/Navbar";
import Nav from "../components/NavBar/Nav";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <div className="bg-white dark:bg-[#020E24]">
        <NextNProgress />
        <Navbar />
        <div className="flex justify-center md:hidden w-screen mobilehidden">
          <div className="fixed bottom-5 shadow-md bg-gray-300 text-white rounded-md dark:bg-[#2465df] px-2 sm:px-4 z-auto">
            <Nav />
          </div>
        </div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
