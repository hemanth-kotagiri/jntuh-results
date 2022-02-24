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
