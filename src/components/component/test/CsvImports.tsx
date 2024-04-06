"use client"
import React, { useState } from "react";
import Papa from "papaparse";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FRONTEND_URL } from "@/utils/constants";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useApiSend } from "@/hooks/network/rq";
import { sendEmails } from "@/hooks/server/test/email";
import Loading from "@/app/(dashboard)/test/loading";
import { useParams } from 'next/navigation'



// Allowed extensions for input file
const allowedExtensions = ["csv"];

const CsvImports = ({link,test}:any) => {
    const params = useParams<{ id: string }>()

    const id = params?.id
    // This state will store the parsed data
    const [data, setData] = useState([]);

    // It state will contain the error when
    // correct file extension is not used
    const [error, setError] = useState("");

    // It will store the file uploaded by the user
    const [file, setFile] = useState("");

    // This function will be called when
    // the file input changes
    const handleFileChange = (e: any) => {
        setError("");

        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            // Check the file extensions, if it not
            // included in the allowed extensions
            // we show the error
            const fileExtension =
                inputFile?.type.split("/")[1];
            if (
                !allowedExtensions.includes(fileExtension)
            ) {
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    const handleParse = () => {

        // If user clicks the parse button without
        // a file we show a error
        if (!file) return alert("Enter a valid file");

        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();

        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target?.result, {
                header: true,
            });
            const parsedData = csv?.data;
            console.log(parsedData)

            setData(parsedData);
        };
        reader.readAsText(file);
    };


    const { toast } = useToast();
    const router = useRouter();

    const { mutate, isPending } = useApiSend(
        sendEmails,
        (data: any) => {
            console.log(data)
            toast({
                title: data?.message,
                description: "Invites Sent!"
            })
            router.push(`/test/${id}`)
            router.refresh();

        },
        (e: any) => {
            console.log(e)
            toast({
                variant: "destructive",
                title: "Cannot send invites - wait for sometime and try again",
                description: e?.message
            })
        },
    );

    if (isPending) {
        return <Loading />;
    }


    const onSubmit = async () => {
        const payload = data.map((d:{email:string,name:string})=>{
            return {
                to:d.email,
                name:d.name,
                subject:"Invitation for test on "+test,
                link:link
            }
        })
        if (data && data?.length != 0 && id) {
            mutate({ "data": payload });
        }
    }




    return (
        <Card className='max-w-[600px] mx-auto my-5' >
            <CardHeader>

                <CardTitle>
                    Send emails via (.csv,.xslv)
                </CardTitle>
                <CardDescription className="text-red-500">
                    CSV file must strictly be in this format : sample csv format - <a href={`${FRONTEND_URL}/sample.csv`} download={true}>Link</a>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border-dashed border-2 border-gray-500 dark:border-gray-300 rounded-md h-60 flex items-center justify-center flex-col gap-4 cursor-pointer">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">CSV or XSLV</p>
                        </div>
                    </label>
                    <input onChange={handleFileChange} id="dropzone-file" type="file" name="file"
                        className="hidden" />
                </div>
                <Button className="mt-4 " onClick={handleParse}>Get Data</Button>
            </CardContent>



            {
                data && data.length != 0 &&
                <>
                    <Table className="mx-5 overflow-visible">
                        <TableCaption>Your Data</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Email</TableHead>
                                <TableHead className="text-right">Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                data.map((row, idx) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium">{row?.email}</TableCell>
                                            <TableCell className="text-right">{row?.name}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    <Button className="mt-4 w-full" onClick={onSubmit}>Send Invites</Button>

                </>

            }


        </Card>
    );
};

export default CsvImports;
