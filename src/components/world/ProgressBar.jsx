import React, { useState } from 'react'
import './ProgressBar.css'

function ProgressBar({data,type="cases"}) {

    let done =  (data[type] / data.population) * 100;
    let roundedDone = done.toFixed(2);
     

    const[style, setStyle] = useState({});

    setTimeout(()=>{
        const newStyle = {
            opacity:1,
            width: `${done}%`
        }
        setStyle(newStyle);
    },500);
    return (
        <div className="progress">
			<div className="progress__done" style={style}>
            <p>{roundedDone}%</p>
			</div>
            
		</div>
    )
}

export default ProgressBar
