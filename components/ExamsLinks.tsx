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
  const filteredLinks = props.resultsLinks.filter((item) =>
    item.exam_name.includes(props.selectedRegulation)
  )
  return (
    <div>
      {filteredLinks.length ? (
        <div>
          <h3 className='mt-6 text-lg font-bold text-center dark:text-white sm:text-2xl'>
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
                            examName: item.exam_name,
                          }
                          : {
                            examCode: item.examCode,
                            result: item.result,
                            type: item.type,
                            etype: item.etype,
                            degree: item.degree,
                            selectedType: props.selectedType,
                            fromHallticket:
                              props.fromHallticket!.toUpperCase(),
                            toHallticket: props.toHallticket!.toUpperCase(),
                            examName: item.exam_name,
                          },
                    }}
                  >
                    <div
                      onClick={() => props.loadingFunction(true)}
                      className='group shadow-2xl p-6 m-6 text-left dark:text-white 
                          cursor-pointer max-w-xs sm:w-96
                          rounded-xl transition ease-in-out
                          delay-150 hover:-translate-y-1 hover:scale-105
                          hover:bg-blue-300 dark:hover:bg-white duration-150 hover:drop-shadow-sm dark:hover:text-black border dark:border-slate-800 z-0'
                    >
                      <h3 className='p-6 text-lg font-bold text-center text-sky-400 sm:text-xl group-hover:text-black'>
                        {item.release_date}
                      </h3>
                      <p className='mt-4 text-center text-m'>
                        {' '}
                        {item.exam_name}
                      </p>
                    </div>
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className='mt-6 text-sm text-center text-white sm:text-lg'>
          No {props.heading} Links Found for {props.selectedRegulation} Series!
        </h1>
      )}
    </div>
  )
}
