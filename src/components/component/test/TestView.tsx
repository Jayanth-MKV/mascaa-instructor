"use client"
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';
import { toLocaleFormat } from '../date-time-picker/time-picker-utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FileTextIcon } from '@radix-ui/react-icons';

const ViewTest = ({ test }) => {

  const router = useRouter();
  const { title, instructions, guidelines, tandc, testSecret, keywords, durationMinutes, startTime, endTime } = test;

  //   function htmlDecode(input){
  //    var e = window.document.createElement('div');
  //    e.innerHTML = input;
  //    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  //  }

  const [startDate, setstartDate] = useState(startTime);
  const [endDate, setendDate] = useState(endTime);

  useEffect(() => {
    setstartDate(toLocaleFormat(startTime));
    setendDate(toLocaleFormat(endTime));
  }, [startTime, endTime])


  return (

    <div className="md:container mx-auto md:px-4 md:w-[70%]">
      <Card >
        <CardHeader>
          <CardTitle className='text-xl'>{title}</CardTitle>
          <Separator className='my-3' />
          <CardDescription>
          </CardDescription>
          <div className='flex gap-2 flex-wrap'> {keywords.map((keyword: string) => <Badge key={keyword}>{keyword}</Badge>)}</div>
        </CardHeader>

        <Separator className='my-3' />
        <CardContent className='md:p-5'>

          <div className='overflow-auto'>
            <div>
              <h2 className='font-bold mb-3'>
                <div>
                  Instructions:
                </div>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: instructions }} className='renderhtml '></div>
            </div>
            <Separator className='my-3' />
            <div>
              <h2 className='font-bold mb-2'>
                <div>
                  Guidelines:
                </div>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: guidelines }} className='renderhtml '></div>

            </div>
            <Separator className='my-3' />
            <div>
              <h2 className='font-bold mb-2'>
                <div>
                  Terms & Conditions:
                </div>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: tandc }} className='renderhtml '></div>
            </div>
            <Separator className='my-3' />
            <div>
              <h2 className='font-bold mb-2'>
                <div>
                  Test Secret:
                </div>
              </h2> {testSecret}</div>
            <Separator className='my-3' />
            <div>
              <h2 className='font-bold mb-2'>
                <div>
                  Duration:
                </div>
              </h2> {durationMinutes} minutes</div>
            <Separator className='my-3' />
            <div>
              <h2 className='font-bold mb-2'>
                <div>
                  Start Time:
                </div>
              </h2> {startDate}</div>
            <Separator className='my-3' />
            <div>
              <h2 className='font-bold mb-2'>
                <div>
                  End Time:
                </div>
              </h2> {endDate}</div>
          </div>
        </CardContent>
      </Card>
      <Card className='mx-auto'>
        <Button className="w-full" onClick={async () => {
          window.location.href="/test/" + test._id + "?tab=edit-q";
        }}>
          <FileTextIcon className="mr-2 h-4 w-4" /> View Questions
        </Button>
      </Card>
    </div>
  );
}

export default ViewTest;
