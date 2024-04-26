import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTestEvaluation, getTestSubmissions } from '@/hooks/server/test/results';
import Image from 'next/image';
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getConfLevel } from '@/utils/helpers';
import Takers from '@/components/component/results/Takers';


const Results = async ({ params, searchParams }: {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  const data = await getTestSubmissions(params?.id);
  // console.log(data);
  // console.log(searchParams);
  const totalSubs = data?.length;
  const dataE = await getTestEvaluation(params?.id);
  // console.log(dataE);
  let HCount=0,MCount=0,LCount=0;
  await Promise.all(dataE.map(async (item:any) => {
    if(await getConfLevel(item.testConfidence) === "HIGH"){
      HCount++;
    }
    else if(await getConfLevel(item.testConfidence) === "MEDIUM"){
      MCount++;
    }
    else if(await getConfLevel(item.testConfidence) === "LOW"){
      LCount++;
    }
    return;
  }));


  return (
    <div>
                        <Breadcrumb className='mx-6 py-5'>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/test">tests</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>results</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Test Analytics</h2>
            <div className="flex items-center space-x-2">
              {/* <Button>Print</Button> */}
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className='mb-10'>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="takers" >
                Test Takers
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Submissions
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalSubs}</div>
                    <p className="text-xs text-muted-foreground">
                      Total Test Takers Count
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-red-600">
                      High Confidence
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{HCount}</div>
                    <p className="text-xs text-muted-foreground">
                      80-100% best performers
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-400">
                      Medium Confidence
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{MCount}</div>
                    <p className="text-xs text-muted-foreground">
                    60-80% average performers                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-green-500">
                      Low Confidence
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{LCount}</div>
                    <p className="text-xs text-muted-foreground">
                    +0-60% performers                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="takers" className="space-y-4">
            <Takers test={dataE} />
          </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Results;