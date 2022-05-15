import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../Chart.css'
import ChartDataService from '../../../services/ChartDataService';

function TopBirthCountry() {
    const[data, setData] = useState([]);
    const birthCountry = []
    // '80'at the end means 50% transparency
    // Refer: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
    const colorMap = {
        Spanish:"#FFA50080",
        Japan:"#FFC0CB80",
        Indonesian:"#00FF0080",
        Arabic:"#07376380",
        Philippines:"#470e8a80",
        China:"#FF000080",
        French:"#6fa8dc80",
        Portuguese:"#38761d80",
        Thai:"#66000080",
        Turkish:"#f44336v",
        Others: "#36f4e480",
        Italy: "#8fce0080",
        Pakistan:"#274e1380",
        Germany: "#99000080",
        India: "#de7b4280",
        Vietnam:"#FFFF0080",
        Greece:"#00408080"
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