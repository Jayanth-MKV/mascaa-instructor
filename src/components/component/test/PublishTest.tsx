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
import CsvImports from './CsvImports'
import SendEmail from './SendEmail'


const PublishTest = ({ id,test }: { id: string,test:string }) => {

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
            {data!=undefined && data?.length!=0  && <SendEmail link={ `${PUBLISH_URL}${data}`} test={test}/>}
                    </CardDescription>
                </CardHeader>
                <br className='space-y-5' />
            </Card>
            {data!=undefined && data?.length!=0  && <CsvImports link={ `${PUBLISH_URL}${data}`} test={test}/>}

        </div>
    )
}

export default PublishTest;