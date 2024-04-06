// import { LoadingSpinner } from '@/components/component/loader';
// import { Package2Icon } from '@/components/icons/page';
// import { useToast } from '@/components/ui/use-toast';
import EditTest from '@/components/component/test/EditTest';
import { generateQues, getQues, getTest } from '@/hooks/server/test/url';
// import { useApiGet } from '@/hooks/network/rq';
// import { getTest } from '@/hooks/server/test/url';
// import { useParams, useRouter } from 'next/navigation'
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ViewTest from '@/components/component/test/TestView';
import EditQues from '@/components/component/test/EditQues';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from '@radix-ui/react-icons';
import PublishTest from '@/components/component/test/PublishTest';
import UnPublishTest from '@/components/component/test/UnPublishTest';



const page = async ({ params, searchParams }: {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    // const { toast } = useToast();
    // const router = useRouter()
    // const params = useParams<{ id: string; }>()


    const data = await getTest(params.id);
    const d = Object.keys(data);
    console.log(data);

    const data1 = await getQues(params.id);
    const d1 = Object.keys(data1);
    // console.log(data1);

    const currentTab = searchParams['tab'];

    const Tabts = () => {

        return (
            <>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="edit-d">Test Instructions</TabsTrigger>
                <TabsTrigger value="edit-q">Test Questions</TabsTrigger>
                <TabsTrigger value="publish">Publish</TabsTrigger>
            </>
        )
    }



    return (
        <div>
            <Tabs defaultValue={(currentTab && typeof currentTab == "string") ? currentTab : "publish"} className="w-full">
                <TabsList className='hidden md:flex mb-5 sticky top-2 left-2 w-fit h-auto gap-2 '>
                    <Tabts />
                </TabsList>
                <DropdownMenu>
                    <DropdownMenuTrigger className='md:hidden justify-between  flex w-full gap-3 p-3 border border-black rounded-md'>
                        Options
                        <ChevronDownIcon height={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <TabsList className='flex-col flex-wrap h-auto gap-2 min-w-[15rem]'>
                            <Tabts />
                        </TabsList>
                    </DropdownMenuContent>
                </DropdownMenu>

                <TabsContent value="overview" className="md:p-3">
                    {/* {JSON.stringify(data)} */}
                    <div className='font-bold text-2xl text-center p-3 sticky top-0 bg-white'>Test Overview</div>
                    <ViewTest test={data} />
                </TabsContent>
                <TabsContent value="edit-d" className="p-3">
                    <div className='font-bold text-2xl text-center p-3 sticky top-0 bg-white'>Test Instructions</div>
                    {params?.id && data && data?.title && <EditTest data={{
                        title: data.title,
                        instructions: data?.instructions,
                        guidelines: data?.guidelines,
                        tandc: data?.tandc,
                        testSecret: data?.testSecret,
                        keywords: data?.keywords,
                        durationMinutes: data?.durationMinutes,
                        startTime: data?.startTime,
                        endTime: data?.endTime,
                    }}
                        id={params?.id}
                    />}
                </TabsContent>
                <TabsContent value="edit-q" className="p-3">
                    <div className='font-bold text-2xl text-center p-3 py-5 border-b-2 border-gray-300 sticky z-[49] top-0 bg-white'>Test Questions</div>
                    {data1!=undefined &&
                        <EditQues data={data1} id={params.id} />
                    }
                </TabsContent>
                <TabsContent value="publish" className="p-3">
                    <div className='font-bold text-2xl text-center p-3 sticky top-0 bg-white'>
                        Test Publish & Share</div>
                    {data!=undefined && data?.published && params?.id &&
                        <PublishTest id={params.id} test={data?.title} />
                    }
                    {
                        data!=undefined && !data?.published &&
                        <UnPublishTest id={params.id}  />
                    }
                </TabsContent>

            </Tabs>

        </div>
    )
}

export default page