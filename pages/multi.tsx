import Link from 'next/link'
import PageHead from '../components/PageHeader'
import Result from '../components/definedTypes'
import { BiArrowBack as BackIcon } from 'react-icons/bi'
import axios from 'axios'
import { useState } from 'react'
import { FormFilter } from '../components/FormFilter'
import { ExamsLinks } from '../components/ExamsLinks'

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

export default function MultipleResults({ allResults }: Props) {
  const regularResults: Result[] = allResults[0]
  const supplyResults: Result[] = allResults[1]
  const [regular, setRegular] = useState<boolean>(false)
  const [supply, setSupply] = useState<boolean>(false)
  const [didUserSelectType, setDidUserSelectType] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [didUserSelectRegulation, setDidUserSelectRegulation] =
    useState<boolean>(false)
  const [fromHallticket, setFromHallticket] = useState<string>('')
  const [toHallticket, setToHallticket] = useState<string>('')

  const [selectedRegulation, setSelectedRegulation] = useState<string>('')
  var formRegulations: Set<string> = new Set()

  const handleRegularClick = () => {
    setRegular(!regular)
    if (!supply) setDidUserSelectType(!didUserSelectType)
  }

  const handleFromHallticket = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromHallticket(e.target.value)
  }
  const handleToHallticket = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToHallticket(e.target.value)
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
        title={'Get Multiple Results with Statistics'}
        description={
          'Get Results of more than one student with results statistics'
        }
        url={'multi'}
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
        handleFromHallticket={handleFromHallticket}
        handleToHallticket={handleToHallticket}
        didUserSelectType={didUserSelectType}
        regulations={regulations}
        multi={true}
      />
      {loading ? (
        <h3 className='mt-6 text-lg font-bold text-center text-gray-800 dark:text-gray-400 sm:text-2xl'>
          Loading, Please wait...
        </h3>
      ) : null}

      {regular &&
        didUserSelectType &&
        didUserSelectRegulation &&
        !loading &&
        fromHallticket.length === 10 &&
        toHallticket.length === 10 ? (
        <ExamsLinks
          heading={'Regular Results'}
          fromHallticket={fromHallticket}
          toHallticket={toHallticket}
          selectedRegulation={selectedRegulation}
          selectedType={'regular'}
          loadingFunction={setLoading}
          resultsLinks={regularResults}
          multi={true}
        />
      ) : null}
      {supply &&
        didUserSelectType &&
        didUserSelectRegulation &&
        !loading &&
        fromHallticket.length === 10 &&
        toHallticket.length === 10 ? (
        <ExamsLinks
          heading={'Supply Results'}
          fromHallticket={fromHallticket}
          toHallticket={toHallticket}
          selectedRegulation={selectedRegulation}
          selectedType={'supply'}
          loadingFunction={setLoading}
          resultsLinks={supplyResults}
          multi={true}
        />
      ) : null}
    </div>
  )
}
