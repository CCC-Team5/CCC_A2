import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import wordCloud from "highcharts/modules/wordcloud.js";
import './Chart.css'

function HousingWordCloud() {
    wordCloud(Highcharts);
    const[data, setData] = useState([]);
    const data1 = [{
        name: "Lorem",
        weight: 1
      }, {
        name: "ipsum",
        weight: 1
      }]; 
    const options = {
        series: [{
            type: 'wordcloud',
            data: data1,
            name: 'Occurrences'
        }],
        title: {
            text: 'Popular Housing words'
        },
    }

  return (
    <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" , height: "100%"} }} highcharts={Highcharts} options={options} />
    </div>
  )
}

export default HousingWordCloud