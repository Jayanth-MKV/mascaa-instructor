"use client"
import { Button } from '@/components/ui/button'
import { DashboardIcon, FileIcon, FileTextIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { getOngTests } from '@/hooks/server/test/url'
import { useApiGet } from '@/hooks/network/rq'
import { usePathname, useRouter } from 'next/navigation'
import { FileEditIcon } from '@/components/icons/page'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertDateToIst } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { SendHorizonalIcon } from 'lucide-react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Loading from '../loading'
import NoData from '@/components/component/home/NoData'


const page = () => {
  const { toast } = useToast();
  const router = useRouter()
  const pathname = usePathname()



  const { data,
    isLoading,
    error,
    isError,
    isLoadingError,
    refetch } = useApiGet(
      ["tests"],
      getOngTests,
      {
        enabled: true,
        refetchOnWindowFocus: true,
        retry: 1
      }
    );

  if (isError || isLoadingError) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Cannot get tests :" + error.message
    });
    refetch();
  }

  // console.log(data);



  if (isLoading) {
    return <Loading />
  }

  // const test = {
  //   createdAt:
  //     "2024-04-01T19:58:41.391Z",
  //   createdBy
  //     :
  //     "660913ff443c7da86b61911a",
  //   keywords
  //     :
  //     ['computer-science', 'mathematics'],
  //   published
  //     :
  //     false,
  //   testSecret
  //     :
  //     "AED7E9",
  //   title
  //     :
  //     "Test on cs",
  //   updatedAt
  //     :
  //     "2024-04-01T19:58:41.391Z",
  //   _id
  //     :
  //     "660b11f1a3e84b63a44a1ea7",
  // }


  return (
    <div>
      <div className="bg-white py-24 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 md:items-center gap-10 flex flex-col lg:flex-row  md:justify-between">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Published Tests</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Create Tests and Evaluate Confidence </p>
          </div>

        </div>
        <div className="items-center mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data &&
            data?.sort((a: any, b: any) => new Date(b?.updatedAt) - new Date(a?.updatedAt))?.map((test) => (
              <article className="flex max-w-xl flex-col items-center justify-between">
                <Card className='h-[380px] w-[280px] flex flex-col justify-between'>
                  <CardHeader>
                    <CardTitle className='text-2xl overflow-clip max-h-[70px] h-[70px]'>{test.title.toUpperCase()} asascascascasasc asc a sc as </CardTitle>
                    <CardDescription>{convertDateToIst(test.createdAt)}</CardDescription>
                  </CardHeader>
                  <ScrollArea className="w-full p-2 whitespace-nowrap rounded-md border">
                    <CardContent className='flex gap-3 overflow-hidden max-h-[100px] h-fit'>
                      {test?.keywords && test?.keywords.map((k: string) => (
                        <Badge>{k}</Badge>
                      ))}
                    </CardContent>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                  <CardFooter>
                    <div className='flex flex-col gap-5 w-full'>
                      <Button className="w-full" onClick={() => {
                        router.push("/test/" + test._id+"?tab=publish");
                      }}>
                        <FileTextIcon className="mr-2 h-4 w-4" /> View
                      </Button>
                      <Button className="w-full" onClick={() => {
                        router.push("/test/" + test._id+"/results");
                      }}>
                        <DashboardIcon className="mr-2 h-4 w-4" /> Results
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </article>
            ))
          }

        </div>
        {
          data!=undefined && data?.length == 0 && <>
            <NoData  text='No Ongoing Tests'/>
            <div className='w-full flex justify-center mt-5'>
              <Button className="max-w-[200px]" onClick={() => {
                router.push("/test")
              }}>
                <PlusCircledIcon className="mr-2 h-4 w-4" /> View Tests
              </Button>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default page