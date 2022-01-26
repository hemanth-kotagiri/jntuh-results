import Head from "next/head";
import Link from "next/link";
import HomeMain from "../components/HomeMain";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
      <Head>
        <title>JNTUH Results Stats</title>
      </Head>
      <HomeMain />

      <footer className="flex items-center justify-center w-full h-24 mt-4 border-t border-gray-700">
        <a
          className="text-white flex items-center justify-center"
          href="https://github.com/hemanth-kotagiri"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by Hemanth.
        </a>
      </footer>
    </div>
  );
}
