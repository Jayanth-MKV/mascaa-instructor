import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSubResults } from '@/hooks/server/test/results';
import React from 'react'
import Loading from '../../loading';
import Emotions from '@/components/component/results/Emotions';
import Reports from '@/components/component/results/Reports';
import PartialResults from '@/components/component/results/PartialResults';
import PartialResultsAlgo from '@/components/component/results/PartialResultsAlgo';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const Results = async ({ params, searchParams }: {
  params: {id:string,userId:string, subId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  const data = await getSubResults(params?.subId);
  // console.log(data);
  const results = data["eval"]["results"];
  // console.log(results);

  if(!data){
    return <Loading />
  }

  if( data && typeof data == "object" && Object.keys(data).length==0){
    <div>No Data Found</div>
  }
  const quesl = data["questions"].length;
  const tt = results.reduce((acc:any,item:any)=>parseInt(item.time)+acc,0);
  const avgTime = tt/quesl;

  let correctAns = 0;
  let incorrectAns = 0;
  let notPartial = results.every((item:any)=>{
    if(item.correctAnswer!==''){
      return true;
    }
    else{
      return false;
    }
  });
  let notQPartial = data["questions"].every((item:any)=>{
    // console.log(item)
    if(item){
      return true;
    }
    else{
      return false;
    }
  });

  results.forEach((item:any) => {
    if(item.correctAnswer=="true" || item.correctAnswer==true){
      correctAns+=1
    }
    if((item.correctAnswer=="false" || !item.correctAnswer)){
      incorrectAns+=1
    }
  });



  /*
    {
    question_confidence: 0.24,
    correctAnswer: '',
    audioEmotion: '',
    videoEmotion: 'neutral',
    audiotextRelevancy: '',
    time: '3'
    }
  */


  return (
    <div>
                       <Breadcrumb className='m-5'>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/test/ongoing">completed tests</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href={`/test/${params.id}/results`}>test analysis</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href={`/test/${params.id}/user/${params.userId}`}>User</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>User Test Results</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
      <div className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Test Results</h2>
            <div className="flex items-center space-x-2">

            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-10 py-10">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="confidence analytics" >
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" >
                Reports
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Questions
                    </CardTitle>
                    
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{quesl}</div>
                    <p className="text-xs text-muted-foreground">
                      100% of actual questions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Correct Answers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">{correctAns }</div>
                    <p className="text-xs text-muted-foreground">
                      +{(correctAns*100/quesl).toFixed(0)}% of actual questions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Incorrect Answers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{incorrectAns}</div>
                    <p className="text-xs text-muted-foreground">
                      +{(incorrectAns*100/quesl).toFixed(0)}% of actual questions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg Time Taken
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{avgTime}</div>
                    <p className="text-xs text-muted-foreground">
                      +{(avgTime*100/60).toFixed(2)}% of total time
                    </p>
                  </CardContent>
                </Card>
                {!notPartial && <PartialResults  id={params?.subId} />}
                {!notQPartial && <PartialResultsAlgo  id={params?.subId} />}
                {notQPartial && <>
                  <Card className='col-span-2 flex items-center justify-evenly py-5'>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-md font-bold">
                      Test Confidence
                    </CardTitle>
                  </CardHeader>
                  <>
                    <div className="text-2xl font-bold flex justify-center items-center">
                      {(data.confidenceLevel=="LOW"? <strong className='text-red-500'>LOW</strong>:
                  (data.confidenceLevel=="MEDIUM"?<strong className='text-orange-500'>
                    MEDIUM
                  </strong>
                  :
                  <strong className='text-green-500'>
                    HIGH
                  </strong>
                  )
                  )}</div>
                  </>
                    <p className="text-xs text-muted-foreground">
                      +{Number(data.testConfidence).toFixed(2)} % of 100 %
                    </p>
                </Card>
                  </>}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              </div>
            </TabsContent>
            <TabsContent value="confidence analytics" className="space-y-4">
              <Emotions data={results}/>
</TabsContent>
            <TabsContent value="reports" className="space-y-4">
              <Reports Eval={data} Data={results} />
</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Results