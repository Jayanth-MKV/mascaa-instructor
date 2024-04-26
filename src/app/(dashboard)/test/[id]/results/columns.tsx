"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import ViewUser from "./ViewUser"
import ViewUserResults from "./ViewUserResults"


export type UserTableType = {
  id: string
  confidenceScore: number
  confidenceLevel: "LOW" | "MEDIUM" | "HIGH"
  email: string
}

export const columns: ColumnDef<UserTableType>[] = [
  {
    accessorKey: "submissionId",
    header: "Id",
    cell: ({ row }) => (<>{row.getValue('submissionId').slice(0,5)}...</>)
  },
  {
    accessorKey: "userId",
    header: "User",
    cell: ({ row }) => (<>{row.getValue('userId').slice(0,5)}...</>)
  },
  {
    accessorKey: "testConfidence",
    header:  ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Confidence Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "testId",
    header: "Confidence Level",
      cell: ({ row }) => {
        const getConfLvl =  (cf:number)=>{
            return (cf<=60) ? "LOW" : (cf>=60 && cf<=80 )? "MEDIUM" : "HIGH";
        }
        
    return  <div className="uppercase">
        <div className=" font-bold flex justify-start items-center">
          {(getConfLvl(row.getValue("testConfidence"))=="LOW"? <strong className='text-red-500'>LOW</strong>:
          (getConfLvl(row.getValue("testConfidence"))=="MEDIUM"?<strong className='text-orange-500'>
                    MEDIUM
                  </strong>
                  :
                  <strong className='text-green-500'>
                    HIGH
                  </strong>
                  )
                  )}
                  </div>
    </div>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
           
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ViewUser user={{testId:row.getValue('testId'),userId:row.getValue('userId')}} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ViewUserResults user={{testId:row.getValue('testId'),userId:row.getValue('userId'),subId:row.getValue('submissionId')}}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
]
 