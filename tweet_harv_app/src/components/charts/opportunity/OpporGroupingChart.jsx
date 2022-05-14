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
                enabled: false,
                alpha: 15,
                beta: 15,
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
                style: {
                    fontSize: '16px'
                }
            }
        },
    
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Percentages',
                skew3d: true,
            },
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
            <HighchartsReact containerProps={{ style: { width: "100%" } }} highcharts={Highcharts} options={options} />
        </div>
      </div>
  )
}

export default OpporGroupingChart