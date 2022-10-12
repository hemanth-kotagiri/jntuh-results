import Link from 'next/link'
import { useState } from 'react'
import { BiArrowBack as BackIcon } from 'react-icons/bi'
import { RingLoader } from 'react-spinners'
import PageHead from '../components/PageHeader'

export default function AllR18Results() {
  // TODO: Add Validation
  const [hallticket, setHallticket] = useState('')
  const [validationText, setValidationText] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div className='text-base text-black dark:text-white flex flex-col items-center min-h-screen py-2 overflow-hidden font-inter'>
      <PageHead
        title={'Get All Semester Results of R18 Students'}
        description={
          'Given a hallticket number belonging to R18 Regulation, get results of all semesters along with GPA'
        }
        url={'all-r18'}
      />
      <div
        className='my-4 rounded bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 text-center md:text-left m-6'
        role='alert'
      >
        <p className='font-bold'>Please Note</p>
        <p>This feature only works if you belong to the R18 Regulation</p>
      </div>
      <Link href='/'>
        <div className='flex flex-row items-center justify-between cursor-pointer'>
          <BackIcon size='1.5rem' className='mt-6 mr-2 text-gray-400' />
          <h3 className='mt-6 text-lg font-bold sm:text-2xl text-black dark:text-white'>
            Home
          </h3>
        </div>
      </Link>
      <p className='m-4 text-center text-base sm:text-xl text-black  dark:text-white'>
        Please input your hallticket number below to fetch all results of all
        semsters of R18 Regulation along with GPA
      </p>
      <input
        type='text'
        name='hallticket'
        placeholder='e.g: 185U1A0565'
        className='form dark:text-white text-black dark:bg-[#020E24] text-center border border-gray-500 cursor-black outline-none'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setHallticket(e.target.value)
        }}
      />
      {validationText.length ? (
        <div
          className='jiggle p-4 m-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800'
          role='alert'
        >
          <span className='font-medium'>{validationText}</span>
        </div>
      ) : null}
      {loading ? (
        <div className='m-6 flex items-center justify-center'>
          <RingLoader color={''} loading={true} size={50} />
        </div>
      ) : (
        <Link
          href={{ pathname: 'allresults', query: { hallticket: hallticket } }}
        >
          <button
            onClick={async (
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              if (hallticket.length !== 10 && hallticket.length < 10) {
                setValidationText(
                  'What, no! Your hallticket must be 10 digits!'
                )
                e.preventDefault()
              } else if (hallticket.length > 10) {
                setValidationText('Oops, hallticket longer than 10 digits!')
                e.preventDefault()
              } else {
                setValidationText('')
                setLoading(!loading)
              }
            }}
            className='my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Fetch All Results!
          </button>
        </Link>
      )}
    </div>
  )
}
