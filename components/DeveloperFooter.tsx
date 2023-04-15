import {
  AiFillGithub as GitHubIcon,
  AiFillLinkedin as LinkedInIcon,
  AiFillInstagram as InstagramIcon,
} from 'react-icons/ai'
import { BsGlobe as Globe } from 'react-icons/bs'

export interface DeveloperProfileType {
  name: string
  image: string
  description: string
  role: string
  quote: string
  github: string
  linkedin: string
  website?: string
  instagram?: string
}

const DeveloperFooter = () => {
  const developers: DeveloperProfileType[] = [
    {
      name: 'Hemanth Kotagiri',
      image: 'https://avatars.githubusercontent.com/u/24365579?v=4',
      description: 'Core Maintainer & Creator of JNTUH Results Services',
      role: 'Full Stack Developer',
      quote: 'A dude who does a little bit of everything.',
      github: 'https://github.com/hemanth-kotagiri',
      linkedin: 'https://linkedin.com/in/hemanth-kotagiri/',
      website: 'https://hemanth-kotagiri.github.io',
      instagram: 'https://instagram.com/hemanth_43',
    },
    {
      name: 'Syed Ansar',
      image: 'https://avatars.githubusercontent.com/u/82027712?v=4',
      description: 'Contributor at JNTUH Results Services',
      role: 'Front End Developer & UI/UX',
      quote: 'A passionate JavaScript developer from India',
      github: 'https://github.com/Syed-Ansar/',
      linkedin: 'https://www.linkedin.com/in/syed--ansar/',
    },
    {
      name: 'Thilak Reddy',
      image: 'https://avatars.githubusercontent.com/u/64121161?v=4',
      description: 'Contributor at JNTUH Results Services',
      role: 'Backend Developer',
      quote: 'SOFTWARE DEVELOPER',
      github: 'https://github.com/ThilakReddyy',
      linkedin: 'https://www.linkedin.com/in/thilakreddyy/',
    },
  ]
  return (
    <div className='flex flex-wrap items-center justify-center'>
      {developers.map((developer: DeveloperProfileType) => (
        <figure className='max-w-lg md:flex bg-slate-100 rounded-xl m-8 dark:bg-slate-800'>
          <img
            className='w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto'
            src={developer.image}
            alt=''
            width='384'
            height='512'
          ></img>
          <div className='pt-6 md:p-8 text-center md:text-left space-y-4'>
            <figcaption className='font-medium'>
              <div className='text-sky-500 dark:text-sky-400'>
                {developer.name}
              </div>
              <div className='flex flex-row justify-center md:justify-start'>
                <a href={developer.github} target='_blank'>
                  <GitHubIcon size='1.5rem' className='dark:text-white' />
                </a>
                <a href={developer.linkedin} target='_blank'>
                  <LinkedInIcon size='1.5rem' className='dark:text-white' />
                </a>
                {developer.instagram ? (
                  <a href={developer.instagram} target='_blank'>
                    <InstagramIcon size='1.5rem' className='dark:text-white' />
                  </a>
                ) : null}
                {developer.website ? (
                  <a href={developer.website} target='_blank'>
                    <Globe size='1.5rem' className='dark:text-white' />
                  </a>
                ) : null}
              </div>
              <div className='text-slate-700 dark:text-slate-500'>
                {developer.description}
              </div>
              <div className='text-slate-700 font-bold dark:text-slate-300'>
                {developer.role}
              </div>
            </figcaption>
            <blockquote>
              <p className='p-1 text-base font-medium text-slate-700 dark:text-slate-400'>
                {developer.quote}
              </p>
            </blockquote>
          </div>
        </figure>
      ))}
    </div>
  )
}

export default DeveloperFooter
