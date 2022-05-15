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
    const [priceData, setPriceData] = useState([]);

    const prices = []

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

        ChartDataService.getHousingPrice().then((res) => {
            setPriceData(res.data)
        })
    }, [])

    if(priceData){
        priceData.map((element) =>{
            prices.push(element.price)
        })
    }

    console.log(prices)


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
                text: 'Percentage of Total Number of Tweets',
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
        },
        { // Tertiary yAxis
            gridLineWidth: 0,
            gridLineColor:"transparent",
            title: {
                text: 'Housing Price (Percentage Change)',
                style: {
                    fontSize: '18px',
                    fontFamily: 'Nunito Sans',
                    color: "#E45826"
                },
            },
            labels: {
                format: '{value}',
                style: {
                    fontSize: '16px',
                    fontFamily: 'Nunito Sans',
                    color: "#E45826"
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
            data: data.sentiment, // a list
            color: "#1B1A17",
            tooltip: {
                valueSuffix: ''
            }
        },{
            name: 'Housing Price',
            type: 'spline',
            dashStyle: 'shortdot',
            yAxis: 2,
            data: prices, // a list
            color: "#E45826",
            tooltip: {
                valueSuffix: '%'
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