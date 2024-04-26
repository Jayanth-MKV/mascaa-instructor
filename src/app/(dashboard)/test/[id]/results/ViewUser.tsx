"use client"
import Link from 'next/link'
import React from 'react'

const ViewUser = ({user}:any) => {
  return (
    <Link href={`/test/${user.testId}/user/${user.userId}`} >
        View Candidate
    </Link>
  )
}

export default ViewUser