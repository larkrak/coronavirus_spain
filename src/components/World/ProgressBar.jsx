import React, { useState, useEffect } from 'react'
import './ProgressBar.css'
import {showColor} from '../../utilities/util'
/**
 * 
 * This component generates a progress bar that is based on the type of cases of the selected country and the population of that country.
 * @param {*} country[]
 * @param {String} type
 * @returns 
 */
function ProgressBar({data,type="cases"}) {
    const [color, setColor] = useState("")
    const [done, setDone] = useState(0)
    const [roundedDone, setRoundedDone] = useState(0)
    const[style, setStyle] = useState({});
    useEffect(() =>{
        const color1 = showColor(type);
        setColor(color1);
        setDone((data[type] / data.population) * 100);
        setRoundedDone(done.toFixed(2));
        const newStyle = {
            opacity:1,
            width: `${done}%`,
            background: `${color}`
        }
        setStyle(newStyle);
    }   
    ,[type,data,done,color]);
    

    return (
        <div className="progress">
			<div className="progress__done" style={style}>
            <p>{roundedDone}%</p>
			</div>
            
		</div>
    )
}

export default ProgressBar
