"use client"
import React from 'react';
import { ResponsivePie } from '@nivo/pie'



const ResultsPieChart = ({text,confidence}:any) => {

  const data = [
    {
      id: 'Confident',
      label: 'Confident',
      value: confidence,
      color: 'black',
    },
    {
      id: 'NotConfident',
      label: 'Not Confident',
      value: 100-confidence,
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
                itemsSpacing: 0,
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

export default ResultsPieChart;