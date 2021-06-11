import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class DonutChart extends Component {
    render() {
        return (
            <div className="chart">
                <Doughnut
                    data={
                        this.props.chartData}

                    height={400}
                    width={400}

                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: "Average session time (in seconds)",
                            text: "Average session time (in seconds)",
                            fontSize: 25
                        },
                    }}
                />
            </div>
        )
    }
}

export default DonutChart
