import React, {useEffect, useState} from 'react'
import './CountryTable.css'
import { sortData } from '../../utilities/util';

function CountryTable({countries  , type="cases", stopped = "false"}) {

    const [country, setCountry] = useState("");

    useEffect(() => {
        /**
         * We create a async function with a promise, it is waiting for a response from the external API.
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

   
    let countryList =   countries?.length > 0 ?sortData(countries,type): sortData(country,type);
        
    

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