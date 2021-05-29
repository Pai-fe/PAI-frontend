import React, { useState, useEffect } from 'react';
import BarChart from "../Charts/BarChart";
import "./Home.css"
import DonutChart from "../Charts/DonutChart";

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

let vremena = [{ broj_pitanja : 2, prosjecno_vrijeme : 50 },
    { broj_pitanja : 3, prosjecno_vrijeme : 62 },
    { broj_pitanja : 4, prosjecno_vrijeme : 70 },
    { broj_pitanja : 5, prosjecno_vrijeme : 70 },
    { broj_pitanja : 6, prosjecno_vrijeme : 70 },
    { broj_pitanja : 7, prosjecno_vrijeme : 70 },
    { broj_pitanja : 8, prosjecno_vrijeme : 70 }
]

let odgovoriPoDanu = [{datum: "21.3.2021", brojOdgovora: 1},
    {datum: "22.3.2021", brojOdgovora: 2},
    {datum: "23.3.2021", brojOdgovora: 3},
    {datum: "24.3.2021", brojOdgovora: 4},
    {datum: "25.3.2021", brojOdgovora: 3},
    {datum: "26.3.2021", brojOdgovora: 2},
    {datum: "27.3.2021", brojOdgovora: 1}]

function setAvgTimesChart(avgTimes) {
    console.log(avgTimes)
    avgTimes.forEach((obj) => {
        donutChart.labels.push(`${obj.broj_pitanja} questions`)
        donutChart.datasets[0].data.push(obj.prosjecno_vrijeme)
    })
}

export let barchartMaxValue = 10

function setNumOfAnswersChart(numOfAnswers) {
    numOfAnswers.forEach((obj) => {
        barChart.labels.push(obj.datum)
        barChart.datasets[0].data.push(obj.brojOdgovora)
        if (obj.brojOdgovora > barchartMaxValue) {
            barchartMaxValue = obj.brojOdgovora
        }
    })
    if (barchartMaxValue === 0 || barchartMaxValue % 10 !== 0)
        barchartMaxValue = barchartMaxValue + (10 - barchartMaxValue % 10)
}

function Home() {
    let [numOfActive, setNumOfActive] = useState(0)
    let [numOfInactive, setNumOfInactive] = useState(0)
    let [numOfAnswersByDay, setNumOfAnswersByDay] = useState([])
    let [avgSessionTimes, setAvgSessionTimes] = useState([])

    useEffect(() => {
        setAvgTimesChart(vremena)
        setNumOfAnswersChart(odgovoriPoDanu)
        setNumOfActive(5)
        setNumOfInactive(4)
        /*
            Dohvaćanje podataka
         */

    }, [])

    /*
    * dummy kod
    * */
    return(
        <div className='home'>
            <div style={{width: "60%", float: "left", marginTop: "24px"}}>
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
                    <BarChart chartData={barChart}/>
                </div>
            </div>
            <div style={{width: "40%", float: "left", marginTop: "24px"}}>
                <DonutChart chartData={donutChart}/>
            </div>
        </div>
    )
}

export default Home;
