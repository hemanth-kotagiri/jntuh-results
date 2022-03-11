import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

const RenderOverAllPassFailPieChart = ({ props }: any) => {
  let failedStudents: number = 0
  let passedStudents: number = 0
  props.forEach((item: any) => {
    if (item.length > 1 && item[0]['SGPA'] === 'FAIL') {
      failedStudents += 1
    }
    if(item.length > 1 && item[0]["SGPA"] > 0) {
      passedStudents += 1
    }
  })
  // console.log(failedStudents)
  // console.log(passedStudents)
  let failedPercentage = round(
    (failedStudents / (failedStudents + passedStudents)) * 100,
    2
  )
  let passPercentage = round(
    (passedStudents / (failedStudents + passedStudents)) * 100,
    2
  )
  const data = {
    labels: ['Fail', 'Pass'],
    datasets: [
      {
        data: [failedPercentage, passPercentage],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1.0,
      },
    ],
  }

  return (
    <Pie
      data={data}
      width={250}
      height={250}
      options={{
        plugins: {
          title: {
            display: true,
            text: 'Overall Pass/Fail Percentage',
          },
        },
        maintainAspectRatio: false,
      }}
    />
  )
}

export default RenderOverAllPassFailPieChart
