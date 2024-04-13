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
import { updateQues } from '@/hooks/server/test/url';
import { MascaaIcon, Package2Icon } from '@/components/icons/page';
import { LoadingSpinner } from '../home/loader';
import { SelectSeparator } from '@/components/ui/select';

const EditQuesSchema = z.object({
    topic: z.string().min(5, { message: "topic must be at least 5 characters long" }).max(50, { message: "title cant be more than 50 characters" }), // Assuming maximum length of 100 characters
    content: z.string().max(1500, { message: "content cant be more than 1500 characters" }),
})

const QuesEdit = ({getAllQuesTopics, testId, id, topic, content, title, about,keywords }: { getAllQuesTopics:any, title:string, about:string,keywords:Array<string>, testId: string, id: string, topic: string, content: string }) => {

    const { toast } = useToast()
    const router = useRouter();

    const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);


    const form = useForm<z.infer<typeof EditQuesSchema>>({
        resolver: zodResolver(EditQuesSchema),
        defaultValues: {
            topic, content
        }
    })


    // mutate takes only one argument
    const { mutate, isPending } = useApiSend(
        updateQues,
        (data: any) => {
            console.log(data)
            toast({
                title: "success",
                description: "Ques Updated"
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





    const onSubmit = async (sdata: z.infer<typeof EditQuesSchema>) => {
        console.log("submitted data", sdata);
        console.log(id);
        if (sdata && id) {
            return mutate({ id, ...sdata });
        }
    }


    async function fetchQuestionContentFromAI() {
        const all = await getAllQuesTopics();
        console.log({ title, about, keywords,exclude:all })
        try {
            const response = await fetch('/api/generate-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, about, keywords,exclude:all }),
            });

            const data = await response.text();
            console.log("------------")
            console.log(data)
            console.log("------------")
            const aiData =  JSON.parse(data);
            return aiData[0]; // Assuming the response contains the generated question content
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
            form.setValue('topic', newQuestionContent.topic);
            form.setValue('content', newQuestionContent.content);
        } catch (error) {
            console.error('Error generating question content:', error);
            toast({
                variant: "destructive",
                title: "Failed to generate question content",
                description: 'Please try again later.'
            })
        } finally {
            setIsGeneratingWithAI(false);
        }
    }


    if (isPending) {
        return (<div className="h-full w-full flex-col flex items-center p-5 gap-5 justify-center">
            <Package2Icon className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
            <LoadingSpinner />
        </div>)
    }


    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <EditIcon height={20} width={20} className='absolute top-3 right-3' />
                </SheetTrigger>
                <SheetContent side={"right"} className='w-full overflow-y-auto'>
                    <SheetHeader>
                        <SheetTitle>Edit Question Content</SheetTitle>
                        <Button className='font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800' onClick={generateWithAI} disabled={isGeneratingWithAI}>
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
                                    name="topic"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-lg font-bold'>Topic</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Give the Question Title/Topic ( Heading in brief)
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
                                                <Tiptap description={field.value} onChange={field.onChange}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <SheetFooter>
                                <SheetClose >
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default QuesEdit