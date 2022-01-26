//import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import Notification from "../components/definedTypes";
import { BiArrowBack as BackIcon } from "react-icons/bi";

export async function getStaticProps() {
  console.log("Getting Data...");
  const response = await axios.get(
    "https://results-restapi.herokuapp.com/notifications"
  );
  const data: Notification[] = await response.data;
  return {
    props: {
      notifications: data,
    },
    revalidate: 60 * 30, // 30 minutes
  };
}

export interface Props {
  notifications: Notification[];
}

export default ({ notifications }: Props) => {
  return (
    <div className="overflow-hidden flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800 font-inter">
      <Link href="/">
        <div className="flex flex-row items-center justify-between cursor-pointer">
          <BackIcon size="1.5rem" className="mt-6 mr-2 text-gray-400" />
          <h3 className="text-white text-lg sm:text-2xl font-bold mt-6">
            Latest Notifications
          </h3>
        </div>
      </Link>
      <div className="max-w-xs flex flex-wrap items-center justify-around sm:max-w-4xl mt-6 sm:w-full">
        {notifications.map((item: Notification, idx: number) => (
          <div
            key={idx}
            className="text-white p-6 mt-6 text-left border border-gray-700 w-96 rounded-xl"
          >
            <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-6 text-center">
              {item.notification_date}
            </h3>
            <p className="mt-4 text-m text-center">
              {item.notification_description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
