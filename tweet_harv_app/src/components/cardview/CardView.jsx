import React from 'react'
import './CardView.css'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function CardView({options}) {
  return (
    <div className='card-container'>
        <div className='chart-container'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    </div>
  )
}

export default CardView;