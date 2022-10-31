import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import Result from '../components/definedTypes'
import { BiArrowBack as BackIcon } from 'react-icons/bi'
import PageHead from '../components/PageHeader'
import { ExamsLinks } from '../components/ExamsLinks'
import { FormFilter } from '../components/FormFilter'
import { RingLoader } from 'react-spinners'

export async function getStaticProps() {
  const regularResp = await axios.get(
    'https://results-restapi.up.railway.app/new/all/regular'
  )
  const regularResults = await regularResp.data

  const supplyResp = await axios.get(
    'https://results-restapi.up.railway.app/new/all/supply'
  )
  const supplyResults = await supplyResp.data

  return {
    props: {
      allResults: [regularResults, supplyResults],
    },
    revalidate: 60 * 31, // 31 minutes
  }
}

export interface Props {
  allResults: Result[][]
}
const getMode = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('mode') === 'true' ? true : false
  }
  return true
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
    if (!didUserSelectRegulation)
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
    <div className='flex flex-col items-center min-h-screen py-2 overflow-hidden font-inter'>
      <PageHead
        title={'Get Single Hallticket Result'}
        description={'Get Result of a student given his hallticket number'}
        url={'single'}
      />
      <Link href='/'>
        <div className='flex flex-row items-center justify-between cursor-pointer'>
          <BackIcon size='1.5rem' className='mt-6 mr-2 text-gray-400' />
          <h3 className='mt-6 text-lg font-bold sm:text-2xl text-black dark:text-white'>
            Home
          </h3>
        </div>
      </Link>
      {/* TODO: Add more description about this page here  */}
      <p className='m-6 text-center text-base sm:text-xl text-black  dark:text-white'>
        Select from the below options to filter your desired result. Please
        select only a single regulation at a time.
      </p>
      <FormFilter
        handleRegularClick={handleRegularClick}
        handleSupplyClick={handleSupplyClick}
        handleRegulationClick={handleRegulationClick}
        handleHallticket={handleHallticket}
        didUserSelectType={didUserSelectType}
        regulations={regulations}
        multi={false}
      />
      {loading ? (
        <div className='m-6 flex items-center justify-center'>
          <RingLoader
            color={getMode() ? '#ffffff' : '#000000'}
            loading={true}
            size={50}
          />
        </div>
      ) : null}

      {regular &&
        didUserSelectType &&
        didUserSelectRegulation &&
        !loading &&
        hallticket.length === 10 ? (
        <ExamsLinks
          heading={'Regular Results'}
          hallticket={hallticket}
          selectedRegulation={selectedRegulation}
          selectedType={'regular'}
          loadingFunction={setLoading}
          resultsLinks={regularResults}
          multi={false}
        />
      ) : null}
      {supply &&
        didUserSelectType &&
        didUserSelectRegulation &&
        !loading &&
        hallticket.length === 10 ? (
        <ExamsLinks
          heading={'Supply Results'}
          hallticket={hallticket}
          selectedRegulation={selectedRegulation}
          selectedType={'supply'}
          loadingFunction={setLoading}
          resultsLinks={supplyResults}
          multi={false}
        />
      ) : null}
    </div>
  )
}
