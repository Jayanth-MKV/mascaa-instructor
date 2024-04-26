import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getUser } from '@/hooks/server/test/results'
import ViewUser from '@/components/component/user/ViewUser'

const page = async ({ params, searchParams }: {
  params: {id:string,userId:string, subId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {


  const user = await getUser({id:params?.userId});

  return (
    <div>
                             <Breadcrumb className='m-5'>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/test/ongoing">completed tests</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href={`/test/${params.id}/results`}>test analysis</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>User</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
<ViewUser user={user} />
    </div>
  )
}

export default page;