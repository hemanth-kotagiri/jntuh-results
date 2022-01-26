import Link from "next/link";

const HomeNavLinks = () => {
  const links = [
    {
      route: "/notifications",
      desctiption: [
        "Notifications",
        "Get all the latest Notifications from JNTUH.",
      ],
    },
    {
      route: "/single",
      desctiption: [
        "Get your Result",
        "Get Results of single hallticket number",
      ],
    },
    {
      route: "/multi",
      desctiption: [
        "Get Multiple Results",
        "Get Results of more than one hallticket with statistics",
      ],
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
      {links.map((link, idx) => (
        <Link href={link.route} key={idx}>
          <a className="p-6 mt-6 text-left border border-gray-600 w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300">
            <h3 className="text-white text-2xl font-bold">
              {link.desctiption[0]} &rarr;
            </h3>
            <p className="text-gray-400 mt-4 text-xl">{link.desctiption[1]}</p>
          </a>
        </Link>
      ))}
      <a
        target="_blank"
        href="https://hemanth-kotagiri.github.io/sgpa-rest-api-docs/"
        className="p-6 mt-6 text-left border border-gray-600 w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-300"
      >
        <h3 className="text-white text-2xl font-bold">
          API Documentation &rarr;
        </h3>
        <p className="text-gray-400 mt-4 text-xl">
          Learn about the backend that this application uses built using Python
          and Flask.
        </p>
      </a>
    </div>
  );
};

export default HomeNavLinks;
