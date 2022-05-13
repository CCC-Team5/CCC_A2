import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Chart.css'
import ChartDataService from '../../services/ChartDataService';

function TopBirthCountry() {
    const[data, setData] = useState([]);
    const birthCountry = []

    const colorMap = {
        Spanish:"#FFA500",
        Japan:"#FFC0CB",
        Indonesian:"#00FF00",
        Arabic:"#073763",
        Philippines:"#470e8a",
        China:"#FF0000",
        French:"#6fa8dc",
        Portuguese:"#38761d",
        Thai:"#660000",
        Turkish:"#f44336",
        Others: "#36f4e4",
        Italy: "#8fce00",
        Pakistan:"#274e13",
        Germany: "#990000",
        India: "#de7b42"
    }

    React.useEffect(()=>{
        ChartDataService.getOpportunitydata().then((res)=>{
          setData(res.data)
        })
      },[])


      if(data.birth_country){
        data.birth_country.map((element) => {
            console.log(element.country)
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
            type: 'pie'
        },
        title: {
            text: 'Top birth countries other than English speaking countries'
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
            data: birthCountry
        }]
    }

  return (
    <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" , height: "100%"} }} highcharts={Highcharts} options={optionsBirth} />
    </div>
  )
}

export default TopBirthCountry