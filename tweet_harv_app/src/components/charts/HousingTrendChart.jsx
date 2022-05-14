import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './chart.css'
import ChartDataService from '../../services/ChartDataService';

function HousingTrendChart() {
const[data, setData] = useState([]);
const [error, setError] = useState('');
const [loading, setLoading] = useState('false');

React.useEffect(()=>{
setLoading(true);

ChartDataService.getHousingTrendSenti().then((res)=>{
setData(res.data)
setLoading(false)
}).catch((e) => {
setLoading(false)
setError('Could not fetch housing trend!')
console.log('error getting housing trend: ', e)
})
},[])


const perc_tweets_data = {2014: 0.07792023801090883, 2015: 0.07767656286253266, 2016: 0.06480881399870382, 2017: 0.33951909213524956, 2018: 0.08345503859795535, 2019: 0.11810248671347025, 2020: 0.13969211857067024, 2021: 0.19428029558359255, 2022: 0.18703553675198287};
const sentiment_data = {2014: 0.19313898143741073, 2015: 0.07747157991060426, 2016: 0.22619047619047622, 2017: 0.07160565243311717, 2018: 0.10800000000000001, 2019: 0.13429682929682932, 2020: 0.10835478680611424, 2021: 0.10943601545630192, 2022: 0.10005737447910346};
const options = {
chart: {
zoomType: 'xy'

},
title: {
text: 'Housing Tweet Trend'
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
data: data.sentiment, // a list
tooltip: {
valueSuffix: ''
}
}]
}

return (
<div className='chart-container'>
{loading && <p>Loading...</p>}
{error.length > 0 && <p>{error}</p>}
{!loading && <HighchartsReact containerProps={{ style: { width: "100%" , height: "100%"} }} highcharts={Highcharts} options={options} />}
</div>
)
}

export default HousingTrendChart