import React, { useState, useEffect } from 'react'
import Highcharts, { registerRendererType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import wordCloud from "highcharts/modules/wordcloud.js";
import ChartDataService from '../../services/ChartDataService';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../charts/Chart.css'
import HousingContentChart from '../charts/HousingContentChart';

function HousingWordCloud(){
    wordCloud(Highcharts);
    const[selected, setSelected] = useState();
    const totalWords = []

    const onRadioChange = (e) => {
      setSelected(e.target.value)
    }
    
  return (
  
    <div className='view-container'>
      <div className='radio-container'>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
      <RadioGroup row onChange={onRadioChange} value={selected ? selected : " "}>
        <FormControlLabel value="2014" control={<Radio />} label="2014" />
        <FormControlLabel value="2015" control={<Radio />} label="2015" />
        <FormControlLabel value="2016" control={<Radio />} label="2016" />
        <FormControlLabel value="2017" control={<Radio />} label="2017" />
        <FormControlLabel value="2018" control={<Radio />} label="2018" />
        <FormControlLabel value="2019" control={<Radio />} label="2019" />
        <FormControlLabel value="2020" control={<Radio />} label="2020" />
        <FormControlLabel value="2021" control={<Radio />} label="2021" />
        <FormControlLabel value="2022" control={<Radio />} label="2022" />
      </RadioGroup>
    </FormControl>
      </div>

    {selected && <HousingContentChart year={selected} />}

      
      
    </div>
  )
}

export default HousingWordCloud