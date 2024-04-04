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
import { ReactNode } from "react"

export function CustomPopUp({ triggercomp, title, description, todoFunction, ok }: { ok: string, triggercomp: ReactNode, title: string, description: string, todoFunction: any }) {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {triggercomp}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={todoFunction}>{ok}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
