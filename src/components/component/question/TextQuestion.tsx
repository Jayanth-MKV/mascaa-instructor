import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TextSubQuesEdit from './SubQuestionEdit'
import { Badge } from '@/components/ui/badge'
import { FileTextIcon } from '@radix-ui/react-icons'

const TextQuestion = ({ question, id }: any) => {
  return (
    <div className='md:p-3 flex flex-col justify-between h-auto'>
      <Card className='py-3' >

        <div className='flex p-3'>
          <FileTextIcon className='mr-5' width={20} height={20} />
          Text Sub Question
        </div>
        <div className='px-3'>This question can be an MCQ ( recommended ) or T/F or one word answers </div>
      </Card>
      <div className='relative flex-1 mt-5'>
        {question?.title && <TextSubQuesEdit testId={id} id={question?._id} title={question?.title} content={question?.content} correctAnswer={question?.correctAnswer} />}
        <CardHeader>
          <CardTitle className='text-xl'>
            {question?.title}
          </CardTitle>
          <CardDescription>
            <div dangerouslySetInnerHTML={{ __html: question?.content }} className='renderhtml '></div>
          </CardDescription>
          <CardDescription className='my-3 py-3'>
            {question?.correctAnswer &&
              <>
                Correct Answer
                <Badge className='ml-3'>
                  {question?.correctAnswer}
                </Badge>
              </>
            }
          </CardDescription>
        </CardHeader>
      </div>
      {/* <Card className='flex-1'>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>

      </Card> */}
    </div>
  )
}

export default TextQuestion