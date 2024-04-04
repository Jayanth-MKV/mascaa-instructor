"use client"
import React from 'react'

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
import { Package2Icon } from '@/components/icons/page';
import { LoadingSpinner } from '../home/loader';
import { SelectSeparator } from '@/components/ui/select';

const EditSubQuesSchema = z.object({
    title: z.string().min(5, { message: "title must be at least 5 characters long" }).max(50, { message: "title cant be more than 50 characters" }), // Assuming maximum length of 100 characters
    content: z.string().max(1500, { message: "content cant be more than 1500 characters" }),
    correctAnswer: z.string().min(1,{message:"answer cant be empty"}).max(10, { message: "answer can't be more than 10 characters" }),
})


// id - subques , testId for navigation
const TextSubQuesEdit = ({ testId,id, title, content,correctAnswer }: { testId: string,  id: string, title: string, content: string ,correctAnswer:string}) => {

    const { toast } = useToast()
    const router = useRouter();

    const form = useForm<z.infer<typeof EditSubQuesSchema>>({
        resolver: zodResolver(EditSubQuesSchema),
        defaultValues: {
            title, content,correctAnswer
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
            router.replace(`/test/${testId}`)
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

    if (isPending) {
        return (<div className="h-full w-full flex-col flex items-center gap-5 justify-center">
            <Package2Icon className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
            <LoadingSpinner />
        </div>)
    }



    const onSubmit = async (sdata: z.infer<typeof EditSubQuesSchema>) => {
        const payload = {
        title:sdata?.title,
        content:sdata?.content,
        correctAnswer:sdata?.correctAnswer,
        type:"TEXT"
        };
        console.log("submitted data", sdata);
        console.log(id);
        if (sdata && id) {
            return mutate({ id, ...payload });
        }
    }


    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <EditIcon height={20} width={20} className='absolute top-3 right-3' />
                </SheetTrigger>
                <SheetContent side={"right"} className='w-full overflow-y-auto'>
                    <SheetHeader>
                        <SheetTitle>Edit Sub Question Content</SheetTitle>
                        <SheetDescription>
                            Make sure the sub question content is related to both the sub question content. Something like the content which helps the user in answering the subquestions
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
                                            <FormLabel className='text-lg font-bold'>Question</FormLabel>
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
                                            <FormLabel className='text-lg font-bold'>Options</FormLabel>
                                            <FormControl>
                                                <Tiptap description={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormDescription>we recommend options to be in the format A,B,C,D or 1,2,3,4, or any other single word</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <SelectSeparator />

                                <FormField
                                    control={form.control}
                                    name="correctAnswer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-lg font-bold'>Correct Answer -Text Answer Analysis (just provide the option)</FormLabel>
                                            <FormControl>
                                            <Input placeholder="A" {...field} />
                                            </FormControl>
                                            <FormDescription>we recommend answer to be any one of A,B,C,D or 1,2,3,4, or any other single letter indicating the option ( This will be directly compared to the answers)</FormDescription>
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

export default TextSubQuesEdit