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
              type='checkbox'
              value={item}
              name={item}
              id={idx.toString()}
              onClick={(e: React.FormEvent<HTMLInputElement>) =>
                props.handleClick(e)
              }
            />
            <label
              className='ml-2 text-lg text-white sm:text-2xl'
              htmlFor={item}
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
