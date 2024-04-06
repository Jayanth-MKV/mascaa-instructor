"use client"
import { Button } from '@/components/ui/button'
import { FileIcon, FileTextIcon, PlusCircledIcon, Share1Icon } from '@radix-ui/react-icons'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { getTests } from '@/hooks/server/test/url'
import { useApiGet, useApiSend } from '@/hooks/network/rq'
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
import Loading from './loading'
import NoData from '@/components/component/home/NoData'


const page = () => {
  const { toast } = useToast();
  const router = useRouter()
  const pathname = usePathname()



  const { data,
    isLoading,
    isError,
    isLoadingError,
  } = useApiGet(
    ["tests"],
    getTests,
    {
      enabled: true,
      refetchOnWindowFocus: true,
      retry: 1
    }
  );

  if (isError || isLoadingError)
    toast({
      variant: "destructive",
      title: "Error",
      description: "Cannot get tests"
    })

  // console.log(data);



  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className="bg-white py-24 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 md:items-center gap-10 flex flex-col lg:flex-row  md:justify-between">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">All Tests</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">Create Tests and Evaluate Confidence </p>
          </div>
          <div className='max-w-[200px]'>
            <Button className="w-full" onClick={() => {
              router.push(pathname + "/new")
            }}>
              <PlusCircledIcon className="mr-2 h-4 w-4" /> Create Test
            </Button>
          </div>
        </div>
        <div className="items-center mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {data != undefined &&
            data?.sort((a: any, b: any) => new Date(b?.updatedAt) - new Date(a?.updatedAt))?.map((test: any) => (
              <article className="flex max-w-xl flex-col items-center justify-between">
                <Card className='h-[400px] w-[280px] flex flex-col justify-between'>
                  {test?.published && <Badge className='bg-green-400'>Published</Badge>}
                  {!test?.published && <Badge variant={'destructive'}>Not Published</Badge>}
                  <CardHeader>
                    <CardTitle className='text-2xl overflow-clip max-h-[70px] h-[70px]'>{test.title.toUpperCase()}</CardTitle>
                    <CardDescription>{convertDateToIst(test.updatedAt, {
                      timeZone: "Asia/Kolkata",
                      dateStyle: "long",
                      timeStyle: "short",
                    })}</CardDescription>
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
                        router.push("/test/" + test._id);
                      }}>
                        <FileTextIcon className="mr-2 h-4 w-4" /> View
                      </Button>
                      <Button className="w-full" onClick={() => {
                        router.push("/test/" + test._id + "?tab=edit-d")
                      }}>
                        <FileEditIcon className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button className="w-full" onClick={() => {
                        router.push("/test/" + test._id + "?tab=publish")
                      }}>
                        <Share1Icon className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </article>
            ))
          }
        </div>
        {
          data != undefined && data?.length == 0 && <>
            <NoData />
            <div className='w-full flex justify-center mt-5'>
              Create New Tests
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default page