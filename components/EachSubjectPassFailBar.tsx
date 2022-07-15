import React from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

// interface mapProps {
//   key: string
//   value: number
// }

export function RenderEachSubjectOverAllPassFailBarChart({ props }: any) {
  let subjectLables: string[] = []
  let means: number[] = []

  let eachSubjectPassMap: any = new Map()
  let eachSubjectFailMap: any = new Map()
  let meanSubjectMap: any = new Map()

  // each item is a list of sgpa, student_details, subjects
  props.forEach((item: any) => {
    const subjectsList = item[2]
    subjectsList.forEach((subject: any) => {
      if (subject.grade_earned === 'Ab' || subject.grade_earned === 'F') {
        // check if key exists
        if (subject.subject_name in eachSubjectFailMap) {
          eachSubjectFailMap[subject.subject_name] += 1
        } else {
          eachSubjectFailMap[subject.subject_name] = 1
          eachSubjectPassMap[subject.subject_name] = 0
          subjectLables.push(subject.subject_name)
        }
      } else {
        if (subject.subject_name in eachSubjectPassMap) {
          eachSubjectPassMap[subject.subject_name] += 1
        } else {
          eachSubjectPassMap[subject.subject_name] = 1
          eachSubjectFailMap[subject.subject_name] = 0
          subjectLables.push(subject.subject_name)
        }
      }
      if ('total_marks' in subject) {
        if (subject.subject_name in meanSubjectMap) {
          meanSubjectMap[subject.subject_name]['sum'] +=
            parseInt(subject.total_marks) || 0
          meanSubjectMap[subject.subject_name]['count'] += 1
        } else {
          meanSubjectMap[subject.subject_name] = {
            sum: parseInt(subject.total_marks),
            count: 1,
          }
        }
      }
    })
  })

  console.log('FAIL MAP: ', eachSubjectFailMap)
  console.log('PASS MAP: ', eachSubjectPassMap)
  console.log('MEAN MAP: ', meanSubjectMap)

  let eachSubjectPassPercentages: number[] = []
  let eachSubjectFailPercentages: number[] = []

  Object.entries(eachSubjectFailMap).forEach((item: any) => {
    const total = eachSubjectFailMap[item[0]] + eachSubjectPassMap[item[0]]
    eachSubjectFailPercentages.push(round((item[1] / total) * 100, 2))
  })

  Object.entries(eachSubjectPassMap).forEach((item: any) => {
    const total = eachSubjectFailMap[item[0]] + eachSubjectPassMap[item[0]]
    eachSubjectPassPercentages.push(round((item[1] / total) * 100, 2))
  })
  Object.entries(meanSubjectMap).forEach((item: any) => {
    means.push(round(item[1]['sum'] / item[1]['count'], 2))
  })

  console.log(eachSubjectFailPercentages)
  console.log(eachSubjectPassPercentages)
  console.log(means)
  let datasets = [
    {
      label: 'Fail',
      data: eachSubjectFailPercentages,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Pass',
      data: eachSubjectPassPercentages,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ]
  const meanDataSet = {
    label: 'Mean Total Marks',
    data: means,
    backgroundColor: 'rgba(50, 73, 173, 0.5)',
  }
  if (means.length) {
    datasets = [...datasets, meanDataSet]
  }

  let data = {
    labels: subjectLables,
    datasets: datasets,
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        display: true,
      },
      title: {
        display: true,
        position: 'bottom' as const,
        text: 'Subject-wise Pass/Fail Percentage',
      },
    },
  }

  return <Bar options={options} data={data} width={400} height={300} />
}
