import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { BiArrowBack as BackIcon } from "react-icons/bi";

export async function getStaticProps() {
  const regularResp = await axios.get(
    "https://results-restapi.herokuapp.com/new/all/regular"
  );
  const regularResults = await regularResp.data;

  const supplyResp = await axios.get(
    "https://results-restapi.herokuapp.com/new/all/supply"
  );
  const supplyResults = await supplyResp.data;

  return {
    props: {
      allResults: [regularResults, supplyResults],
    },
    revalidate: 60 * 30, // 30 minutes
  };
}

export interface Result {
  exam_name: string;
  release_date: string;
  links: string[];
  degree: string;
  examCode: string;
  etype: string;
  result: string;
  type: string;
  id: number;
}

export interface Props {
  allResults: Result[][];
}

export default function Single({ allResults }: Props) {
  const regularResults: Result[] = allResults[0];
  const supplyResults: Result[] = allResults[1];
  const [regular, setRegular] = useState<boolean>(false);
  const [supply, setSupply] = useState<boolean>(false);
  const [didUserSelectType, setDidUserSelectType] = useState<boolean>(false);
  const [didUserSelectRegulation, setDidUserSelectRegulation] =
    useState<boolean>(false);
  const [hallticket, setHallticket] = useState<string>("");

  const [selectedRegulation, setSelectedRegulation] = useState<string>("");
  var formRegulations = new Set();

  const handleRegularClick = () => {
    setRegular(!regular);
    if (!supply) setDidUserSelectType(!didUserSelectType);
  };

  const handleHallticket = (e: any) => {
    setHallticket(e.target.text);
  };

  const handleRegulationClick = (e: any) => {
    setSelectedRegulation(e.target.name);
    setDidUserSelectRegulation(!didUserSelectRegulation);
  };

  const handleSupplyClick = () => {
    setSupply(!supply);
    if (!regular) setDidUserSelectType(!didUserSelectType);
  };

  var regExp = /\(([^)]+)\)/;
  regularResults.map((item: any) => {
    formRegulations.add(item.exam_name.match(regExp)[1]);
  });

  supplyResults.map((item: any) => {
    formRegulations.add(item.exam_name.match(regExp)[1]);
  });
  const regulations = Array.from(formRegulations);

  return (
    <div className="flex flex-col items-center min-h-screen py-2 overflow-hidden bg-gray-800 font-inter">
      <Link href="/">
        <div className="flex flex-row items-center justify-between cursor-pointer">
          <BackIcon size="1.5rem" className="mt-6 mr-2 text-gray-400" />
          <h3 className="mt-6 text-lg font-bold text-white sm:text-2xl">
            Get your result
          </h3>
        </div>
      </Link>
      <p className="text-gray-400 mt-6 text-base sm:text-xl">
        Select from the below options to filter your desired result
      </p>
      <div className="flex flex-row">
        <div className="m-2">
          <input
            type="checkbox"
            value="Regular"
            name="Regular"
            onClick={handleRegularClick}
          />
          <label className="ml-6 text-2xl text-white" htmlFor="regular">
            Regular Results
          </label>
        </div>
        <div className="m-2">
          <input
            type="checkbox"
            value="Supply"
            name="Supply"
            onClick={handleSupplyClick}
          />
          <label className="ml-6 text-2xl text-white" htmlFor="regular">
            Supply Results
          </label>
        </div>
      </div>
      {didUserSelectType ? (
        <div>
          <div className="m-2 flex flex-row">
            {Array.from(regulations).map((item: any) => (
              <div className="m-2">
                <input
                  type="checkbox"
                  value={item}
                  name={item}
                  onClick={(e: any) =>
                    handleRegulationClick({
                      target: {
                        name: e.target.name,
                        value: e.target.checked,
                      },
                    })
                  }
                />
                <label className="ml-6 text-2xl text-white" htmlFor={item}>
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <input
        type="text"
        name="hallticket"
        onChange={(e: any) =>
          handleHallticket({
            target: {
              text: e.target.value,
            },
          })
        }
      />
      <label htmlFor="hallticket"></label>

      {regular &&
      didUserSelectType &&
      didUserSelectRegulation &&
      hallticket.length === 10 ? (
        <div>
          <h3 className="text-white text-center text-lg sm:text-2xl font-bold mt-6">
            Regular Results
          </h3>
          <div className="max-w-xs flex flex-wrap items-center justify-center sm:max-w-4xl mt-6 sm:w-full">
            {regularResults.map((item) => (
              <div>
                {item.exam_name.includes(selectedRegulation) ? (
                  <Link
                    href={{
                      pathname: "/result",
                      query: {
                        examCode: item.examCode,
                        result: item.result,
                        type: item.type,
                        etype: item.etype,
                        degree: item.degree,
                        hallticket: hallticket.toUpperCase(),
                        selectedType: regular ? "regular" : "supply",
                      },
                    }}
                  >
                    <div className="cursor-pointer text-white p-6 m-6 text-left border border-gray-700 w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-150">
                      <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-6 text-center">
                        {item.release_date}
                      </h3>
                      <p className="mt-4 text-m text-center">
                        {" "}
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
      hallticket.length === 10 ? (
        <div>
          <h3 className="text-white text-center text-lg sm:text-2xl font-bold mt-6">
            Supply Results
          </h3>
          <div className="max-w-xs flex flex-wrap items-center justify-center sm:max-w-4xl mt-6 sm:w-full">
            {supplyResults.map((item) => (
              <div>
                {item.exam_name.includes(selectedRegulation) ? (
                  <Link
                    href={{
                      pathname: "/result",
                      query: {
                        examCode: item.examCode,
                        result: item.result,
                        type: item.type,
                        etype: item.etype,
                        degree: item.degree,
                        hallticket: hallticket.toUpperCase(),
                        selectedType: regular ? "regular" : "supply",
                      },
                    }}
                  >
                    <div className="cursor-pointer text-white p-6 m-6 text-left border border-gray-700 w-96 rounded-xl hover:border-gray-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-blue-900 duration-150">
                      <h3 className="text-sky-400 text-lg sm:text-xl font-bold p-6 text-center">
                        {item.release_date}
                      </h3>
                      <p className="mt-4 text-m text-center">
                        {" "}
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
  );
}
