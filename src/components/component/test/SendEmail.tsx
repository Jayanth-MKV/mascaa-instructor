import Loading from '@/app/(dashboard)/test/loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useApiSend } from '@/hooks/network/rq';
import { sendEmail } from '@/hooks/server/test/email';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SendEmail = ({ link, test }: any) => {
    const { toast } = useToast();
    const router = useRouter();
    const params = useParams<{ id: string }>()

    const id = params?.id;

    const [email, setemail] = useState("")

    const { mutate, isPending } = useApiSend(
        sendEmail,
        (data: any) => {
            console.log(data)
            toast({
                title: data?.message,
                description: "Invites Sent!"
            })
            router.push(`/test/${id}`)
            router.refresh();

        },
        (e: any) => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Cannot send invites - wait for sometime and try again",
                description: e?.message
            })
        },
    );

    if (isPending) {
        return <Loading />;
    }


    const onSubmit = async () => {

const payload ={
    to:email,
    name:"Candidate",
    subject:"Invitation for test on "+test,
    link:link
}

        if (email && email?.length != 0 && id) {
            mutate({ "data": payload });
        }
    }


    return (
        <>
            <Input value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="Send Email" />
            <Button className="mt-4 " onClick={onSubmit}>Send</Button>
        </>
    )
}

export default SendEmail