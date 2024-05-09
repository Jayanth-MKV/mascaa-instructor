"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { LinkedInLogoIcon } from "@radix-ui/react-icons"
import { ExternalLinkIcon } from "lucide-react"
import Link from "next/link"
  import React from 'react'
import Meet15min from "./Meet15min"

const Contact = ({name}:any) => {
  return (
<AlertDialog>
        <AlertDialogTrigger asChild>
        <Button 
       className="w-full">
            {name}
      </Button>

        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Contact Us</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Email: lurw.org@gmail.com
          </AlertDialogDescription>
            {/* <LinkedInLogoIcon />  */}
            <div>
            LinkedIn:
            <Link target="__blank" href={"https://www.linkedin.com/in/jayanth-mkv-685609207/"}>
            <ExternalLinkIcon />
            </Link>
            </div>

<Link target="__blank" href={"https://cal.com/lurw-org/mascaa-onboarding-15-min-meeting"}>
            <Button>
                Book Meet
            </Button>
</Link>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            {/* <AlertDialogAction onClick={logout}>Logout</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>  )
}

export default Contact