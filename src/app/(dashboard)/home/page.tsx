import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'


const Home = () => {

  const features = [
    {
      name: 'Test',
      description:
        'Create a Test, Invite and Evaluate.',
      link: "/test"
    },
    {
      name: 'Results',
      description:
        'The Test results display the confidence analysis of the users over that subject',
      link: "/test/results"
    },
    {
      name: 'User Friendly',
      description:
        'The system is easy to use and understand',
      link: "/test/new"
    },
    {
      name: 'Advanced security',
      description:
        'The  system is highly secure with modern technology and tools',
      link: "/test"
    },
  ]

  return (
    <div className="bg-white py-24 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Welcome Creator !</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you {" "}
            <span className='bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-[length:100%_6px] bg-no-repeat bg-bottom'>

              need to know
            </span>
          </p>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            MASCAA is a comprehensive human confidence analysis platform. This works in evaluating the confidece of the user taking a test through video and audio .
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature, i) => (
              <div key={feature.name} className="relative sm:p-2 rounded-xl  bg-gradient-to-tl  from-[#9CECFB] via-[#65C7F7] to-[#0052D4]">
                <Card className='h-full flex flex-col justify-between '>
                  <CardHeader>
                    <CardTitle>{feature?.name}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>

                  <CardFooter className='mt-auto p-3 items-center flex justify-end'>
                    {<Link href={feature.link}>
                      <DoubleArrowRightIcon />
                    </Link>}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Home