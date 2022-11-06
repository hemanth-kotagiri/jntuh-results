import axios from 'axios'
import PageHead from '../components/PageHeader'
import SubjectDetails from '../components/definedTypes'
import { StudentInfoAndGPA } from '../components/StudentInfoAndGPA'
import { ResultSubjectsList } from '../components/ResultSubjectsList'
import { BiArrowBack as BackIcon } from 'react-icons/bi'
import Link from 'next/link'

interface queryProps {
  examCode: string
  result: string
  type: string
  etype: string
  degree: string
  hallticket: string
  selectedType: string
  examName: string
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
  var url = 'https://results-restapi.up.railway.app/api'
  if (query.selectedType === 'regular') {
    url += '/calculate'
  }
  url += '?hallticket=' + query.hallticket
  url += '&dob=3'
  url += '&examCode=' + query.examCode
  url += '&result=' + query.result
  url += '&type=' + query.type
  url += '&etype=' + query.etype
  url += '&degree=' + query.degree
  let data
  try {
    const resp = await axios.get(url)
    data = await resp.data
  } catch (e) {
    return {
      props: {
        data: 'error',
      },
    }
  }
  return {
    props: {
      data: data,
      examName: query.examName,
    },
  }
}

export default function Result({ data, examName }: any) {
  var sgpaInfo
  var studentInfo: studentInfoProps
  var results: SubjectDetails[]
  if (data === 'error') {
    return (
      <div className='flex flex-col items-center min-h-screen overflow-hidden text-center font-inter'>
        <PageHead
          title={'Error'}
          description={'Error: Hallticket not found'}
          url={'result'}
        />
        <Link href='/'>
          <div className='flex flex-row items-center justify-between cursor-pointer'>
            <BackIcon size='1.5rem' className='mt-6 mr-2 text-gray-400' />
            <h3 className='mt-6 text-lg font-bold sm:text-2xl text-black dark:text-white'>
              Go Back
            </h3>
          </div>
        </Link>
        <h1 className='text-xl sm:text-2xl mt-6 mb-6 text-center text-gray-400'>
          Oops, likely it's an invalid hallticket, or JNTUH servers are down!
        </h1>
        <h2 className='text-white text-center'>
          JNTUH Servers didn't respond with any data, so please try for a valid
          exam or retry after sometime.
        </h2>
      </div>
    )
  }
  if (data.length === 3) {
    sgpaInfo = data[0]
    studentInfo = data[1]
    results = data[2]
  } else {
    studentInfo = data[0]
    results = data[1]
  }
  return (
    <div className='flex-col items-center overflow-hidden text-center font-inter flex p-10'>
      <PageHead
        title={studentInfo.HTNO}
        description={'Single Hallticket Result'}
        url={'single'}
      />
      <div
        className='sm:w-max bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'
        role='alert'
      >
        <p className='font-bold'>{examName}</p>
      </div>
      <div className='items-center justify-center rounded-md dark:border-slate-800'>
        <StudentInfoAndGPA
          studentName={studentInfo.NAME}
          studentHTNO={studentInfo.HTNO}
          sgpaInfo={sgpaInfo}
        />
        <ResultSubjectsList results={results} />
      </div>
    </div>
  )
}
