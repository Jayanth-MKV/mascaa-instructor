import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { FileIcon } from '@radix-ui/react-icons'
import React from 'react'

const page = () => {

  return (
    <div>
      <div className="grid min-w-[300px] gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Card className="w-full">
                <CardContent className="flex justify-between flex-col">
                  <div className="space-y-2">
                    <CardTitle>Mathematics</CardTitle>
                    <CardDescription>This is a mathematics test</CardDescription>
                  </div>
                  <FileIcon className="w-6 h-6" />
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardContent className="flex justify-between flex-col">
                  <div className="space-y-2">
                    <CardTitle>Science</CardTitle>
                    <CardDescription>This is a science test</CardDescription>
                  </div>
                  <FileIcon className="w-6 h-6" />
                </CardContent>
              </Card>
              <Card className="w-full">
                <CardContent className="flex justify-between flex-col">
                  <div className="space-y-2">
                    <CardTitle>History</CardTitle>
                    <CardDescription>This is a history test</CardDescription>
                  </div>
                  <FileIcon className="w-6 h-6" />
                </CardContent>
              </Card>
            </div>
    </div>
  )
}

export default page