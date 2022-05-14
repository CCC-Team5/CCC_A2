import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './chart.css'
import ChartDataService from '../../services/ChartDataService';

function CostLivingChart() {
    const[data, setData] = useState([]);
    
    React.useEffect(()=>{
        ChartDataService.getCostTrendSenti().then((res)=>{
          setData(res.data)
        })
      },[])

      console.log(data)

    const options = {
        chart: {
            zoomType: 'xy'
            
        },
        title: {
            text: 'Cost-of-living related tweet trend & sentiment'
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: data.year,
            crosshair: true,
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: 'Percentage of Total Number of Tweets',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
        }, 
        { // Secondary yAxis
            title: {
                text: 'Sentiment',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: 
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Percentage of Total Tweets',
            type: 'column',
            yAxis: 0,
            data: data.percent,
            tooltip: {
                valueSuffix: ''
            },
        }, {
            name: 'Sentiment',
            type: 'spline',
            yAxis: 1,
            data: data.sentiment,
            tooltip: {
                valueSuffix: ''
            }
        }]
    }

  return (
    <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" , height: "100%"} }} highcharts={Highcharts} options={options} />
    </div>
  )
}

export default CostLivingChart