import axios from 'axios'
import { ResultSubjectsList } from '../components/ResultSubjectsList'
import { StudentInfoAndGPA } from '../components/StudentInfoAndGPA'
import { useEffect } from 'react'

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
        <div>
          <h1 className='text-xl sm:text-4xl m-6 p-6 text-white text-center'>
            Sit back, relax while the backend fetches the results...
          </h1>
        </div>
      ) : (
        <div className='min-h-screen overflow-hidden text-center bg-gray-800 font-inter'>
          {data.map((item: any, idx: number) => (
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
          ))}
        </div>
      )}
    </div>
  )
}
