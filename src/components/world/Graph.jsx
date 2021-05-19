import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

function formatData(data, caseType = 'cases') {
    let chartData = [];
    let lastDataPoint;
    
    for (let date in data.cases) {
        if (lastDataPoint) {
            if(lastDataPoint > data[caseType][date]){
                
            }else{
                let newDataPoint = {
                    x: date,
                    y: data[caseType][date] - lastDataPoint,
                };
                chartData.push(newDataPoint);
            }  
        }
        lastDataPoint = data[caseType][date];
    }
    return chartData;
}
function Graph({caseType}) {
    const [data, setData] = useState({})
    
    useEffect(() => {
        
        const fetchData = async () => {
          await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              let chartData = formatData(data, caseType);
              setData(chartData);
              
            });
        };
        fetchData();
      }, [caseType]);

    return (
        <div>
            {data?.length > 0 && (
                <Line
                data={{
                    datasets: [
                        {
                            backgroundColor: "red",
                            boderColor: "black",
                            data: data
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
