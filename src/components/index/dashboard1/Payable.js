import React, { Component } from 'react';
// import Chart from 'react-google-charts';
import Chart from "react-apexcharts";

class Payable extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          options: {},
          series: [44,56],
          labels: ['A']
        }
      }
    
  render() {
    return (
      <div className="portlet light bordered">
        <div className="portlet-title">
          <div className="caption">
            <i className="icon-bar-chart font-dark hide" />
            <span className="caption-subject font-dark bold uppercase">Payable</span>
          </div>

        </div>
        {/* chart here */}
        <div >
        <Chart
              options={this.state.options}
              series={this.state.series}
              type="donut"
            />
        </div>

      </div>
    );
  }
}

export default Payable;