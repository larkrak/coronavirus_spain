import React, {useEffect, useState} from 'react'
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";


function Circules({data, casesType=""}) {


  const [color, setColor] = useState("");
    
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 100,
    },
    recovered: {
      hex: "#7dd71d",
      
      multiplier: 100,
    },
    deaths: {
      hex: "#993333",
      multiplier: 800,

    },
    vaccine: {
      hex: "blue",
      multiplier: 100,
    }
  };

  function colorFunction (cases){

    
   let color = cases === "cases"? "red": "green";
    
    return color;
  }

  
   const countries1 = () => data.map((country) => (
 
     
     (country[casesType] > 0 && 
      
      
      <Circle
      center= {[country.countryInfo.lat? country.countryInfo.lat:0, country.countryInfo.long? country.countryInfo.long: 0]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={ 
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
          <div className="info-deaths">
            Vaccinated: {numeral(country.vaccine).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>)
    
    
   ))

      

      useEffect(()=>{

        const casesTypeColors = {
            cases: {
              hex: "#CC1034",
              multiplier: 100,
            },
            recovered: {
              hex: "#7dd71d",
              
              multiplier: 100,
            },
            deaths: {
              hex: "#993333",
              multiplier: 800,
            },
            vaccine: {
              hex: "blue",
              multiplier: 100,
            }
            
          };

          setColor(casesTypeColors[casesType].hex)
          

        
      },[color,data,casesType]);
   

       

     
       
     

     

    return (
        <div>
            {countries1()}
        </div>
    )
}

export default Circules
