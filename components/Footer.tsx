import DeveloperFooter from './DeveloperFooter'

const Footer = () => {
  return (
    <div className='footer flex items-center flex-col justify-center w-full mt-4 border-t dark:border-gray-800 font-inter'>
      <h1 className='text-black dark:text-white font-semibold text-xl mt-9'>
        Meet the <i className='passion'>Passionate</i> Developers
      </h1>
      <DeveloperFooter />
    </div>
  )
}

export default Footer
