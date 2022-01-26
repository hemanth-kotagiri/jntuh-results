import Head from "next/head";
import HomeMain from "../components/HomeMain";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col items-center overflow-hidden justify-center min-h-screen py-2 bg-gray-800">
      <Head>
        <title>JNTUH Results Stats</title>
        <meta
          property="og:url"
          content="https://jntuh-results-stats.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="JNTUH Results Statistics" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Get all results from JNTUH with just your hallticket number in one place."
        />
        <meta
          property="og:image"
          content={
            "https://raw.githubusercontent.com/hemanth-kotagiri/jntuh-results-stats/main/public/home.jpg?token=GHSAT0AAAAAABOOG2ZRUKPH7RQYTSFQLRKCYP2NTPQ"
          }
        />
      </Head>
      <HomeMain />
      <Footer />
    </div>
  );
};

export default Home;
