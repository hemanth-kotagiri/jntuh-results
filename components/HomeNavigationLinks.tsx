import Link from 'next/link'
import { HiArrowRight } from 'react-icons/hi'

export interface Link {
  route: string
  desctiption: string[]
}

const HomeNavLinks = () => {
  const links: Link[] = [
    {
      route: '/all-r18',
      desctiption: [
        'All R18 Results',
        'Get All semester results of R18 Regulation Students given a hallticket',
      ],
    },
    {
      route: '/single',
      desctiption: [
        'Get your Result',
        'Get Results of single hallticket number',
      ],
    },
    {
      route: '/multi',
      desctiption: [
        'Get Multiple Results',
        'Get Results of more than one hallticket with statistics',
      ],
    },
    {
      route: '/notifications',
      desctiption: [
        'Notifications',
        'Get all the latest Notifications from JNTUH.',
      ],
    },
  ]

  return (
    <div className='home-links flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full'>
      {links.map((link: Link, idx: number) => (
        <Link href={link.route} key={idx}>
          <a className='border border-gray-100 dark:border-slate-800 hover:drop-shadow-sm group text-black dark:text-white shadow-2xl max-w-xs p-6 mt-6 text-left md:w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-105 hover:bg-blue-300 duration-300'>
            <h3 className='group-hover:text-black text-lg sm:text-2xl font-bold'>
              <div className='flex flex-row items-center justify-start'>
                <span className='p-1'>{link.desctiption[0]}</span>
                {<HiArrowRight />}
              </div>
            </h3>
            <p className='group-hover:text-black text-slate-500 mt-4 text-base sm:text-xl'>
              {link.desctiption[1]}
            </p>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default HomeNavLinks
