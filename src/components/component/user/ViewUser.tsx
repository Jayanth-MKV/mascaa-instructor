import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const ViewUser = ({user}:any) => {
  return (
    <div className='w-full flex justify-center items-center mt-10'>

    <Card className='w-1/2'>
      <CardHeader>
        <CardTitle>
        Name: {user.name}
          </CardTitle>
      <CardTitle>
        LastName : {user.lastName}
      </CardTitle>
      <CardTitle>
        Email: {user.email}
        </CardTitle>
      <CardTitle>
        Gender: {user.gender}
        </CardTitle>
      </CardHeader>
    </Card>
    </div>
  )
}

export default ViewUser