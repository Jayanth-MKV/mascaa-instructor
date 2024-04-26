import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NoData from '../home/NoData'
import { evalType } from '@/types/types'
import QuestionResult from './QuestionResult'


const Reports = ({Eval,Data}:any) => {

  if(!Data){
    return <NoData text={"no results"} />
  }

  return (
    <>
     <Tabs defaultValue="question0" className="]">
  <TabsList className='flex gap-5'>
    Questions
    {
      Data && Data.map((item:evalType,idx:number)=>{
        return (
          <TabsTrigger key={idx} value={`question${idx}`}>{idx+1}</TabsTrigger>
        )
      })
    }
  </TabsList>
    {
      Data && Data.map((item:evalType,idx:number)=>{
        return (
          <TabsContent key={idx} value={`question${idx}`}>
            <QuestionResult idx={idx} id={Eval?.eval?.submissionId} data={item} />
          </TabsContent>
        )
      })
    }
</Tabs>
 
    </>
  )
}

export default Reports