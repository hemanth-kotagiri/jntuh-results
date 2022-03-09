import Link from 'next/link'
import React from 'react'
import Result from '../components/definedTypes'

export interface Props {
  heading: string
  hallticket?: string
  selectedRegulation: string
  selectedType: string
  loadingFunction: Function
  resultsLinks: Result[]

  multi: boolean
  fromHallticket?: string
  toHallticket?: string
}

export const ExamsLinks = (props: Props) => {
  let pathName: string
  if (props.multi !== true) {
    pathName = '/result'
  } else {
    pathName = '/multiresult'
  }
  return (
    <div>
      <h3 className='mt-6 text-lg font-bold text-center text-white sm:text-2xl'>
        {props.heading}
      </h3>
      <div
        className='flex flex-wrap items-center justify-center max-w-xs mt-6
        sm:max-w-4xl sm:w-full'
      >
        {props.resultsLinks.map((item: Result, idx: number) => (
          <div key={idx}>
            {item.exam_name.includes(props.selectedRegulation) ? (
              <Link
                href={{
                  pathname: pathName,
                  query:
                    props.multi === false
                      ? {
                          examCode: item.examCode,
                          result: item.result,
                          type: item.type,
                          etype: item.etype,
                          degree: item.degree,
                          hallticket: props.hallticket!.toUpperCase(),
                          selectedType: props.selectedType,
                        }
                      : {
                          examCode: item.examCode,
                          result: item.result,
                          type: item.type,
                          etype: item.etype,
                          degree: item.degree,
                          selectedType: props.selectedType,
                          fromHallticket: props.fromHallticket!.toUpperCase(),
                          toHallticket: props.toHallticket!.toUpperCase(),
                        },
                }}
              >
                <div
                  onClick={() => props.loadingFunction(true)}
                  className='p-6 m-6 text-left text-white border
                        border-gray-700 cursor-pointer max-w-xs sm:w-96
                        rounded-xl hover:border-gray-500 transition ease-in-out
                        delay-150 hover:-translate-y-1 hover:scale-105
                        hover:bg-blue-900 duration-150'
                >
                  <h3 className='p-6 text-lg font-bold text-center text-sky-400 sm:text-xl'>
                    {item.release_date}
                  </h3>
                  <p className='mt-4 text-center text-m'> {item.exam_name}</p>
                </div>
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
