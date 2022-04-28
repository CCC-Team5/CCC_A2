import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import wordCloud from "highcharts/modules/wordcloud.js";
import './Chart.css'

function TrendingWordCloud() {
    wordCloud(Highcharts);
    const[data, setData] = useState([]);

    const options = {
        series: [{
            type: 'wordcloud',
            data,
            name: 'Occurrences'
        }],
        title: {
            text: 'Popular hashtags tweeted'
        },
    }


    
  return (
    <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" , height: "100%"} }} highcharts={Highcharts} options={options} />
    </div>
  )
}

export default TrendingWordCloud