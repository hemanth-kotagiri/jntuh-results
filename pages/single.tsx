import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import Result from '../components/definedTypes'
import { BiArrowBack as BackIcon } from 'react-icons/bi'
import PageHead from '../components/PageHeader'
import { RegulationsList } from '../components/RegulationsList'

export async function getStaticProps() {
  const regularResp = await axios.get(
    'https://results-restapi.herokuapp.com/new/all/regular'
  )
  const regularResults = await regularResp.data

  const supplyResp = await axios.get(
    'https://results-restapi.herokuapp.com/new/all/supply'
  )
  const supplyResults = await supplyResp.data

  return {
    props: {
      allResults: [regularResults, supplyResults],
    },
    revalidate: 60 * 30, // 30 minutes
  }
}

export interface Props {
  allResults: Result[][]
}

export default function Single({ allResults }: Props) {
  const regularResults: Result[] = allResults[0]
  const supplyResults: Result[] = allResults[1]
  const [regular, setRegular] = useState<boolean>(false)
  const [supply, setSupply] = useState<boolean>(false)
  const [didUserSelectType, setDidUserSelectType] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [didUserSelectRegulation, setDidUserSelectRegulation] =
    useState<boolean>(false)
  const [hallticket, setHallticket] = useState<string>('')

  const [selectedRegulation, setSelectedRegulation] = useState<string>('')
  var formRegulations: Set<string> = new Set()

  const handleRegularClick = () => {
    setRegular(!regular)
    if (!supply) setDidUserSelectType(!didUserSelectType)
  }

  const handleHallticket = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHallticket(e.target.value)
  }

  const handleRegulationClick = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedRegulation(e.currentTarget.value)
    setDidUserSelectRegulation(!didUserSelectRegulation)
  }

  const handleSupplyClick = () => {
    setSupply(!supply)
    if (!regular) setDidUserSelectType(!didUserSelectType)
  }

  var regExp = /\(([^)]+)\)/
  regularResults.map((item: Result) => {
    formRegulations.add(item.exam_name.match(regExp)![1]!)
  })

  supplyResults.map((item: Result) => {
    formRegulations.add(item.exam_name.match(regExp)![1])
  })
  const regulations: Array<string> = Array.from(formRegulations)

  return (
    // TODO: Refactor below div into multiple components
    <div className='flex flex-col items-center min-h-screen py-2 overflow-hidden bg-gray-800 font-inter'>
      <PageHead
        title={'Get Single Hallticket Result'}
        description={'Get Result of a student given his hallticket number'}
        url={'single'}
      />
      <Link href='/'>
        <div className='flex flex-row items-center justify-between cursor-pointer'>
          <BackIcon size='1.5rem' className='mt-6 mr-2 text-gray-400' />
          <h3 className='mt-6 text-lg font-bold text-white sm:text-2xl'>
            Home
          </h3>
        </div>
      </Link>
      <p className='m-6 text-base text-gray-400 sm:text-xl'>
        Select from the below options to filter your desired result. Please
        select only a single regulation at a time.
      </p>
      <div className='flex flex-row text-xl text-white sm:text-2xl'>
        <div className='flex flex-row items-center m-2'>
          <input
            type='checkbox'
            value='Regular'
            name='Regular'
            onClick={handleRegularClick}
          />
          <label
            className='ml-2 text-xl text-white sm:text-2xl'
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
            onClick={handleSupplyClick}
          />
          <label
            className='ml-2 text-xl text-white sm:text-2xl'
            htmlFor='Supply'
          >
            <h3>Supply Results</h3>
          </label>
        </div>
      </div>
      {didUserSelectType ? (
        <RegulationsList regulations={regulations} handleClick={handleRegulationClick}/>
      ) : null}
      <input
        type='text'
        name='hallticket'
        className='text-white bg-gray-800 border border-gray-700 cursor-black'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleHallticket(e)
        }
      />
      {loading ? (
        <h3 className='mt-6 text-lg font-bold text-center text-gray-400 sm:text-2xl'>
          Loading, Please wait...
        </h3>
      ) : null}

      {regular &&
      didUserSelectType &&
      didUserSelectRegulation &&
      !loading &&
      hallticket.length === 10 ? (
        <div>
          <h3 className='mt-6 text-lg font-bold text-center text-white sm:text-2xl'>
            Regular Results
          </h3>
          <div className='flex flex-wrap items-center justify-center max-w-xs mt-6 sm:max-w-4xl sm:w-full'>
            {regularResults.map((item: Result, idx: number) => (
              <div key={idx}>
                {item.exam_name.includes(selectedRegulation) ? (
                  <Link
                    href={{
                      pathname: '/result',
                      query: {
                        examCode: item.examCode,
                        result: item.result,
                        type: item.type,
                        etype: item.etype,
                        degree: item.degree,
                        hallticket: hallticket.toUpperCase(),
                        selectedType: regular ? 'regular' : 'supply',
                      },
                    }}
                  >
                    <div
                      onClick={() => setLoading(true)}
                      className='p-6 m-6 text-left text-white border
                        border-gray-700 cursor-pointer max-w-xs sm:w-96
                        rounded-xl hover:border-gray-500 transition ease-in-out
                        delay-150 hover:-translate-y-1 hover:scale-105
                        hover:bg-blue-900 duration-150'
                    >
                      <h3 className='p-6 text-lg font-bold text-center text-sky-400 sm:text-xl'>
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
      ) : null}
      {supply &&
      didUserSelectType &&
      didUserSelectRegulation &&
      !loading &&
      hallticket.length === 10 ? (
        <div>
          <h3 className='mt-6 text-lg font-bold text-center text-white sm:text-2xl'>
            Supply Results
          </h3>
          <div className='flex flex-wrap items-center justify-center max-w-xs mt-6 sm:max-w-4xl sm:w-full'>
            {supplyResults.map((item: Result, idx: number) => (
              <div key={idx} onClick={() => setLoading(true)}>
                {item.exam_name.includes(selectedRegulation) ? (
                  <Link
                    href={{
                      pathname: '/result',
                      query: {
                        examCode: item.examCode,
                        result: item.result,
                        type: item.type,
                        etype: item.etype,
                        degree: item.degree,
                        hallticket: hallticket.toUpperCase(),
                        selectedType: regular ? 'regular' : 'supply',
                      },
                    }}
                  >
                    <div
                      className='p-6 m-6 text-left text-white border
                        border-gray-700 cursor-pointer w-96 rounded-xl
                        hover:border-gray-500 transition ease-in-out delay-150
                        hover:-translate-y-1 hover:scale-105 hover:bg-blue-900
                        duration-150'
                    >
                      <h3 className='p-6 text-lg font-bold text-center text-sky-400 sm:text-xl'>
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
      ) : null}
    </div>
  )
}
