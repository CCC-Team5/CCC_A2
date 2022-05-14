import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../Chart.css'
import ChartDataService from '../../../services/ChartDataService';
import highcharts3d from "highcharts/highcharts-3d";
highcharts3d(Highcharts);



function OpporGroupingChart() {
    const[data, setData] = useState();
    const restPct = []
    const englishPct = []

    React.useEffect(()=>{
        ChartDataService.getOpportunityPercent().then((res)=>{
          setData(res.data)
        })
      },[])

      if(data){
        data.language_count.forEach(element => {
            restPct.push(element.percent)
            englishPct.push(element.rest)
        });

        data.birth_country.forEach(element => {
            restPct.push(element.percent)
            englishPct.push(element.rest)
        });

        data.language_at_home.forEach(element => {
            restPct.push(element.percent)
            englishPct.push(element.rest)
        });
      }
      

    const options = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            options3d: {
                enabled: true,
                alpha: 25,
                beta: 5,
                viewDistance: 25,
                depth: 40
            }
        },
    
        title: {
            text: ''
        },
    
        xAxis: {
            lineWidth : '0',
            categories: ['', '', ''],
            labels: {
                skew3d: true,
            },
            gridLineColor:"transparent"
        },
    
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Percentages',
                skew3d: true,
                style: {
                    fontSize: '16px',
                    fontFamily: 'Nunito Sans',
                    color: "#1B1A17"
                },
            },
            gridLineColor:"transparent"
        },
    
        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },
    
        series: [
            {
            name: 'Others',
            data: restPct,
            color: "#F0A500"
        }, {
            name: 'English',
            data: englishPct,
            color: "#1B1A17"
        }]
    }
  return (
      <div className='content-container2'>
        <div className='oppor-container'>
            <div className='oppor-title1'><p class='o1'>Most Tweeted Languages</p></div>
            <div className='oppor-title2'><p class='o1'>Country of Birth</p></div>
            <div className='oppor-title3'><p class='o1'>Languages Spoken at Home</p></div>
            <div className='oppor-chart'><HighchartsReact containerProps={{ style: { width: "100%" } }} highcharts={Highcharts} options={options} /></div>
        </div>
      </div>
  )
}

export default OpporGroupingChart