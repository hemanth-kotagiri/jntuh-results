import Link from "next/link";
import HomeHeader from "./HomeHeader";

const HomeMain = () => {
  return (
    <main className="font-inter flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <HomeHeader />
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        <Link href="/notifications">
          <a className="p-6 mt-6 text-left border border-gray-600 w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300">
            <h3 className="text-white text-2xl font-bold">
              Notifications &rarr;
            </h3>
            <p className="text-gray-400 mt-4 text-xl">
              Get all the latest notifications from JNTUH.
            </p>
          </a>
        </Link>
        <Link href="/single">
          <a className="p-6 mt-6 text-left border border-gray-600 w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300">
            <h3 className="text-white text-2xl font-bold">
              Get your Result &rarr;
            </h3>
            <p className="text-gray-400 mt-4 text-xl">
              Get Results of a single hallticket number.
            </p>
          </a>
        </Link>
        <Link href="/multi">
          <a className="p-6 mt-6 text-left border border-gray-600 w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300">
            <h3 className="text-white text-2xl font-bold">
              Get Multiple Results &rarr;
            </h3>
            <p className="text-gray-400 mt-4 text-xl">
              Get Results of more than one hallticket number with analytics
            </p>
          </a>
        </Link>

        <a
          target="_blank"
          href="https://hemanth-kotagiri.github.io/sgpa-rest-api-docs/"
          className="p-6 mt-6 text-left border border-gray-600 w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300"
        >
          <h3 className="text-white text-2xl font-bold">
            API Documentation &rarr;
          </h3>
          <p className="text-gray-400 mt-4 text-xl">
            Learn about the backend that this application uses built using
            Python and Flask.
          </p>
        </a>
      </div>
    </main>
  );
};

export default HomeMain;
