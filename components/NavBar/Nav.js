import Link from "next/link";

const NavbarData = [
  {
    id: 0,
    nav: "Home",
    link: "/"
  },
  {
    id: 1,
    nav: "Single",
    link: "/single"
  },
  {
    id: 2,
    nav: "Multiple",
    link: '/multi'
  },
  {
    id: 3,
    nav: "Notifications",
    link: '/notifications'
  },
  {
    id: 4,
    nav: "Docs",
    link: 'https://hemanth-kotagiri.github.io/sgpa-rest-api-docs/',
    target: '_blank'
  },
]

const Nav = () => {

  return <div>
    <div className="flex md:mr-6">
      {
        NavbarData.map((item) => (
          <li key={item.id} className="w-full px-[5px] sm:px[7px] md:px-3 lg:px-5 py-2 md:py-2 text-black dark:text-white hover:text-white md:font-semibold list-none hover:bg-black
                             dark:hover:bg-white dark:hover:text-black hover:rounded-sm text-sm md:text-md md:bg-inherit font-bold">
            <Link href={item.link}>
              <a target={item.target && '_blank'} className="md:bg-inherit">{item.nav}</a>
            </Link>
          </li>
        ))
      }
    </div>
  </div>;
};

export default Nav;
