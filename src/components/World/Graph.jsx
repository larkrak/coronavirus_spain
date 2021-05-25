import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";

const options = {
    // legend: {
    //     display: false,
    // },
    // elements: {
    //     point: {
    //         radius: 0,
    //     },
    // },
    // maintainAspectRatio: false,
    // tooltips: {
    //     mode: "index",
    //     intersect: false,
    //     callbacks: {
    //         label: function (tooltipItem, data) {
    //             return numeral(tooltipItem.value).format("+0,0");
    //         },
    //     },
    // },
    // scales: {
    //     xAxes: [
    //         {
    //             type: "time",
    //             time: {
    //                 format: "MM/DD/YY",
    //                 tooltipFormat: "ll",
    //             },
    //         },
    //     ],
    //     yAxes: [
    //         {
    //             gridLines: {
    //                 display: false,
    //             },
    //             ticks: {
    //                 // Include a dollar sign in the ticks
    //                 callback: function (value, index, values) {
    //                     return numeral(value).format("0a");
    //                 },
    //             },
    //         },
    //     ],
    // },
};

function formatData(data, caseType = 'cases') {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.timeline?.cases) {
        if (lastDataPoint) {
            if (lastDataPoint > data.timeline[caseType][date]) {

            } else {
                let newDataPoint = {
                    x: date,
                    y: data.timeline[caseType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }
        }
        lastDataPoint = data.timeline[caseType][date];
    }
    
    return chartData;
}
function Graph({ caseType, country1, country2 }) {

    const [data, setData] = useState({})
    const [data2, setData2] = useState({})

   
    console.log(country1, country2)
    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/" + country1 + "?lastdays=all")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = formatData(data, caseType);
                    setData(chartData);
                   
                });
        };
        fetchData();

        const fetchData2 = async () => {
            await fetch("https://disease.sh/v3/covid-19/historical/" + country2 + "?lastdays=all")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData2 = formatData(data, caseType);
                    setData2(chartData2);

                });
        };
        fetchData2();
    }, [caseType, country1, country2]);

    return (
        <div>
            {data?.length > 0 && (
                    <Line
                        data={{
                            labels:['1','2','3'],
                            datasets: [

                                {   label: '# of Votes',
                                    backgroundColor: 'rgb(54, 162, 235)',
                                    borderColor: 'rgba(54, 162, 235, 0.2)',
                                    data:  data
                                },
                                {   label: '# of what',
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgba(255, 99, 132, 0.2)',
                                    data:  data2
                                }
                            ]
                        }}
                        options={options}
                    />
            )}
        </div>
    )
}

export default Graph;
