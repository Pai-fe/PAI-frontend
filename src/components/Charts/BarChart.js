import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';
import {barchartMaxValue} from "../Pages/Home";


class BarChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
          }
    }
    render(){
        return (
          <div className="chart">
            <Bar
                data={this.state.chartData}
    
                height={200}
                width={100}
                    
                options={{
                    maintainAspectRatio: false,
                    title:{
                        display: 'Number of answers by day',
                        text: 'Number of answers by day',
                        fontSize: 25
                    },
                    scales: {
                        yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                    steps: 20,
                                    stepValue: 5,
                                    max: barchartMaxValue
                                }
                            }]  
                    }         
                }}
            />
          </div>
        )
      }

}

export default BarChart