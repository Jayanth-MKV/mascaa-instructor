"use client"
import React from 'react';
import { ResponsivePie } from '@nivo/pie'



const TimePieChart = ({total,time}:any) => {

  const data = [
    {
      id: 'Time Taken',
      label: 'Time Taken in sec',
      value: time,
      color: 'black',
    },
    {
      id: 'Remaining Time',
      label: 'Remaining Taken in sec',
      value: total-time,
      color: 'white',
    },
  ];
  

 return (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        colors={{scheme:"paired"}}
        // defs={[
        //     {
        //         id: 'dots',
        //         type: 'patternDots',
        //         background: 'white',
        //         color: 'white',
                
        //         size: 4,
        //         padding: 1,
        //         // stagger: true
        //         itemTextColor:"black",
        //     },
        //     {
        //         id: 'lines',
        //         type: 'patternDots',
        //         background: 'black',
        //         color: 'black',
        //         rotation: -45,
        //         lineWidth: 6,
        //         spacing: 10
        //     }
        // ]}
        // fill={[
        //   {
        //     match: {
        //       id: 'Confident',
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'NotConfident',
        //     },
        //     id: 'lines',
        //   },
        // ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                
                translateY: 56,
                itemsSpacing: 60,
                itemWidth: 100,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                      
                        on: 'hover',
                        style: {
                            itemTextColor: '#fff',
                        }
                    }
                ],
                
            }
        ]}
    />
)
};

export default TimePieChart;