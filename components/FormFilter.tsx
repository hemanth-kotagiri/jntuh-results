import React, { ChangeEventHandler, MouseEventHandler } from 'react'
import { RegulationsList } from './RegulationsList'

export interface Props {
  handleRegularClick: MouseEventHandler<HTMLInputElement>
  handleSupplyClick: MouseEventHandler<HTMLInputElement>
  handleRegulationClick: MouseEventHandler<HTMLInputElement>
  handleHallticket?: ChangeEventHandler<HTMLInputElement>

  handleFromHallticket?: ChangeEventHandler<HTMLInputElement>
  handleToHallticket?: ChangeEventHandler<HTMLInputElement>
  multi: boolean

  didUserSelectType: boolean
  regulations: string[]
}

export const FormFilter = (props: Props) => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col sm:flex-row text-xl text-white sm:text-2xl'>
        <div className='flex flex-row items-center m-2'>
          <input
            type='checkbox'
            value='Regular'
            name='Regular'
            id="Regular"
            onClick={props.handleRegularClick}
          />
          <label
            className='ml-2 text-xl text-white sm:text-2xl cursor-pointer'
            htmlFor='Regular'
          >
            <h3>Regular Results</h3>
          </label>
        </div>
        <div className='flex flex-row items-center m-2'>
          <input
            type='checkbox'
            value='Supply'
            name='Supply'
            id="supply"
            onClick={props.handleSupplyClick}
          />
          <label
            className='ml-2 text-xl text-white sm:text-2xl cursor-pointer'
            htmlFor='supply'
          >
            <h3>Supply Results</h3>
          </label>
        </div>
      </div>
      {props.didUserSelectType ? (
        <RegulationsList
          regulations={props.regulations}
          handleClick={props.handleRegulationClick}
        />
      ) : null}
      {props.multi === false ? (
        <input
          type='text'
          name='hallticket'
          placeholder='e.g: 185U1A0565'
          className='text-white text-center bg-gray-800 border border-gray-500 cursor-black'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.handleHallticket!(e)
          }
        />
      ) : (
        <div className='flex sm:flex-row flex-col items-center'>
          <h1 className='text-white'>From </h1>
          <input
            type='text'
            name='hallticket-from'
            placeholder='e.g: 185U1A0560'
            className='text-white text-center bg-gray-800 border border-gray-500 cursor-black m-2'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.handleFromHallticket!(e)
            }
          />
          <h1 className='text-white'>To </h1>
          <input
            type='text'
            name='hallticket-to'
            placeholder='e.g: 185U1A05B7'
            className='text-white text-center bg-gray-800 border border-gray-500 cursor-black m-2'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.handleToHallticket!(e)
            }
          />
        </div>
      )}
    </div>
  )
}
