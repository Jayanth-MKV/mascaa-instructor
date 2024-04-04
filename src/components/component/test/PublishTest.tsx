"use client"
import React, { useCallback, useRef, useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { TooltipTrigger, TooltipContent, Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { ClipboardIcon, UploadIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import { useApiGet } from '@/hooks/network/rq'
import { getInviteLink } from '@/hooks/server/test/url'
import Loading from '@/app/(dashboard)/test/loading'
import { toast } from "sonner"
import { PUBLISH_URL } from '@/utils/constants'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'


const PublishTest = ({ id }: { id: string }) => {

    const [copied, setCopied] = useState(false);
    // const [content, setContent] = useState("ascascascascas")

    const inp = useRef(null);

    const GetLink = useCallback(

        async () => {
            return await getInviteLink({ id });
        },
        [id],
    );

    const { data,
        isLoading,
        isError,
        isLoadingError,
        // isSuccess,
        refetch } = useApiGet(
            ["invitelink"],
            GetLink,
            {
                enabled: true,
                refetchOnWindowFocus: true,
                retry: 1
            }
        );

    if (isError || isLoadingError) {
        console.log("error in invite link")
        toast.error({
            title: "Error",
            description: "Cannot get Invite Link",
            action: {
                label: "Refetch",
                onClick: () => refetch(),
            },
        })

    }
    //   console.log(data);



    if (isLoading) {
        return <Loading />
    }



    const copyToClipboard = async () => {
        try {

            const content = inp?.current?.value;
            if (content || data) {
                // Write the text to the clipboard
                await navigator.clipboard.writeText(content || `${PUBLISH_URL}${data}`);
            }

            // Set copied state to true
            setCopied(true);

            // Reset copied state after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div>
            <Card className='max-w-[400px] mx-auto my-5'>
                <CardHeader>
                    <CardTitle className='mb-5'>Test Status -
                        <Badge className='ml-3 bg-green-400' variant="default">published</Badge>
                    </CardTitle>
                    <Separator className='mb-3' />
                    <CardTitle>Invite</CardTitle>
                    <CardDescription>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    {data != undefined &&
                                        <Button className='px-0 w-full' variant="outline" onClick={copyToClipboard}>
                                            <div className='w-full'>
                                                <Input ref={inp} type="text" placeholder="Invite Link" defaultValue={`${PUBLISH_URL}${data}`} />
                                            </div>
                                            <ClipboardIcon className="mx-2 h-4 w-4" />
                                        </Button>
                                    }
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{copied ? "Copied!" : "Click to copy"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardDescription>
                    <br className='space-y-10' />
                    <CardTitle>
                        Share Link
                    </CardTitle>
                    <CardDescription>
                        <Input ref={inp} type="email" placeholder="Send Email" />
                    </CardDescription>
                </CardHeader>
                <br className='space-y-5' />
                <CardHeader>

                    <CardTitle>
                        Send emails via (.csv,.xslv)
                    </CardTitle>
                    <CardDescription>
                        sample csv format - <a href="http://google.com" download={true}>Link</a>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border-dashed border-2 border-gray-500 dark:border-gray-300 rounded-md h-60 flex items-center justify-center flex-col gap-4 cursor-pointer">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">CSV or XSLV</p>
                            </div>
                        </label>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </div>
                    <Button className="mt-4 w-full">Send</Button>
                </CardContent>
            </Card>

        </div>
    )
}

export default PublishTest;