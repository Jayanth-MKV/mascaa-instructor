"use client"
import Loading from '@/app/(dashboard)/test/loading'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useApiSend } from '@/hooks/network/rq'
import { ReEvalTest } from '@/hooks/server/test/results'
import { useRouter } from 'next/navigation'
import React from 'react'

const PartialResults = ({ id }: any) => {
  const { toast } = useToast()
  const router = useRouter();

  const { mutate, isPending } = useApiSend(
    ReEvalTest,
    (data: any) => {
      console.log(data)
      toast({
        title: "success",
        description: "Reloaded Results"
      })
      router.push(`/test/${id}/results`);
      router.refresh();
    },
    (e: any) => {
      console.log(e)
      toast({
        variant: "destructive",
        title: "Cannot Reload",
        description: e?.message
      })
    },
  );

  if (isPending) {
    return (<Loading />)
  }



  const onSubmit = async () => {
    // console.log(id)
    mutate({ id: id } as any);

  }


  return (
    <> <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-bold py-3">
          Reload results
          <>
            <Button onClick={onSubmit} className='mt-5 ml-5'>
              reload
            </Button>
          </>
        </CardTitle>
      </CardHeader>
    </Card></>
  )
}

export default PartialResults