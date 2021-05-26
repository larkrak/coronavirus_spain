import React, { useState, useEffect } from 'react'
import './ProgressBar.css'
import {showColor} from '../../utilities/util'

function ProgressBar({data,type="cases"}) {

   // let done =  (data[type] / data.population) * 100;
    //let roundedDone = done.toFixed(2);



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
