import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import wordCloud from "highcharts/modules/wordcloud.js";
import ChartDataService from '../../services/ChartDataService';
import './Chart.css'

function HousingContentChart({year}) {
  const[data, setData] = useState([]);
  var line = ''
  const totalWords = []

  console.log(year)

    React.useEffect(()=>{
      ChartDataService.getHousingContent().then((res)=>{
        setData(res.data)
      })
    },[])

    if(data){
      Object.keys(data).map((key, index) => {
        totalWords.push(data[key])
      })
    }

    console.log(totalWords)

    if(line){

    }else{
      if(year === "2014"){
        line += totalWords[0]
      }
  
      if(year === "2015"){
        line += totalWords[1]
      }
  
      if(year === "2016"){
        line += totalWords[2]
      }
  
      if(year === "2017"){
        line += totalWords[3]
      }
  
      if(year === "2018"){
        line += totalWords[4]
      }
  
      if(year === "2019"){
        line += totalWords[5]
      }
  
      if(year === "2020"){
        line += totalWords[6]
      }
      if(year === "2021"){
        line += totalWords[7]
      }
      if(year === "2022"){
        line += totalWords[8]
      }
    }
    

    console.log(line)
    
    const yearData = line.split(/[,\. ]+/g).reduce((arr, word) => {
      let obj = Highcharts.find(arr, obj => obj.name === word);
      if (obj) {
          obj.weight += 1;
      } else {
          obj = {
              name: word,
              weight: 1
          };
          arr.push(obj);
      }
      return arr;
    },[])


    console.log(yearData)


    const options = {
      series: [{
          type: 'wordcloud',
          data: yearData,
          name: 'Occurrences',
          turboThreshold:10000
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

export default HousingContentChart