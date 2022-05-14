import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../Chart.css'
import ChartDataService from '../../../services/ChartDataService';


function TopNLangChart() {
    const[data, setData] = useState([]);
    const languageCount = []
    // '99'at the end means 60% transparency
    // Refer: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
    const colorMap = {
        Spanish:"#FFA50099",
        Japanese:"#FFC0CB99",
        Indonesian:"#aaf0d199",
        Arabic:"#d9b38c99",
        Tagalog:"#470e8a99",
        Chinese:"#ff999999",
        French:"#6fa8dc99",
        Portuguese:"#38761d99",
        Thai:"#ebe5ae99",
        Turkish:"#f4433699",
        Others: "#d6d4d499",
        Italian: "#eef2c399",
        Vietnamese:"#c6e1f199",
        Hindi:"#ffb3e699", 
        Greek:"#8fa2ff99"

    }

    React.useEffect(()=>{
        ChartDataService.getLanguageCount().then((res)=>{
          setData(res.data)
        })
      },[])

    if(data){
        data.map((element) => {
            let obj = {
                name: element.language_name,
                y: element.count,
                color: colorMap[element.language_name]
            };
            languageCount.push(obj)
        });
    }

    const optionLang = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: 'transparent',
        },
        title: {
            text: ''
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
                    format: '<b>{point.name}</b>',
                    style: {
                        fontSize: '16px',
                        fontFamily: 'Nunito Sans',
                        color: "#1B1A17"
                    },
                }
            }
        },
        series: [{
            name: 'Count',
            colorByPoint: true,
            allowPointSelect: true,
            showInLegend: true,
            data: languageCount
        }]
    }
  return (
    <div className='content-container2'>
        <div className='pie-container'>
            <div className='tweet-title'><p class='pie-t1'>Most Tweeted Non-English Languages</p></div>
            <HighchartsReact containerProps={{ style: { width: "90%" , height: "90%"} }} highcharts={Highcharts} options={optionLang} />
        </div>
    </div>
  )
}

export default TopNLangChart