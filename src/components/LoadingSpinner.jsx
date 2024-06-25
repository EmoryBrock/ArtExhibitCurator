import React from 'react'

//code by The Geeky Codes: https://thegeekycodes.com/custom-loading-spinners-in-react-using-tailwind/


export default function LoadingSpinner() {
  return (
    <div className='flex flex-col items-center justify-center pt-20'>
        <div className='flex space-x-2'>
            <div className='h-5 w-5 rounded-full bg-indigo-500 animate-bounce'></div>
            <div className='h-5 w-5 rounded-full bg-indigo-500 animate-bounce2'></div>
            <div className='h-5 w-5 rounded-full bg-indigo-500 animate-bounce'></div>
        </div>
        <div className='mt-4 text-center'>
            <p className='text-xl font-semibold text-gray-700'>
                Loading...
            </p>
            <p className='text-lg text-gray-500'>
                Searching my art resources
            </p>
        </div>
    </div>
  )
}
