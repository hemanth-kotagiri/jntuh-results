import axios from "axios";

export interface Props {
  examCode: string;
  result: string;
  type: string;
  etype: string;
  degree: string;
  selectedType: string;
}

export interface sgpaProps {
  SGPA: string;
}

export interface studentInfoProps {
  HTNO: string;
  NAME: string;
  "FATHER NAME": string;
  "COLLEGE CODE": string;
}

export interface Result {
  subject_code: string;
  subject_name: string;
  grade_earned: string;
  subject_credits: string;
  internal_marks: string;
  external_marks: string;
  total_marks: string;
}

export async function getServerSideProps({ query }: any) {
  var url = "https://results-restapi.herokuapp.com/api";
  if (query.selectedType === "regular") {
    url += "/calculate";
  }
  url += "?hallticket=" + query.hallticket;
  url += "&dob=3";
  url += "&examCode=" + query.examCode;
  url += "&result=" + query.result;
  url += "&type=" + query.type;
  url += "&etype=" + query.etype;
  url += "&degree=" + query.degree;
  const resp = await axios.get(url);
  const data = await resp.data;
  return {
    props: {
      data: data,
    },
  };
}

export default function Result({ data }: any) {
  const sgpaInfo: sgpaProps = data[0];
  const studentInfo: studentInfoProps = data[1];
  const results: Result[] = data[2];
  return (
    <div className="text-center m-6">
      <div>
        <h1>{studentInfo["NAME"]}</h1>
        <h1>{studentInfo["HTNO"]}</h1>
        <h1>{studentInfo["FATHER NAME"]}</h1>
        <h1>{studentInfo["COLLEGE CODE"]}</h1>
        <b>{sgpaInfo.SGPA}</b>
      </div>
      <div>
        {results.map((item: Result) => (
          <div>
            <h1>{item.subject_name}</h1>
            <h1>{item.grade_earned}</h1>
            <h1>{item.internal_marks}</h1>
            <h1>{item.external_marks}</h1>
            <h1>{item.total_marks}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
