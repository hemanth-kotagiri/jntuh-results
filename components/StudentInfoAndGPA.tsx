import React from 'react'

interface sgpaInfoProps {
  SGPA: string
}

interface Props {
  studentName: string
  studentHTNO: string
  sgpaInfo?: sgpaInfoProps
}

export const StudentInfoAndGPA = (props: Props) => {
  const { studentName, studentHTNO, sgpaInfo } = props
  return (
    <div>
      <div className='flex flex-col items-center justify-center text-center  dark:text-white'>
        <div className='p-6'>
          <h1 className='text-xl font-semibold'>{studentName}</h1>
          <h1 className='text-lg text-black dark:text-white sm:text-xl'>{studentHTNO}</h1>
          <hr className='w-full border-gray-700' />
        </div>
        {sgpaInfo ? (
          <div>
            <h1 className='text-xs text-gray-400 sm:text-lg'> SGPA/Verdict</h1>
            <h1
              className={`text-xl sm:text-2xl ${sgpaInfo.SGPA !== 'FAIL' ? 'text-green-600' : 'text-red-600'
                }`}
            >
              {sgpaInfo.SGPA}
            </h1>
            <br />
          </div>
        ) : null}
      </div>
    </div>
  )
}
