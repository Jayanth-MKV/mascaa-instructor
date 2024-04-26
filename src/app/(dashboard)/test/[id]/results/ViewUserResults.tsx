"use client"
import Link from 'next/link'
import React from 'react'

const ViewUserResults = ({user}:any) => {
  return (
    <Link href={`/test/${user.testId}/user/${user.userId}/result/${user.subId}`} >
        View User Result Analysis
    </Link>
  )
}

export default ViewUserResults