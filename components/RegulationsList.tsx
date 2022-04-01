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
              className='form-check-input appearance-none rounded-full h-3 w-3
              sm:h-4 sm:w-4 border border-gray-300 bg-white checked:bg-blue-600
              checked:border-blue-600 focus:outline-none transition
              duration-400 mt-2 bg-no-repeat bg-center bg-contain
              cursor-pointer'
              name='regulation'
              id={idx.toString()}
              onClick={(e: React.FormEvent<HTMLInputElement>) =>
                props.handleClick(e)
              }
            />
            <label
              className='ml-2 text-lg text-white sm:text-2xl cursor-pointer'
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
