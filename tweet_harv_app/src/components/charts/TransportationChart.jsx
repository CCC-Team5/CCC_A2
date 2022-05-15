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
            zoomType: 'xy',
            backgroundColor: 'transparent',
            
        },
        plotOptions: {
            column: {
                borderWidth: 0,
            }
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },

        xAxis: [{
            categories: data.year,
            crosshair: true,
            labels:{
                style: {
                    fontSize: '16px',
                    fontFamily: 'Nunito Sans',
                    color: "#1B1A17"
                },
            },
            gridLineColor:"transparent"
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Nunito Sans',
                    color: "#F0A500"
                },
            },
            title: {
                text: 'Percentages of Total Number of Tweets',
                style: {
                    fontSize: '18px',
                    fontFamily: 'Nunito Sans',
                    color: "#F0A500"
                },
            },
            gridLineColor:"transparent"
        }, { // Secondary yAxis
            title: {
                text: 'Sentiment',
                style: {
                    fontSize: '18px',
                    fontFamily: 'Nunito Sans',
                    color: "#1B1A17"
                },
            },
            labels: {
                format: '{value}',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Nunito Sans',
                    color: "#1B1A17"
                },
            },
            gridLineColor:"transparent",
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
        },
        series: [{
            name: 'Total Tweets',
            type: 'column',
            yAxis: 0,
            data: data.percent,
            color: "#F0A500",
            tooltip: {
                valueSuffix: '%'
            },
        }, {
            name: 'Sentiment',
            type: 'spline',
            yAxis: 1,
            data: data.sentiment,
            color: "#1B1A17",
            tooltip: {
                valueSuffix: ''
            }
        }]
    }


  return (
    <div className='content-container2'>
        <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" , height: "100%"} }} highcharts={Highcharts} options={options} />
        </div>
    </div>
  )
}

export default TransportationChart