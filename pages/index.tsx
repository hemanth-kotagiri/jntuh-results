import Head from "next/head";
import Link from "next/link";

export interface Notification {
  notification_date: string;
  notification_description: string;
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
      <Head>
        <title>JNTUH Results Stats</title>
      </Head>

      <main className="font-inter flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-white text-6xl font-bold">
          Welcome to{" "}
          <a
            className="text-blue-400 hover:text-blue-600 hover:underline"
            href="https://github.com/hemanth-kotagiri/jntuh-results-stats"
            target="_blank"
          >
            JNTUH Results Statistics
          </a>
        </h1>

        <p className="text-gray-400 mt-6 text-xl">
          Get all your results in one place.{" "}
          <i>
            Just your <b>hallticket</b>, to rule them all.
          </i>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link href="/notifications">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-white text-2xl font-bold">
                Notifications &rarr;
              </h3>
              <p className="text-gray-400 mt-4 text-xl">
                Get all the latest notifications from JNTUH.
              </p>
            </a>
          </Link>
          <Link href="/single">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-white text-2xl font-bold">
                Get your Result &rarr;
              </h3>
              <p className="text-gray-400 mt-4 text-xl">
                Get Results of a single hallticket number.
              </p>
            </a>
          </Link>
          <Link href="/multi">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
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
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
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
