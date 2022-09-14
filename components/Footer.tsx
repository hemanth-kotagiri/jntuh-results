const Footer = () => {
  return (
    <div className='footer flex items-center flex-col justify-center w-full mt-4 border-t dark:border-gray-800 font-inter'>
      <h1 className='text-black dark:text-white font-semibold text-xl mt-9'>
        Meet the <i className='passion'>Passionate</i> Developers
      </h1>
      <div className='flex flex-wrap items-center justify-center'>
        <figure className='max-w-lg md:flex bg-slate-100 rounded-xl m-8 dark:bg-slate-800'>
          <img
            className='w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto'
            src='https://avatars.githubusercontent.com/u/24365579?v=4'
            alt=''
            width='384'
            height='512'
          ></img>
          <div className='pt-6 md:p-8 text-center md:text-left space-y-4'>
            <figcaption className='font-medium'>
              <div className='text-sky-500 dark:text-sky-400'>
                Hemanth Kotagiri
              </div>
              <div className='text-slate-700 dark:text-slate-500'>
                Core Maintainer & Creator of JNTUH Results Services
              </div>
              <div className='text-slate-700 font-bold dark:text-slate-300'>
                Full Stack Developer
              </div>
            </figcaption>
            <blockquote>
              <p className='p-1 text-base font-medium text-slate-700 dark:text-slate-400'>
                A dude who does a little bit of <i>everything</i>.
              </p>
            </blockquote>
          </div>
        </figure>
        <figure className='max-w-lg md:flex bg-slate-100 rounded-xl m-8 dark:bg-slate-800'>
          <img
            className='w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto'
            src='https://avatars.githubusercontent.com/u/82027712?v=4'
            alt=''
            width='384'
            height='512'
          ></img>
          <div className='pt-6 md:p-8 text-center md:text-left space-y-4'>
            <figcaption className='font-medium'>
              <div className='text-sky-500 dark:text-sky-400'> Syed Ansar </div>
              <div className='text-slate-700 dark:text-slate-500'>
                Contributor at JNTUH Results Services
              </div>
              <div className='text-slate-700 font-bold dark:text-slate-300'>
                Front End Developer & UI/UX
              </div>
            </figcaption>
            <blockquote>
              <p className='p-1 text-base font-medium text-slate-700 dark:text-slate-400'>
                A passionate JavaScript developer from India
              </p>
            </blockquote>
          </div>
        </figure>
        <figure className='md:flex bg-slate-100 rounded-xl m-8 dark:bg-slate-800'>
          <img
            className='w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto'
            src='https://avatars.githubusercontent.com/u/64121161?v=4'
            alt=''
            width='384'
            height='512'
          ></img>
          <div className='pt-6 md:p-8 text-center md:text-left space-y-4'>
            <figcaption className='font-medium'>
              <div className='text-sky-500 dark:text-sky-400'>Thilak Reddy</div>
              <div className='text-slate-700 dark:text-slate-500'>
                Contributor at JNTUH Results Services
              </div>
              <div className='text-slate-700 font-bold dark:text-slate-300'>
                Backend Developer
              </div>
            </figcaption>
            <blockquote>
              <p className='p-1 text-base font-medium text-slate-700 dark:text-slate-400'>
                SOFTWARE DEVELOPER
              </p>
            </blockquote>
          </div>
        </figure>
      </div>
    </div>
  )
}

export default Footer
