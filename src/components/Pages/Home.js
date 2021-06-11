import React, { useState, useEffect } from 'react';
import BarChart from "../Charts/BarChart";
import "./Home.css"
import DonutChart from "../Charts/DonutChart";
import {axiosHelperCall} from "../../helpers/axios.helper";

let barChart = {

    labels: [],
    datasets:[
        {
            label:"Number of answers by day",
            data:[],
            backgroundColor:'rgba(75, 192, 192, 0.6)'
        }
    ]
}


let donutChart = {
    labels: [],
    datasets: [
        {
            label: "Average session time",
            data: [],
            backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(169, 77, 135, 0.6)",
                "rgba(97, 178, 89, 0.7)",
                "rgba(91, 169, 133, 0.8)",
                "rgba(244, 143, 216, 0.7)",
                "rgba(210, 28, 102, 0.3)"],
        },
    ],
};

function roundFloatString(str, numOfDecimal=2) {
    return Number(str).toFixed(numOfDecimal)
}

function setAvgTimesChart(avgTimes) {
    let newDonutChart = {
        labels: [],
        datasets: [
            {
                label: "Average session time",
                data: [],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(169, 77, 135, 0.6)",
                    "rgba(97, 178, 89, 0.7)",
                    "rgba(91, 169, 133, 0.8)",
                    "rgba(244, 143, 216, 0.7)",
                    "rgba(210, 28, 102, 0.3)"],
            },
        ],
    }
    console.log(avgTimes)
    avgTimes.forEach((obj) => {
        console.log(obj)
        newDonutChart.labels.push(`${obj.ResponseCount} questions`)

        newDonutChart.datasets[0].data.push(roundFloatString(obj.AverageTime))
    })
    return newDonutChart
}

export let barchartMaxValue = 10

function setNumOfAnswersChart(numOfAnswers) {
    let newBarChart = {
        labels: [],
        datasets:[
            {
                label:"Number of answers by day",
                data:[],
                backgroundColor:'rgba(75, 192, 192, 0.6)'
            }
        ]
    }
    numOfAnswers.forEach((obj) => {
        newBarChart.labels.push(obj.date)
        newBarChart.datasets[0].data.push(obj.responseCount)
        const responseCount = parseInt(obj.responseCount)
        if (responseCount > barchartMaxValue) {
            barchartMaxValue = responseCount
        }
    })

    console.log(barchartMaxValue)
    if (barchartMaxValue === 0 || barchartMaxValue % 10 !== 0) {
        barchartMaxValue = barchartMaxValue + (10 - barchartMaxValue % 10)
    }


    return newBarChart
}

const deviceEndpoint = "https://si-projekat2.herokuapp.com/api/device/"

function Home() {
    let [numOfActive, setNumOfActive] = useState("-")
    let [numOfInactive, setNumOfInactive] = useState("-")
    let [chartAnswersByDay, setChartAnswersByDay] = useState(barChart)
    let [chartAvgSessionTimes, setChartAvgSessionTimes] = useState(donutChart)
    let [noAvgTimesData, setNoAvgTimesData] = useState(true)

    useEffect(() => {
        axiosHelperCall("GET", deviceEndpoint + "response/count")
            .then((res) => {
                let data = res.data
                console.log(data)
                let chartData = setNumOfAnswersChart(data)
                console.log(chartData)
                setChartAnswersByDay(chartData)
            })
        axiosHelperCall("GET", deviceEndpoint + "active/all")
            .then((res) => {
                let data = res.data
                let active = data.Active
                let inactive = data.Inactive
                setNumOfActive(active)
                setNumOfInactive(inactive)
            })
            .catch((err) => {
                setNumOfActive("-")
                setNumOfInactive("-")
                console.log(err)
            })
        axiosHelperCall("GET", deviceEndpoint + "response/average")
            .then((res) => {
                let data = res.data
                console.log(data)
                let chartData = setAvgTimesChart(data)
                console.log(chartData)
                setChartAvgSessionTimes(chartData)
                console.log(chartData.labels)
                if (chartData.labels.length === 0) {
                    setNoAvgTimesData(true)
                }
                else {
                    setNoAvgTimesData(false)
                }
            })

    }, [])


    return(
        <div className='home'>
            <div style={{width: "60%", marginTop: "24px"}}>
                <div className="upperHalf">
                    <div className="activityDiv">
                        <div className="parHolder" style={{backgroundColor : "#69F0AE"}}>
                            <p className="activityPar">Active devices</p>
                            <p className="activityPar" style={{fontSize : "32px"}}>{numOfActive}</p>
                        </div>
                    </div>
                    <div className="activityDiv">
                        <div className="parHolder" style={{backgroundColor: "#FF1744"}}>
                            <p className="activityPar">Inactive devices</p>
                            <p className="activityPar" style={{fontSize : "32px"}}>{numOfInactive}</p>
                        </div>
                    </div>
                </div>
                <div className="barChart">
                    <BarChart chartData={chartAnswersByDay}/>
                </div>
            </div>
            <div style={{width: "40%", marginTop: "24px"}}>
                {
                    noAvgTimesData && <h3 style={{textAlign: "center"}}>No data available</h3>
                }
                {
                    !noAvgTimesData && <DonutChart chartData={chartAvgSessionTimes}/>
                }
            </div>
        </div>
    )
}

export default Home;
