import axios from "axios";

export interface Props {
  examCode: string;
  result: string;
  type: string;
  etype: string;
  degree: string;
  selectedType: string;
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
  console.log(url);
  const resp = await axios.get(url);
  const data = await resp.data;
  return {
    props: {
      data: data,
    },
  };
}

export default function Result({ data }: any) {
  var sgpaInfo;
  var studentInfo: studentInfoProps;
  var results: Result[];
  if (data.length === 3) {
    sgpaInfo = data[0];
    studentInfo = data[1];
    results = data[2];
  } else {
    studentInfo = data[0];
    results = data[1];
  }
  return (
    <div className="text-center m-6">
      <div>
        <h1>{studentInfo["NAME"]}</h1>
        <h1>{studentInfo["HTNO"]}</h1>
        <h1>{studentInfo["FATHER NAME"]}</h1>
        <h1>{studentInfo["COLLEGE CODE"]}</h1>
        {sgpaInfo ? <h1>{sgpaInfo["SGPA"]}</h1> : null}
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
