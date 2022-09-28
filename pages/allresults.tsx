import axios from 'axios'
import { ResultSubjectsList } from '../components/ResultSubjectsList'
import { StudentInfoAndGPA } from '../components/StudentInfoAndGPA'
import SubjectDetails from '../components/definedTypes'

export async function getServerSideProps(givenData: any) {
  const query = givenData.query
  var url = 'https://results-restapi.herokuapp.com/all-r18'
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
