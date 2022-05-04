import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Chart.css'
import ChartDataService from '../../services/ChartDataService';

function TransportationChart() {
    const[data, setData] = useState([]);

    React.useEffect(()=>{
        ChartDataService.getTransTrendSenti().then((res)=>{
          setData(res.data)
        })
      },[])
    
    const options = {
        chart: {
            zoomType: 'xy'
            
        },
        title: {
            text: 'Trend and Sentiment of Transportation-related Tweets'
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
        }, { // Secondary yAxis
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

    console.log(Highcharts.getOptions().colors)

  return (
    <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" , height: "100%"} }} highcharts={Highcharts} options={options} />
    </div>
  )
}

export default TransportationChart