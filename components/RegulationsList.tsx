import React from 'react'

export interface Props {
  regulations: string[]
  handleClick: Function
}

export const RegulationsList = (props: Props) => {
  return (
    <div>
      <div className='flex flex-col m-2 sm:flex-row'>
        {props.regulations.map((item: string, idx: number) => (
          <div className='m-2' key={idx}>
            <input
              type='radio'
              value={item}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300
              focus:ring-blue-500 dark:focus:ring-blue-600
              dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
              dark:border-gray-600'
              name='regulation'
              id={idx.toString()}
              onClick={(e: React.FormEvent<HTMLInputElement>) =>
                props.handleClick(e)
              }
            />
            <label
              className='ml-2 text-lg dark:text-white sm:text-2xl cursor-pointer'
              htmlFor={idx.toString()}
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
