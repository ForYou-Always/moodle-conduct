import React, { Component } from 'react';
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';


 export default class BizChartView extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
    render(){

    const data = [
      { month: 'Jan.', count: 69, city: 'tokyo' }
      ];

    const scale = {
        month: {alias: 'Month',},
        count: {alias: 'Sales',},
    };
    
    return (
         <Chart height={400} data={data} scale={scale} forceFit>
         <Axis title name="month" />
         <Axis title name="count" />
         <Legend />
         <Tooltip crosshairs={{ type: 'rect' }} />
         <Geom type="interval" position="month*count" color="month" />
         </Chart>
    )
  }
}

