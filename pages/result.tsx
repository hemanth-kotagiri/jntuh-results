import axios from 'axios'
import PageHead from '../components/PageHeader'

export interface queryProps {
  examCode: string
  result: string
  type: string
  etype: string
  degree: string
  hallticket: string
  selectedType: string
}

export interface Props {
  pathname: string
  query: queryProps
}

export interface studentInfoProps {
  HTNO: string
  NAME: string
  'FATHER NAME': string
  'COLLEGE CODE': string
}

export interface Result {
  subject_code: string
  subject_name: string
  grade_earned: string
  subject_credits: string
  internal_marks?: string
  external_marks?: string
  total_marks?: string
}

export async function getServerSideProps(givenData: Props) {
  const query = givenData.query
  var url = 'https://results-restapi.herokuapp.com/api'
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
  console.log(url)
  const resp = await axios.get(url)
  const data = await resp.data
  return {
    props: {
      data: data,
    },
  }
}

export default function Result({ data }: any) {
  var sgpaInfo
  var studentInfo: studentInfoProps
  var results: Result[]
  if (data.length === 3) {
    sgpaInfo = data[0]
    studentInfo = data[1]
    results = data[2]
  } else {
    studentInfo = data[0]
    results = data[1]
  }
  return (
    <div className='min-h-screen overflow-hidden text-center bg-gray-800 font-inter'>
      <PageHead
        title={studentInfo.HTNO}
        description={'Single Hallticket Result'}
        url={'single'}
      />
      <div>
        <div className='flex flex-col items-center justify-center text-center text-white'>
          <div className='p-6'>
            <h1 className='text-xl sm:text-4xl'>{studentInfo['NAME']}</h1>
            <h1 className='text-lg text-gray-400 sm:text-xl'>
              {studentInfo['HTNO']}
            </h1>
            <hr className='w-full border-gray-700' />
          </div>
          {sgpaInfo ? (
            <div>
              <h1 className='text-xs text-gray-400 sm:text-lg'>
                {' '}
                SGPA/Verdict
              </h1>
              <h1
                className={`text-xl sm:text-2xl ${
                  sgpaInfo.SGPA !== 'FAIL' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {sgpaInfo['SGPA']}
              </h1>
              <br />
            </div>
          ) : null}
        </div>
        <div className='flex flex-col items-center'>
          <div className='text-white'>
            {results.map((item: Result, idx: number) => (
              <div>
                <hr className='border-gray-700' />
                <div className='flex flex-row justify-between' key={idx}>
                  <h1 className='p-2'>{item.subject_name}</h1>
                  <h1
                    className={`p-2 ${
                      item.grade_earned === 'F'
                        ? 'text-red-400'
                        : 'text-green-400'
                    }`}
                  >
                    {item.grade_earned}
                  </h1>
                </div>
                {item.external_marks &&
                item.internal_marks &&
                item.total_marks ? (
                  <div className='flex flex-row place-items-start'>
                    <div className='flex flex-col xm:flex-row items-center justify-center'>
                      <h1 className='p-3 text-gray-400 text-sm'>
                        Internal Marks
                      </h1>
                      <h1 className='text-sm'>{item.internal_marks}</h1>
                    </div>
                    <div className='flex flex-col xm:flex-row items-center justify-center'>
                      <h1 className='p-3 text-gray-400 text-sm'>
                        External Marks
                      </h1>
                      <h1 className='text-sm'>{item.external_marks}</h1>
                    </div>
                    <div className='flex flex-col xm:flex-row items-center justify-center'>
                      <h1 className='p-3 text-gray-400 text-sm'>Total Marks</h1>
                      <h1 className='text-sm'>{item.total_marks}</h1>
                    </div>
                  </div>
                ) : null}
                <hr className='border-gray-700' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
