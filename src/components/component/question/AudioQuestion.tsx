import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AudioSubQuesEdit from './AudioSubQuestionEdit'
import { SpeakerLoudIcon } from '@radix-ui/react-icons'

const AudioQuestion = ({ question, id }: any) => {
  return (
    <div className='md:p-3 '>
      <Card className='py-3' >

        <div className='flex p-3'>
          <SpeakerLoudIcon className='mr-5' width={20} height={20} />
          Audio Sub Question
        </div>
        <div className='px-3'>This question can be an a general question ( recommended ). The answer is speech, so ask accordingly</div>
      </Card>
      <Card className='relative my-10'>
        {question?.title && <AudioSubQuesEdit testId={id} id={question?._id} title={question?.title} content={question?.content} powerReference={question?.powerReference} />}
        <CardHeader>
          <CardTitle className='text-xl'>
            {question?.title}
          </CardTitle>
          <CardDescription>
            <div dangerouslySetInnerHTML={{ __html: question?.content }} className='renderhtml '></div>
          </CardDescription>
          <CardDescription className='py-5'>
            {question?.powerReference &&
              <>
                <strong>
                  Reference Answer :
                </strong>
                <code>
                  {question?.powerReference}
                </code>
              </>
            }
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export default AudioQuestion