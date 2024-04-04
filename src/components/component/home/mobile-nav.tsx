import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"
import { FileEditIcon, FileIcon, HamMenu, HomeIcon } from "../../icons/page"
import { cn } from "@/lib/utils"


export function DrawerDemo({ className, children }: any) {


    return (
        <div
            className={cn("", className)}
        >
            <Drawer >
                <DrawerTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                        <HamMenu />
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <nav className="grid items-center px-4 text-sm font-medium">
                        <Link
                            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                            href="/home"
                        >

                            <HomeIcon className="h-4 w-4" />
                            <DrawerClose>
                                Home
                            </DrawerClose>
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                            href="/test"
                        >
                            <FileIcon className="h-4 w-4" />
                            <DrawerClose>
                                Test
                            </DrawerClose>
                        </Link>
                        <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/test/ongoing"
            >
              <FileIcon className="h-4 w-4" />
              Ongoing Tests
            </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                            href="/test/new"
                        >
                            <FileEditIcon className="h-4 w-4" />
                            <DrawerClose>
                                Create Test
                            </DrawerClose>
                        </Link>
                        {children}
                    </nav>
                </DrawerContent>
            </Drawer>
        </div>
    )
}



