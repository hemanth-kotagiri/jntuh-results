import axios from "axios";
import Head from "next/head";

export async function getStaticProps() {
  const resp = await axios.get(
    "https://results-restapi.herokuapp.com/new/all/regular"
  );
  const data = await resp.data;

  return {
    props: {
      allResults: data,
    },
    revalidate: 60 * 30, // 30 minutes
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

export default function Single() {
  return (
    <div>
      <Head>
        <title>JNTUH Results Stats</title>
      </Head>
      <main>
        <h1>Get Single Hallticket Results, page under construction.</h1>
      </main>
    </div>
  );
}
