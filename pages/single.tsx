import axios from "axios";
import Head from "next/head";

export async function getServerSideProps() {
  const resp = await axios.get(
    "https://results-restapi.herokuapp.com/new/all/regular"
  );
  const data = await resp.data;

  return {
    props: {
      allResults: data,
    },
  };
}

export interface Result {
  exam_name: string;
  release_date: string;
  links: string[];
  degree: string;
  examCode: string;
  etype: string;
  result: string;
  type: string;
  id: number;
}

export interface Props {
  allResults: Result[];
}

export default function Single({ allResults }: Props) {
  return (
    <div>
      <Head>
        <title>JNTUH Results Stats</title>
      </Head>
      <main>
        <h1>Get Single Hallticket Results, page under construction.</h1>

        {allResults.map((item: Result, idx: number) => (
          <div
            key={idx}
            className="text-white p-6 mt-6 text-left border border-gray-700 w-96 rounded-xl"
          >
            <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-6 text-center">
              {item.exam_name}
            </h3>
            <p className="mt-4 text-m text-center">{item.links[0]}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
