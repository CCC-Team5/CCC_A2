import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../Chart.css'
import ChartDataService from '../../../services/ChartDataService';

function TopNLangAtHome() {
    const[data, setData] = useState([]);
    const languageHome = []

    const colorMap = {
        Spanish:"#FFA500",
        Japanese:"#FFC0CB",
        Indonesian:"#00FF00",
        Arabic:"#073763",
        Tagalog:"#470e8a",
        Chinese:"#FF0000",
        French:"#6fa8dc",
        Portuguese:"#38761d",
        Thai:"#660000",
        Turkish:"#f44336",
        Others: "#36f4e4",
        Italian: "#8fce00",
        Vietnamese:"#FFFF00",
    }

    React.useEffect(()=>{
        ChartDataService.getLanguageHome().then((res)=>{
          setData(res.data)
        })
      },[])

      console.log(data)

      if(data){
        data.map((element) => {
            let obj = {
                name: element.country,
                y: element.count[0],
                color: colorMap[element.country]
            };
            languageHome.push(obj)
        });
      }

    const optionLangAtHome = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Top spoken languages at home'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>'
                }
            }
        },
        series: [{
            name: 'Count',
            colorByPoint: true,
            allowPointSelect: true,
            showInLegend: true,
            data: languageHome
        }]
    }

  return (
    <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" , height: "100%"} }} highcharts={Highcharts} options={optionLangAtHome} />
    </div>
  )
}

export default TopNLangAtHome
