import React, {Component} from 'react';
import { Bar } from 'react-chartjs-2';
import {barchartMaxValue} from "../Pages/Home";


class BarChart extends Component{
    render(){
        return (
          <div className="chart">
            <Bar
                data={this.props.chartData}
    
                height={300}
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
                                    max: 100
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