import React from 'react'
import ResultsPieChart from './ConfPieChart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import EmotionsVideo from './Emotion-video'
import EmotionsAudio from './Emotion-audio'
import TimePieChart from './TimePieChart'
import PartialResultsAudio from './PartialResultsAudio'
import PartialResultsText from './PartialResultsVideo'
import PartialResultsRel from './PartialResultsRel'

const QuestionResult = ({idx,id,data}:any) => {

console.log(data)
  return (
    <div>
        <div className='h-fit'>
<Card className='my-5 '>
<CardHeader>
    <CardTitle>Overall Question Confidence</CardTitle>
    <CardDescription>Emotion + Answer Correctness + Time</CardDescription>
</CardHeader>
<CardContent className='h-[400px]'>
<ResultsPieChart confidence={(data.question_confidence)*100}/>
</CardContent>
</Card>
<Card className='my-5 min-h-[400px] h-fit'>
<CardHeader>
    <CardTitle>Emotion - Video</CardTitle>
    <CardDescription>taken via the webcam - evaluated using out models</CardDescription>
</CardHeader>
<CardContent className='min-h-[400px]'>
{data.videoEmotion=="" && 
<PartialResultsText id={id} index={idx} />
}
{/* <div className='font-bold'>
    Video not evaluated - <Button className='ml-5'>
        Revaluate
    </Button>
    </div> */}
{data.videoEmotion && 
<EmotionsVideo data={[data]}/>
}
</CardContent>
</Card>
<Card className='my-5 min-h-[400px] h-fit'>
<CardHeader>
    <CardTitle>Audio Emotion</CardTitle>
    <CardDescription>emotion of the answer you spoke
    <div>
        NA might be due to no submission
        </div>
    </CardDescription>
</CardHeader>
<CardContent className='min-h-[400px] flex items-center justify-center'>
{(data.audioEmotion=="" || data.audioEmotion=="NA" )&&
 <div className='font-bold'>
    <PartialResultsAudio id={id} index={idx}/>
    </div>}
{(data.audioEmotion!="" && data.audioEmotion!="NA") && 
<EmotionsAudio data={[data]}/>
}
</CardContent>
</Card>
<Card className='my-5 h-fit'>
<CardHeader>
    <CardTitle>Text Question Answer</CardTitle>
    <CardDescription>Your answer evaluated with correct answer</CardDescription>
</CardHeader>
<CardContent className=''>
{data.correctAnswer==true && <div className='text-green-500 font-bold'>
    Your Answer Is Correct 
    </div>}
{data.correctAnswer==false && <div className='font-bold text-red-500'>
    Your Answer Is Incorrect
    </div>}
</CardContent>
</Card>
<Card className='my-5 min-h-[400px] h-fit'>
<CardHeader>
    <CardTitle>Audio Relevancy</CardTitle>
    <CardDescription>
        This is the speech converted to text and then evaluated using reference answer. 
        <div className='text-red-500'>
        1% confidence might be due to no submission/poor relevance <br />
        </div>
        </CardDescription>
</CardHeader>
<CardContent className='h-[400px] flex justify-center items-center'>
{(data.audiotextRelevancy==0 || data.audiotextRelevancy=="" || !data?.audiotextRelevancy) && <div className='font-bold'>
   <PartialResultsRel id={id} index={idx} />
    </div>}
    {data.audiotextRelevancy!="" && data.audiotextRelevancy &&
<ResultsPieChart confidence={data.audiotextRelevancy}/>
}
</CardContent>
</Card>
<Card className='my-5 min-h-[400px] h-fit'>
<CardHeader>
    <CardTitle>Time Taken</CardTitle>
    <CardDescription>time taken to answer the text question - time for audio questions is not evaluated</CardDescription>
</CardHeader>
<CardContent className='h-[400px]'>
<TimePieChart total={60} time={data?.time} />
</CardContent>
</Card>
        </div>
    </div>
  )
}

export default QuestionResult



