"use client"

import { LoadingSpinner } from '@/components/component/home/loader';
import { FancyMultiSelect } from '@/components/component/extra/multi-select';
import { Package2Icon } from '@/components/icons/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useApiSend } from '@/hooks/network/rq';
import { createTest } from '@/hooks/server/test/url';
import { Test } from '@/types/types';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TOPICS } from '@/utils/constants';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const FormSchema = z.object({
  title: z.string().min(3, { message: 'title must be at least 3 characters' }),
  about: z.string().min(30, { message: 'about must be at least 30 characters' }),
})

const Newtest = () => {


  const { toast } = useToast();

  const router = useRouter()
  const pathname = usePathname()
  const [selected, setSelected] = useState([TOPICS[1]]);

  const { register, control, handleSubmit, formState, reset } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { errors } = formState;


  const { mutate, isPending } = useApiSend(
    createTest,
    (data: any) => {
      toast({
        title: "Test Created Successfully",
        description: "success : " + data?.message,
      })
      router.push(`/test/${data?._id}`);
    },
    (e: any) => {
      toast({
        variant: "destructive",
        title: "Cannot Create Test",
        description: e?.message
      })
    },

  );

  // useEffect(() => {
  //   console.log(selected);
  // }, [selected])


  const onSubmit = async (data: Test) => {
    const payload = {
      title: data?.title,
      about: data?.about,
      keywords: selected.map((i) => (i?.value)),
    } as any
    mutate({...payload});
    console.log("submitted data", payload);
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
                  <Breadcrumb className='mx-6 py-5'>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/test">tests</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>new-test</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center py-10 gap-10">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Test</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">Create Tests and Evaluate Confidence </p>
        </div>
        <Card className="w-[350px]">
          <form onSubmit={handleSubmit(onSubmit as any)}>
            <CardHeader>
              {/* <CardTitle>Create Test</CardTitle>
              <CardDescription>Create your new Test in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input {...register("title")} placeholder="Title of your Test" />
                  {errors?.title && <Badge variant="destructive">{errors?.title?.message}</Badge>}

                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="about">About</Label>
                  <Textarea {...register("about")} placeholder="About your Test" />
                  {errors?.about && <Badge variant="destructive">{errors?.about?.message}</Badge>}

                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Keywords</Label>
                  <FancyMultiSelect frameworks={TOPICS} value={selected} setValue={setSelected} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => reset()}>Cancel</Button>
              <Button type="submit">Create</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Newtest