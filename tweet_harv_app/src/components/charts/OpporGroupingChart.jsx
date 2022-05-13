import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Chart.css'
import ChartDataService from '../../services/ChartDataService';


function OpporGroupingChart() {
    const[data, setData] = useState();

    React.useEffect(()=>{
        ChartDataService.getOpportunityPercent().then((res)=>{
          setData(res.data)
        })
      },[])
      

    const options = {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        },
    
        title: {
            text: 'Total fruit consumption, grouped by gender'
        },
    
        xAxis: {
            categories: ['Apples', 'Oranges', 'Pears'],
            labels: {
                skew3d: true,
                style: {
                    fontSize: '16px'
                }
            }
        },
    
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Number of fruits',
                skew3d: true
            }
        },
    
        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },
    
        series: [{
            name: 'Other_percent',
            data: [5, 3, 4],
        }, {
            name: 'english',
            data: [3, 4, 4],
        }]
    }
  return (
    <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" } }} highcharts={Highcharts} options={options} />
    </div>
  )
}

export default OpporGroupingChart