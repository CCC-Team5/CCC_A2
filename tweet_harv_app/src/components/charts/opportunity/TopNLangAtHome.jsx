import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../Chart.css'
import ChartDataService from '../../../services/ChartDataService';

function TopNLangAtHome() {
    const[data, setData] = useState([]);
    const languageHome = []
    // '80'at the end means 50% transparency
    // Refer: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
    const colorMap = {
        Spanish:"#FFA50080",
        Japanese:"#FFC0CB80",
        Indonesian:"#00FF0080",
        Arabic:"#33943380",
        Tagalog:"#470e8a80",
        Chinese:"#FF000080",
        French:"#6fa8dc80",
        Portuguese:"#38761d80",
        Thai:"#66000080",
        Turkish:"#f4433680",
        Others: "#36f4e480",
        Italian: "#8fce0080",
        Vietnamese:"#FFFF0080",
        Greek:"#00408080"
    }

    React.useEffect(()=>{
        ChartDataService.getLanguageHome().then((res)=>{
          setData(res.data)
        })
      },[])


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
            data: languageHome
        }]
    }

  return (
    <div className='content-container2'>
        <div className='pie-container'>
            <div className='spoken-title'><p class='pie-t1'>Top Non-English Languages Spoken at Home</p></div>
            <HighchartsReact containerProps={{ style: { width: "90%" , height: "90%"} }} highcharts={Highcharts} options={optionLangAtHome} />
        </div>
    </div>
  )
}

export default TopNLangAtHome
