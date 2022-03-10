import axios from 'axios'
import { ResultSubjectsList } from '../components/ResultSubjectsList'
import { StudentInfoAndGPA } from '../components/StudentInfoAndGPA'
import { useEffect } from 'react'
import { HashLoader } from 'react-spinners'
import Link from 'next/link'
import { BiArrowBack as BackIcon } from 'react-icons/bi'

interface queryProps {
  examCode: string
  result: string
  type: string
  etype: string
  degree: string
  selectedType: string
  fromHallticket: string
  toHallticket: string
}

interface Props {
  pathname: string
  query: queryProps
}

interface studentInfoProps {
  HTNO: string
  NAME: string
  'FATHER NAME': string
  'COLLEGE CODE': string
}

export async function getServerSideProps(givenData: Props) {
  const query = givenData.query
  var url = 'https://results-restapi.herokuapp.com/api/bulk/calculate'
  url += '?hallticket_from=' + query.fromHallticket
  url += '&hallticket_to=' + query.toHallticket
  url += '&dob=3'
  url += '&examCode=' + query.examCode
  url += '&result=' + query.result
  url += '&type=' + query.type
  url += '&etype=' + query.etype
  url += '&degree=' + query.degree
  const resp = await axios.get(url)
  let data = await resp.data
  return {
    props: {
      data: data,
    },
  }
}

function refreshPage() {
  window.location.reload()
}

export default function MultiResult({ data }: any) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (data['result'] === 'loading') {
        refreshPage()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='min-h-screen overflow-hidden text-center bg-gray-800 font-inter'>
      {data['result'] === 'loading' ? (
        <div className='flex flex-col items-center'>
          <h1 className='text-xl sm:text-2xl mt-6 mb-6 text-center text-gray-400'>
            Sit back, relax while the backend fetches all the results
          </h1>
          <hr className='sm:w-96 w-48 border-gray-700 mb-6' />
          <HashLoader color={'#ffffff'} loading={true} size={30} />
        </div>
      ) : (
        <div className='min-h-screen overflow-hidden text-center bg-gray-800 font-inter'>
          {data.length ? (
            data.map((item: any, idx: number) => (
              <div key={idx}>
                {item.length > 1 ? (
                  <div>
                    <StudentInfoAndGPA
                      studentName={item[1].NAME}
                      studentHTNO={item[1].HTNO}
                      sgpaInfo={item[0]}
                    />
                    <ResultSubjectsList results={item[2]} />
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div>
              <Link href='/'>
                <div className='flex flex-row items-center justify-center cursor-pointer'>
                  <BackIcon size='1.5rem' className='mt-6 mr-2 text-gray-400' />
                  <h3 className='mt-6 text-lg font-bold text-white sm:text-2xl'>
                    Home
                  </h3>
                </div>
              </Link>
              <h1 className='text-xl sm:text-2xl mt-6 mb-6 text-center text-gray-400'>
                Oops, looks like no one wrote that exam!
              </h1>
              <h2 className='text-white text-center'>
                JNTUH Servers didn't respond with any data, so please try for a
                valid exam.
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
