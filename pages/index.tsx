import Head from "next/head";
import HomeMain from "../components/HomeMain";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
      <Head>
        <title>JNTUH Results Stats</title>
      </Head>
      <HomeMain />
      <Footer />
    </div>
  );
};

export default Home;
