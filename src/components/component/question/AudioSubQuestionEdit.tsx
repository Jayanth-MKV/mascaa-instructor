"use client"
import React, { useEffect, useState } from 'react'

import { useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { EditIcon } from 'lucide-react';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Tiptap from '../editor/Editor';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useApiSend } from '@/hooks/network/rq';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { updateSubQues } from '@/hooks/server/test/url';
import { AIRobot, MascaaIcon, Package2Icon } from '@/components/icons/page';
import { LoadingSpinner } from '../home/loader';
import { SelectSeparator } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const EditAudioSubQuesSchema = z.object({
    title: z.string().min(10, { message: "topic must be at least 10 characters long" }).max(200, { message: "title cant be more than 200 characters" }), // Assuming maximum length of 100 characters
    content: z.string().max(1500, { message: "content cant be more than 1500 characters" }),
    powerReference: z.string().min(10, {
        message: "reference text must be at least 10 characters.",
    })
        .max(1000, { message: "content cant be more than 1000 characters" }),

})


// id - subques , testId for navigation
const AudioSubQuesEdit = ({ testId, id, title, content, powerReference,testTitle,testAbout,questionTopic,questionContent  }: {testTitle:string,testAbout:string,questionTopic:string,questionContent:string, testId: string, id: string, title: string, content: string, powerReference: string }) => {

    const { toast } = useToast()
    const router = useRouter();

    const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);


    const form = useForm<z.infer<typeof EditAudioSubQuesSchema>>({
        resolver: zodResolver(EditAudioSubQuesSchema),
        defaultValues: {
            title, content, powerReference
        }
    })


    // mutate takes only one argument
    const { mutate, isPending } = useApiSend(
        updateSubQues,
        (data: any) => {
            console.log(data)
            toast({
                title: "success",
                description: "SubQues Updated"
            })
            router.push(`/test/${testId}`)
            router.refresh();

        },
        (e: any) => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Cannot Edit",
                description: e?.message
            })
        },
    );

    
    
    const onSubmit = async (sdata: z.infer<typeof EditAudioSubQuesSchema>) => {
        const payload = {
            title: sdata?.title,
            content: sdata?.content,
            powerReference: sdata?.powerReference,
            type: "AUDIO"
        };
        console.log("submitted data", sdata);
        console.log(id);
        if (sdata && id) {
            return mutate({ id, ...payload });
        }
    }

    





    async function fetchQuestionContentFromAI() {
        console.log({ testTitle, testAbout,questionTopic,questionContent })
        try {
            const response = await fetch('/api/generate-audio-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title:testTitle,about:testAbout,topic:questionTopic,content:questionContent }),
            });

            const data = await response.text();
            console.log(data)
            try {
                const aiData = JSON.parse(data);
                return aiData[0];
              } catch (parseError:any) {
                // If the parsing fails, try to extract the valid JSON content
                const jsonStartIndex = data.indexOf('{');
                if (jsonStartIndex !== -1) {
                  const jsonContent = data.slice(jsonStartIndex);
                  const aiData = JSON.parse(jsonContent);
                  return aiData[0];
                } else {
                  throw new Error(`Error parsing AI response: ${parseError.message}`);
                }
              }
        } catch (error) {
            console.error('Error fetching question content from AI:', error);
            throw error;
        }
    }

    useEffect(() => {
      console.log(isGeneratingWithAI)
    }, [isGeneratingWithAI])
    



    const generateWithAI = async () => {
        setIsGeneratingWithAI(true);
        try {
            // Fetch the new question content from the AI
            const newQuestionContent = await fetchQuestionContentFromAI();
            console.log(newQuestionContent)
            // Update the form fields with the new content
            form.setValue('title', newQuestionContent.title);
            form.setValue('content', newQuestionContent.content);
            form.setValue('powerReference', newQuestionContent.referenceAnswer);
        } catch (error) {
            console.error('Error generating question content:', error);
            toast({
                variant: "destructive",
                title: "Failed to generate question content",
                description: 'Please try again later.'
            })
        } finally {
            // setIsGeneratingWithAI(false);
        }
    }







    
    if (isPending) {
        return (<div className="h-full w-full flex-col flex items-center gap-5 justify-center">
            <Package2Icon className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
            <LoadingSpinner />
        </div>)
    }

    return (
        <div>
            <Sheet>
                <SheetTrigger>
                <Badge  className='bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 absolute top-3 right-20'>AI</Badge>
                <AIRobot  className='absolute top-0 right-8' />
                    <EditIcon height={20} width={20} className='absolute top-3 right-3' />
                 </SheetTrigger>
                <SheetContent side={"right"} className='w-full overflow-y-auto'>
                    <SheetHeader>
                        <SheetTitle>Edit Sub Question Content</SheetTitle>
                        <Button className='font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800' 
                        onClick={generateWithAI} disabled={isGeneratingWithAI}>
                            {isGeneratingWithAI ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    <MascaaIcon className="mr-2 rounded-md h-5 w-5" />
                                    Generate with AI
                                </>
                            )}
                        </Button>
                        <SheetDescription>
                            Make sure the question content is related to both the sub question content. Something like the content which helps the user in answering the subquestions
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-4 py-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-lg font-bold'>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Give the Sub Question Title/Topic ( Heading in brief)
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <SelectSeparator />

                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-lg font-bold'>Content</FormLabel>
                                            <FormControl>
                                                <Tiptap description={field.value} onChange={field.onChange} can={isGeneratingWithAI} canChange={setIsGeneratingWithAI} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <SelectSeparator />

                                <FormField
                                    control={form.control}
                                    name="powerReference"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-lg font-bold'>Reference Answer -For Audio Answer Analysis</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="write the answer you are expecting for reference"
                                                    className="resize min-h-[200px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <SheetFooter>
                                <Button type="submit">Save changes</Button>
                            </SheetFooter>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AudioSubQuesEdit