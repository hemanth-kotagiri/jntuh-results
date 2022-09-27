import axios from 'axios'
import { ResultSubjectsList } from '../components/ResultSubjectsList'
import { StudentInfoAndGPA } from '../components/StudentInfoAndGPA'
import { useEffect } from 'react'
import { HashLoader } from 'react-spinners'
import Link from 'next/link'
import { BiArrowBack as BackIcon } from 'react-icons/bi'
import SubjectDetails from '../components/definedTypes'
import RenderOverAllPassFailPieChart from '../components/OverAllPassFailPieChart'
import { RenderEachSubjectOverAllPassFailBarChart } from '../components/EachSubjectPassFailBar'
import PageHead from '../components/PageHeader'

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

interface studentInfoProps {
  HTNO: string
  NAME: string
  'FATHER NAME': string
  'COLLEGE CODE': string
}

interface sgpaInfoProps {
  SGPA: string | number
}

interface singleHallticketProps {
  sgpaDetails: sgpaInfoProps
  studentDetails: studentInfoProps
  resultDetails: SubjectDetails[]
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

  let statisticsData: singleHallticketProps[] = []
  if (data['result'] !== 'loading') {
    statisticsData = data.filter((item: any) => item.length > 1)
  }
  // console.log(statisticsData);

  return (
    <div>
      <PageHead
        title={'Multiple Results Statistics'}
        description={'Result of more than one hallticket with statistics'}
        url={'multiresult'}
      />
      {data['result'] === 'loading' ? (
        <div className='flex flex-col items-center min-h-screen overflow-hidden text-center  font-inter'>
          <h1 className='text-xl sm:text-2xl mt-6 mb-6 text-center text-gray-400'>
            Sit back, relax while the backend fetches all the results
          </h1>
          <hr className='sm:w-96 w-48 border-gray-700 mb-6' />
          <HashLoader color={'#ffffff'} loading={true} size={30} />
        </div>
      ) : (
        <div className=''>
          {/* render statistics here */}
          {data.length ? (
            <div className='flex flex-col items-center'>
              <div className='w-full sm:w-2/4'>
                <RenderOverAllPassFailPieChart props={statisticsData} />
              </div>
              <div className='w-full lg:w-2/4'>
                <RenderEachSubjectOverAllPassFailBarChart
                  props={statisticsData}
                />
              </div>
            </div>
          ) : null}
          {data.length ? (
            data.map((item: any, idx: number) => (
              <div key={idx} className=''>
                {item.length > 1 ? (
                  <div className='flex justify-center flex-wrap'>
                    <div className='p-4 md:max-w-[40%] rounded-lg  dark:text-white border dark:border-slate-800 border-black my-3 '>
                      <StudentInfoAndGPA
                        studentName={item[1].NAME}
                        studentHTNO={item[1].HTNO}
                        sgpaInfo={item[0]}
                      />
                      <ResultSubjectsList results={item[2]} />
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className='flex flex-col items-center min-h-screen overflow-hidden text-center dark:text-white text-black font-inter'>
              <Link href='/'>
                <div className='flex flex-row items-center justify-center cursor-pointer'>
                  <BackIcon size='1.5rem' className='mt-6 mr-2 text-gray-400' />
                  <h3 className='mt-6 text-lg font-bold text-white sm:text-2xl'>
                    Home
                  </h3>
                </div>
              </Link>
              <h1 className='text-xl sm:text-2xl mt-6 mb-6 text-center text-gray-400'>
                Oops, likely like no one wrote that exam, or JNTUH servers are
                down!
              </h1>
              <h2 className='text-white text-center'>
                JNTUH Servers didn't respond with any data, so please try for a
                valid exam, or retry after sometime.
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
