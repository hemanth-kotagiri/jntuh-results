import React from 'react'
import SubjectDetails from '../components/definedTypes'

interface Props {
  results: SubjectDetails[]
}

export const ResultSubjectsList = (props: Props) => {
  const { results } = props
  const grades = ['O', 'A+', 'A', 'B+', 'B', 'C']
  return (
    <div className='flex flex-col items-center p-5'>
      <div className='text-white'>
        {results.map((item: SubjectDetails, idx: number) => (
          <div key={idx}>
            <hr className='border-gray-700' />
            <div className='flex flex-row justify-between items-left' key={idx}>
              <h1 className='p-2 text-left text-black dark:text-white text-sm md:text-base'>{item.subject_name}</h1>
              <h1
                className={`p-2 text-sm md:text-base ${
                  // item.grade_earned === 'F' || item.grade_earned === 'Ab'
                  !grades.includes(item.grade_earned)
                    ? 'text-red-600'
                    : 'text-green-600'
                  }`}
              >
                {item.grade_earned === "-" ? "MALPRACTICE" : item.grade_earned}
              </h1>
            </div>
            {item.external_marks && item.internal_marks && item.total_marks ? (
              <div className='flex flex-row place-items-start'>
                <div className='flex flex-col xm:flex-row items-center justify-center'>
                  <h1 className='p-3 text-gray-600 text-xs md:text-sm'>Internal Marks</h1>
                  <h1 className='text-sm text-black dark:text-white'>{item.internal_marks}</h1>
                </div>
                <div className='flex flex-col xm:flex-row items-center justify-center'>
                  <h1 className='p-3 text-gray-600 text-xs md:text-sm'>External Marks</h1>
                  <h1 className='text-sm text-black dark:text-white'>{item.external_marks}</h1>
                </div>
                <div className='flex flex-col xm:flex-row items-center justify-center'>
                  <h1 className='p-3 text-gray-600 text-xs md:text-sm'>Total Marks</h1>
                  <h1 className='text-sm text-black dark:text-white'>{item.total_marks}</h1>
                </div>
              </div>
            ) : null}
            <hr className='border-gray-700' />
          </div>
        ))}
      </div>
    </div>
  )
}
