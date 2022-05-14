import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../Chart.css'
import ChartDataService from '../../../services/ChartDataService';

function TopBirthCountry() {
    const[data, setData] = useState([]);
    const birthCountry = []
    // '99'at the end means 60% transparency
    // Refer: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
    const colorMap = {
        Spanish:"#FFA50099",
        Japan:"#FFC0CB99",
        Indonesian:"#aaf0d199",
        Arabic:"#d9b38c99",
        Philippines:"#ffdd9999",
        China:"#ff999999",
        French:"#6fa8dc99",
        Portuguese:"#38761d99",
        Thai:"#66000099",
        Turkish:"#f4433699",
        Others: "#d6d4d499",
        Italy: "#eef2c399",
        Pakistan:"#dfbf9f99",
        Germany: "#9fdfbf99",
        India: "#ffb3e699",
        Vietnam:"#c6e1f199"
    }

    React.useEffect(()=>{
        ChartDataService.getBirthCountry().then((res)=>{
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
            birthCountry.push(obj)
        });
      } 

      const optionsBirth = {
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
            data: birthCountry
        }]
    }

  return (
    <div className='content-container2'>
    <div className='pie-container'>
        <div className='birth-title'><p class='pie-t1'>Top Non-English Speaking Birth Countries</p></div>
        <HighchartsReact containerProps={{ style: { width: "90%" , height: "90%"} }} highcharts={Highcharts} options={optionsBirth} />
    </div>
    </div>
  )
}

export default TopBirthCountry