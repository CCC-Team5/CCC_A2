import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import wordCloud from "highcharts/modules/wordcloud.js";
import './Chart.css'
import ChartDataService from '../../services/ChartDataService';

function TrendingWordCloud() {
    wordCloud(Highcharts);
    const[data, setData] = useState();

    React.useEffect(()=>{
      ChartDataService.getTrendingHashtags().then((res)=>{
        setData(res.data)
      })
    },[])

    const options = {
      chart:{
        backgroundColor: 'transparent',
      },
        plotOptions: {
          
        },
        series: [{
            type: 'wordcloud',
            data: data,
            name: 'Occurrences'
        }],
        title: {
            text: ''
        },
    }


    
  return (
    <div className='content-container2'>
      <div className='trend-container'>
        <div className='trend-title'><p class='t1'>Most Popular Hashtags</p></div>
        <HighchartsReact containerProps={{ style: { width: "100%" , height: "100%"} }} highcharts={Highcharts} options={options} />
      </div>
    </div>
  )
}

export default TrendingWordCloud