import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './Chart.css'
import ChartDataService from '../../services/ChartDataService';


function TopNChart() {
    const[data, setData] = useState();
    const birthCountry = []
    const languageHome = []
    const languageCount = []
    React.useEffect(()=>{
        ChartDataService.getOpportunitydata().then((res)=>{
          setData(res.data)
        })
      },[])

      console.log(data)

      if(data){
        data.birth_country.forEach(element => {
            let obj = {
                name: element.country,
                y: element.count[0]
            };
            birthCountry.push(obj)
        });

        data.language_at_home.forEach(element => {
            let obj = {
                name: element.country,
                y: element.count[0]
            };
            languageHome.push(obj)
        });

        data.language_count.forEach(element => {
            let obj = {
                name: element.language_name,
                y: element.count
            };
            languageCount.push(obj)
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
            name: 'Brands',
            colorByPoint: true,
            allowPointSelect: true,
            showInLegend: true,
            data: languageHome
        }]
    }

    const optionLang = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Most tweeted languages other than English'
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
            data: languageCount
        }]
    }
  return (
    <>
    <div className='chart-container'>
        <HighchartsReact containerProps={{ style: { width: "100%" } }} highcharts={Highcharts} options={optionsBirth} />
        <HighchartsReact containerProps={{ style: { width: "100%" } }} highcharts={Highcharts} options={optionLangAtHome} />
        <HighchartsReact containerProps={{ style: { width: "100%" } }} highcharts={Highcharts} options={optionLang} />
    </div> </>
  )
}

export default TopNChart