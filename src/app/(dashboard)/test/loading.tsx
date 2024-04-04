import { LoadingSpinner } from '@/components/component/home/loader'
import { Package2Icon } from '@/components/icons/page'
import React from 'react'

const Loading = () => {
    return (
        <>
            <div className="h-full w-full flex-col p-5 flex items-center gap-5 justify-center">
                <Package2Icon className="h-6 w-6" />
                <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
                <LoadingSpinner />
            </div>
        </>
    )
}

export default Loading