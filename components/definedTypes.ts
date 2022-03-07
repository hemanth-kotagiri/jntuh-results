export default interface Notification {
  notification_date: string;
  notification_description: string;
}

export default interface Result {
  exam_name: string;
  release_date: string;
  links: string[];
  degree: string;
  examCode: string;
  etype: string;
  result: string;
  type: string;
  id: number;
}

export default interface SubjectDetails {
  subject_code: string
  subject_name: string
  grade_earned: string
  subject_credits: string
  internal_marks?: string
  external_marks?: string
  total_marks?: string

}
