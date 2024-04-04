"use client"
import React from 'react'
import NoData from '@/components/component/home/NoData';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useApiSend } from '@/hooks/network/rq';
import { generateQues } from '@/hooks/server/test/url';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Package2Icon } from '@/components/icons/page';
import { LoadingSpinner } from '../home/loader';
import { CustomPopUp } from '../extra/dialog-custom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import TextQuestion from '../question/TextQuestion';
import AudioQuestion from '../question/AudioQuestion';
import {
    // Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Separator } from '@/components/ui/separator';
import QuesEdit from '../question/QuesEdit';



const EditQues = ({ data, id }: any) => {

    const { toast } = useToast();
    const router = useRouter();

    console.log(data);



    const { mutate, isPending } = useApiSend(
        generateQues,
        (data: any) => {
            console.log(data)
            toast({
                title: "success",
                description: "Questions Generated!"
            })
            router.push(`/test/${id}`)
            router.refresh();

        },
        (e: any) => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "cannot generate questions - wait for sometime and try again",
                description: e?.message
            })
        },
    );

    if (isPending) {
        return (<div className="h-full w-full flex-col flex items-center gap-5 justify-center">
            <Package2Icon className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
            <LoadingSpinner />
        </div>)
    }


    const onSubmit = async () => {
        if (id) {
            mutate({ "testId": id });
        }
    }




    if (data && data?.length == 0) {
        return <div className='grid grid-cols-1 items-center'>
            <NoData text="No Questions" />
            <div className='w-full flex justify-center mt-5'>

                <CustomPopUp
                    triggercomp={<Button className="max-w-[200px]">
                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                        Generate New Questions
                    </Button>}
                    ok='Generate' title='Questions' todoFunction={onSubmit} description='Generate 5 Questions With 2 Sub Questions Each' />
            </div>
        </div>
    }

    // console.log("rendered", data)







    return (
        <div className='md:w-[70%] mx-auto pt-10'>{
            data &&
            <>
                <Accordion type="single" collapsible>
                    {
                        data.map((question: any, index: number) => (
                            <AccordionItem
                                key={index}
                                value={`question-${index + 1}`}
                                className="mb-4 p-3 border-2 border-slate-100"
                            >
                                <AccordionTrigger className='aria-expanded:border-slate-300 aria-expanded:border-b-4 aria-expanded:rounded-none aria-expanded:pb-5 text-md font-bold p-2 rounded-md '>{`Question ${index + 1}: ${question["question"].topic}`}</AccordionTrigger>
                                <Dialog>
                                    <AccordionContent className=" ">
                                        <div className='md:p-3 flex-2'>
                                            <div className='relative my-10 '>
                                                {question["question"]?.topic && <QuesEdit testId={question["question"]?.testId} id={question["question"]._id} topic={question["question"]?.topic} content={question["question"]?.content} />}
                                                <CardHeader>
                                                    <CardTitle className='text-xl'>
                                                        {question["question"]?.topic}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        <div dangerouslySetInnerHTML={{ __html: question["question"]?.content }} className='renderhtml '></div>
                                                    </CardDescription>
                                                </CardHeader>
                                            </div>
                                        </div>

                                        <DialogTrigger className='block mx-auto p-4'>
                                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                    Sub Questions
                                                </span>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className='overflow-y-scroll max-h-screen'>
                                            <DialogHeader>
                                                <DialogTitle>Sub Questions - ( TEXT,AUDIO )</DialogTitle>
                                                <DialogDescription>These are the sub questions for this question.</DialogDescription>
                                            </DialogHeader>
                                            <Tabs defaultValue="text" className="flex-1">
                                                <Separator />
                                                <TabsList className='my-5'>
                                                    <TabsTrigger className='text-md font-bold' value="text">Text Question</TabsTrigger>
                                                    <TabsTrigger className='text-md font-bold' value="audio">Audio  Question</TabsTrigger>
                                                </TabsList>
                                                <Separator />
                                                <TabsContent value="text" className='min-h-[350px]'><TextQuestion id={question["question"].testId} question={question["subquestion"]?.filter((item) => (item.type == "TEXT"))[0]} /></TabsContent>
                                                <TabsContent value="audio" className='min-h-[350px]'><AudioQuestion id={question["question"].testId} question={question["subquestion"]?.filter((item) => (item.type == "AUDIO"))[0]} /></TabsContent>
                                            </Tabs>
                                        </DialogContent>

                                    </AccordionContent>
                                </Dialog>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </>
        }</div>
    )
}

export default EditQues