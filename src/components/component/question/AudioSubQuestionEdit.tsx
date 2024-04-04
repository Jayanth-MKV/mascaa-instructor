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
import { Textarea } from '@/components/ui/textarea';

const EditAudioSubQuesSchema = z.object({
    title: z.string().min(5, { message: "title must be at least 5 characters long" }).max(50, { message: "title cant be more than 50 characters" }), // Assuming maximum length of 100 characters
    content: z.string().max(1500, { message: "content cant be more than 1500 characters" }),
    powerReference: z.string().min(10, {
        message: "reference text must be at least 10 characters.",
    })
        .max(1000, { message: "content cant be more than 1000 characters" }),

})


// id - subques , testId for navigation
const AudioSubQuesEdit = ({ testId, id, title, content, powerReference }: { testId: string, id: string, title: string, content: string, powerReference: string }) => {

    const { toast } = useToast()
    const router = useRouter();

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

    if (isPending) {
        return (<div className="h-full w-full flex-col flex items-center gap-5 justify-center">
            <Package2Icon className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
            <LoadingSpinner />
        </div>)
    }



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
                                                <Tiptap description={field.value} onChange={field.onChange} />
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
                                                    placeholder="Tell us a little bit about yourself"
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