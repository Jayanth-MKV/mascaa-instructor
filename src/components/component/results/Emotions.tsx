"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NoData from '../home/NoData';
import { evalType } from '@/types/types';


const Emotions = ({ data }: any) => {


    const [Vem, setVem] = useState<Record<string, number>[]>([]);
    const [Aem, setAem] = useState<Record<string, number>[]>([]);

    const makeBarData = (d: evalType[]) => {
        const vem: Record<string, number> = {};
        const aem: Record<string, number> = {};

        d?.forEach((item: evalType) => {
            const v: string = item?.videoEmotion
            if (v) {
                vem[v] = (vem[v] || 0) + 1;
            }

            const a: string = item?.audioEmotion;
            if (a) {
                aem[a] = (aem[a] || 0) + 1;
            }
        });

        const arrVem = Object.keys(vem).map((emo: string) => {
            return {
                name: emo,
                "No Of Questions": vem[emo]
            }
        })
        const arrAem = Object.keys(aem).map((emo: string) => {
            return {
                name: emo,
                "No Of Questions": aem[emo]
            }
        })
        setVem(arrVem as any);
        setAem(arrAem as any);
        console.log(arrVem)
        console.log(arrAem)
    }

    const valueFormatter = (number: number) =>
        `${Intl.NumberFormat('us').format(number).toString()}`;


    useEffect(() => {
        if (data) {
            makeBarData(data);
        }
        console.log(data), "----------"
    }, [data])

    return (
        <div className='grid grid-cols-2'>
            <Card className='col-span-1'>
                <CardHeader>
                    <CardTitle>Emotion While Answering Text Questions</CardTitle>
                </CardHeader>
                <CardContent className='h-[400px]'>
                    {Vem.length != 0 &&
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={Vem}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="No Of Questions" fill="black" activeBar={<Rectangle fill="#0047AB" stroke="black" />} />
                                {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
                            </BarChart>
                        </ResponsiveContainer>
                    }

                    {Vem.length == 0 &&
                        <Card className='h-[400px]'>
                            <NoData text=""/>
                        </Card>
                    }
                </CardContent>
            </Card>
            <Card className='col-span-1'>
                <CardHeader>
                    <CardTitle>Emotion Of Your Audio</CardTitle>
                </CardHeader>
                <CardContent className='h-[400px]'>
                    {Aem.length == 0 &&
                        <Card className='flex flex-col justify-center h-[400px]'>
                            <NoData text='No Results - Check Reports' />
                        </Card>
                    }

                    {Aem.length != 0 &&
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={Aem}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="No Of Questions" fill="black" activeBar={<Rectangle fill="#00008B" stroke="black" />} />
                                {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
                            </BarChart>
                        </ResponsiveContainer>
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default Emotions