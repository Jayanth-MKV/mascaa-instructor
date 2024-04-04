import icon from '@/img/nodata.svg'
import Image from 'next/image'
import React from 'react'

const NoData = ({text}:{text:string}) => {
  return (
    <div className='w-full h-fit flex flex-col items-center justify-center gap-10'>
    <Image height={200} width={200} src={icon} alt="icon" />
        <h1 className='text-xl'> {text || "No Tests" }</h1>
    </div>
  )
}

export default NoData;