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
              className='border-black appearance-none rounded-full h-4 w-4 border dark:border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 bg-no-repeat bg-center bg-contain cursor-pointer'
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
