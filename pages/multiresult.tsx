import axios from 'axios'
import PageHead from '../components/PageHeader'
import SubjectDetails from '../components/definedTypes'
import { ResultSubjectsList } from '../components/ResultSubjectsList'
import { StudentInfoAndGPA } from '../components/StudentInfoAndGPA'

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


function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
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
  while (data['result'] === 'loading') {
    const resp = await axios.get(url)
    data = await resp.data
    await timeout(5000);
  }
  return {
    props: {
      data: data,
    },
  }
}

export default function MultiResult({ data }: any) {
  return (
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
  )
}
