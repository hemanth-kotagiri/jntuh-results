import axios from 'axios'
import { ResultSubjectsList } from '../components/ResultSubjectsList'
import { StudentInfoAndGPA } from '../components/StudentInfoAndGPA'
import SubjectDetails from '../components/definedTypes'
import { MdOutlineEventBusy as BusyIcon } from 'react-icons/md'

export async function getServerSideProps(givenData: any) {
  const query = givenData.query
  var url = 'https://results-restapi.up.railway.app/all-r18'
  url += '/' + query.hallticket
  let data
  try {
    const resp = await axios.get(url)
    data = await resp.data
  } catch (e) {
    console.log(e)
    return {
      props: {
        data: 'error',
      },
    }
  }
  return {
    props: {
      data: data,
    },
  }
}

export default function AllResults({ data }: any) {
  const allresults = data.data.results
  const details = data.data.details
  const overall_gpa = data.data.overall_gpa
  if (!allresults.length) {
    return (
      <div className='text-black dark:text-white flex flex-col px-3 text-center items-center min-h-max py-2 overflow-hidden font-inter'>
        <BusyIcon className='mt-3' size={'48px'} />
        <h1 className='text-lg sm:text-xl mt-6 mb-6 text-center'>
          Looks like JNTU servers are down! Please try again after sometime!
        </h1>
      </div>
    )
  }
  return (
    <div className='text-black dark:text-white'>
      <StudentInfoAndGPA
        studentHTNO={details.HTNO}
        studentName={details.NAME}
      ></StudentInfoAndGPA>
      <div className='m-2 text-center'>
        {overall_gpa ? (
          <div className='mb-5 text-center'>
            <h1 className='text-blue-500 text-bold text-xl'>Overall GPA</h1>
            <h1 className='text-bold text-2xl'>{overall_gpa}</h1>
          </div>
        ) : null}
        {allresults.map((result: any, idx: number) => {
          const semester = Object.keys(result)[0]
          const semester_sgpa = result['SGPA']
          const results: SubjectDetails[] = Object.values(result[semester])
          return (
            <div key={idx}>
              <h1 className='text-bold text-2xl'>{semester}</h1>
              {semester_sgpa ? (
                <div>
                  <h1 className='text-xs text-black dark:text-gray-400 sm:text-lg'>
                    {' '}
                    SGPA/Verdict
                  </h1>

                  <h1
                    className={`text-xl sm:text-2xl ${semester_sgpa !== 'FAIL'
                        ? 'text-green-600'
                        : 'text-red-600'
                      }`}
                  >
                    {semester_sgpa}
                  </h1>
                </div>
              ) : null}
              <ResultSubjectsList results={results} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
