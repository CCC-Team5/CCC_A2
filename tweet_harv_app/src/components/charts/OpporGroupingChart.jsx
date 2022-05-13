import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Chart.css'
import ChartDataService from '../../services/ChartDataService';


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
            englishPct.push(element.percent)
            restPct.push(element.rest)
        });

        data.birth_country.forEach(element => {
            englishPct.push(element.percent)
            restPct.push(element.rest)
        });

        data.language_at_home.forEach(element => {
            englishPct.push(element.percent)
            restPct.push(element.rest)
        });
      }
      

    const options = {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                viewDistance: 25,
                depth: 40
            }
        },
    
        title: {
            text: 'Percentage comparison between English and Others'
        },
    
        xAxis: {
            categories: ['Tweet lang', 'birth country', 'lang speak at home'],
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
                text: 'Percentage',
                skew3d: true
            }
        },
    
        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },
    
        series: [{
            name: 'English',
            data: englishPct,
        }, {
            name: 'Others',
            data: restPct,
        }]
    }
  return (
    <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" } }} highcharts={Highcharts} options={options} />
    </div>
  )
}

export default OpporGroupingChart