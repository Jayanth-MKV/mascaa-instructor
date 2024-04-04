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
import { updateQues } from '@/hooks/server/test/url';
import { Package2Icon } from '@/components/icons/page';
import { LoadingSpinner } from '../home/loader';
import { SelectSeparator } from '@/components/ui/select';

const EditQuesSchema = z.object({
    topic: z.string().min(5, { message: "topic must be at least 5 characters long" }).max(50, { message: "title cant be more than 50 characters" }), // Assuming maximum length of 100 characters
    content: z.string().max(1500, { message: "content cant be more than 1500 characters" }),
})

const QuesEdit = ({ testId, id, topic, content }: { testId: string, id: string, topic: string, content: string }) => {

    const { toast } = useToast()
    const router = useRouter();

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

    if (isPending) {
        return (<div className="h-full w-full flex-col flex items-center p-5 gap-5 justify-center">
            <Package2Icon className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight text-gray-900 sm:text-xl">MASCCA</span>
            <LoadingSpinner />
        </div>)
    }



    const onSubmit = async (sdata: z.infer<typeof EditQuesSchema>) => {
        console.log("submitted data", sdata);
        console.log(id);
        if (sdata && id) {
            return mutate({ id, ...sdata });
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
                        <SheetTitle>Edit Question Content</SheetTitle>
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
                                                <Tiptap description={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
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