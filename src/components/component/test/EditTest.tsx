"use client"

import React from 'react'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Tiptap from '../editor/Editor';
import { SelectSeparator } from '../../ui/select';
import { PasswordInput } from '../extra/password-input';
import { FancyMultiSelect } from '../extra/multi-select';
import { TOPICS } from '@/utils/constants';
import { DateTimePicker } from '../date-time-picker/date-time-picker';
import { addMinutesToDate, toUniversalFormat } from '../date-time-picker/time-picker-utils';
import { useApiSend } from '@/hooks/network/rq';
import { useToast } from "@/components/ui/use-toast"
import { updateTest } from '@/hooks/server/test/url';
import { Package2Icon } from '../../icons/page';
import { LoadingSpinner } from '../home/loader';
import { EditTestType } from '@/types/types';
import { useRouter } from 'next/navigation';


const EditTestSchema = z.object({
    title: z.string().min(5, { message: "title must be at least 3 characters" }).max(50, { message: "title cant be more than 50 characters" }), // Assuming maximum length of 100 characters
    instructions: z.string().max(500, { message: "instructions cant be more than 50 characters" }), // Assuming maximum length of 500 characters
    guidelines: z.string().max(500, { message: "guidelines cant be more than 50 characters" }), // Assuming maximum length of 500 characters
    tandc: z.string().max(1000, { message: "tandc cant be more than 50 characters" }), // Assuming maximum length of 1000 characters
    testSecret: z.string().length(6, { message: "test secret cant be more than 50 characters" }).regex(/^[A-Z|0-9]+$/, {
        message: "Test secret must be all capital letters",
    }),
    keywords: z.array(z.string()), // No specific validation for keywords array
    durationMinutes: z.number().int(), // Assuming duration is an integer
    startTime: z.date(),
})
// .refine(({ startTime, endTime }) => {
//     if (!startTime) return true; // If startTime is not provided, skip validation
//     return new Date(endTime) < new Date(startTime);
// }, { message: "End time must be after start time." });

const EditTest = ({ data, id }: any) => {
    const { toast } = useToast()
    const router = useRouter();

    console.log({ data, id })

    const form = useForm<z.infer<typeof EditTestSchema>>({
        resolver: zodResolver(EditTestSchema),
        defaultValues: {
            ...data,
            startTime: data?.startTime ? new Date(data?.startTime) : new Date(0)
        }
    })

    // mutate takes only one argument
    const { mutate, isPending } = useApiSend(
        updateTest,
        (data: any) => {
            console.log(data)
            toast({
                title: "success",
                description: "Test Info Edited"
            })
            router.push(`/test/${id}`);
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



    const onSubmit = async (sdata: z.infer<typeof EditTestSchema>) => {
        const utc = await toUniversalFormat(sdata.startTime);
        const et = await addMinutesToDate(sdata.startTime, sdata?.durationMinutes);
        const payload = {
            ...sdata,
            startTime: utc,
            endTime: et,
        } satisfies EditTestType;
        console.log("submitted data", payload);
        if (payload) {
            return mutate({ id, ...payload });
        }
    }

    return (
        <div className='md:w-[70%] mx-auto'>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                This is your public display test title.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SelectSeparator />

                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg font-bold'>Instructions</FormLabel>
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
                    name="guidelines"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg font-bold'>Guidelines</FormLabel>
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
                    name="tandc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg font-bold'>Terms and Conditions (If Any)</FormLabel>
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
                    name="testSecret"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg font-bold'>Test Secret</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="testSecret" {...field} />
                            </FormControl>
                            <FormDescription>
                                Can Be shared for taking the test
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SelectSeparator />

                <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg font-bold'>Test Keywords</FormLabel>
                            <FormControl>
                                <FancyMultiSelect frameworks={TOPICS} value={field.value.map((item) => (item as any)?.value ? item : TOPICS.find((t) => t.value == item))} setValue={(i) => { field.onChange(i.value ? i.value : i); }} />
                            </FormControl>
                            <FormDescription>
                                what keywords describe your test? useful in searching the test
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SelectSeparator />
                <FormField
                    control={form.control}
                    name="durationMinutes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg font-bold'>Test Duration ( In Minutes)</FormLabel>
                            <FormControl>
                                <Input placeholder="duration of test" {...field} />
                            </FormControl>
                            <FormDescription>
                                Test Duration (default is 15 min)
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SelectSeparator />
                <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-lg font-bold'>Test Start Time</FormLabel>
                            <SelectSeparator />
                            <FormControl>
                                <DateTimePicker date={field.value} setDate={(e) => { field.onChange(e) }} />
                            </FormControl>
                            <FormDescription>
                                Start Time of the Test
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )
                    }
                />
                < SelectSeparator />
                <Button type="submit">Save</Button>
            </form >
        </Form >
        </div>

    )
}

export default EditTest