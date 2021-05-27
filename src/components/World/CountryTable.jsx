import React, {useEffect, useState} from 'react'
import './CountryTable.css'
import { sortData } from '../../utilities/util';
/**
 * This component returns a table that is generated with the data recived by WorldMap component, 
 * when the WorldMap component is stopped it makes an async request to the disease.sh API the get the current data.
 * @param {country[],String,Boolean} countries type stopped. 
 * @returns 
 */
function CountryTable({countries  , type="cases", stopped = "false"}) {

    const [country, setCountry] = useState("");

    useEffect(() => {
        /**
         * This function will load the all the countries data and display it on the table, even when the parent component has not sent any country data.
         * 
         */
        const getCountriesData = async () => {
          await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                setCountry(data)
            });
        };
        getCountriesData();
      }, []);

   
    //If we haven't received any data from the parent, then it will use the information received from the API. 
    let countryList =   countries?.length > 0 ?sortData(countries,type): sortData(country,type);
        
    
    //If the player from the parent component is stopped the it will display the current data from all the countries.
    if(stopped){
        countryList =  sortData(country,type);
    }
    
    return (
        <div className="countries__table">
            <table>
            <thead>
            <tr>    
            <th>Flag</th>
            <th>Country</th>
            <th>Cases</th>
            </tr>  
            </thead>
            <tbody>
                {
                    countryList?.map((country) => (
                        <tr>
                            <td><img className="country__img" src={country.countryInfo.flag} alt="" /></td>
                            <td>{country.country}</td>
                            <td>{country[type]}</td>
                        </tr>

                    ))}
            </tbody>
            </table>
        </div>
    )
}

export default CountryTable;