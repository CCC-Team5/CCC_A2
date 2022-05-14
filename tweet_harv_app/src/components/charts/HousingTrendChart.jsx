import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Chart.css'
import ChartDataService from '../../services/ChartDataService';
import highcharts3d from "highcharts/highcharts-3d";
highcharts3d(Highcharts);

function HousingTrendChart() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('false');

    React.useEffect(() => {
        setLoading(true);

        ChartDataService.getHousingTrendSenti().then((res) => {
            setData(res.data)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
            setError('Could not fetch housing trend!')
            console.log('error getting housing trend: ', e)
        })
    }, [])


    const options = {
        chart: {
            zoomType: 'xy',
            backgroundColor: 'transparent',
            options3d: {
                enabled: false,
                alpha: 25,
                beta: 5,
                viewDistance: 25,
                depth: 40
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
                    fontSize: '14px',
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
                    fontSize: '12px',
                    fontFamily: 'Nunito Sans',
                    color: "#F0A500"
                },
            },
            title: {
                text: 'Percentage of Total Number of Tweets',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Nunito Sans',
                    color: "#F0A500"
                },
            },
            gridLineColor:"transparent"
        }, { // Secondary yAxis
            title: {
                text: 'Sentiment',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Nunito Sans',
                    color: "#1B1A17"
                },
            },
            labels: {
                format: '{value}',
                style: {
                    fontSize: '12px',
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
            name: 'Percentages of Total Tweets',
            type: 'column',
            yAxis: 0,
            data: data.percent,
            color: "#F0A500",
            tooltip: {
                valueSuffix: ''
            },
        }, {
            name: 'Sentiment',
            type: 'spline',
            yAxis: 1,
            data: data.sentiment, // a list
            color: "#1B1A17",
            tooltip: {
                valueSuffix: ''
            }
        }]
    }

    return (
        <div className='content-container2'>
        <div className='chart-container'>
            {loading && <p>Loading...</p>}
            {error.length > 0 && <p>{error}</p>}
            {<HighchartsReact containerProps={{ style: { width: "100%", height: "100%" } }} highcharts={Highcharts} options={options} />}
        </div>
        </div>
        
    )
}

export default HousingTrendChart