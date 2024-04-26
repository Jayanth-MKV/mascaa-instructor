"use client"
import Loading from '@/app/(dashboard)/test/loading'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useApiSend } from '@/hooks/network/rq'
import { reloadAudioRel } from '@/hooks/server/test/results'
import { useRouter } from 'next/navigation'
import React from 'react'

const PartialResultsRel = ({ id,index }: any) => {
  const { toast } = useToast()
  const router = useRouter();

  const { mutate, isPending } = useApiSend(
      reloadAudioRel,
      (data: any) => {
          console.log(data)
          toast({
              title: "success",
              description: "Revaluated Results"
          })
          router.push(`/test/${id}/results`);
          router.refresh();
      },
      (e: any) => {
          console.log(e)
          toast({
              variant: "destructive",
              title: "Cannot Revaluate",
              description: e?.message
          })
      },
  );

  if (isPending) {
      return (<Loading />)
  }



  const onSubmit = async () => {
      const payload = {
          id:id,
          index:index.toString()
      }
      console.log(payload)
       mutate({...payload} as any); 
  }



  return (
    <> <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <CardTitle className="text-sm font-bold py-3">
      Audio Text Relevance  not evaluated - 
        <div>
        <Button onClick={onSubmit} className='mt-5'>
        Revaluate AI
    </Button>
        </div>
      </CardTitle>
    </CardHeader>
  </Card></>
  )
}

export default PartialResultsRel