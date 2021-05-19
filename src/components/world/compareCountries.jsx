import React, { useState, useEffect } from 'react'
import {
    FormControl,
    Select,
    MenuItem,
    CardContent,
    Card,
} from "@material-ui/core";


/**
 * EveryTime a coutry changes from the select input it will change the information of the 
 * banners, meaning that if user selects SPAIN, Spain information will be displayed inside the covid 
 * cards. 
 * 
 * @param {*} event 
 */




function CompareCountries() {
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState([]);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");
   
    


    useEffect(() => {
        /**
         * We create a async function with a promise, it is waiting for a response from the external API.
         */
        const getCountriesData = async () => {
          await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
              const countries = data.map((country) => ({
                name: country.country,
                value: country.countryInfo.iso3,
              }));
              /**
               * We sort the recieved data by using the sortData function we created.
               */
              setCountries(countries);
              setMapCountries(data);
            });
        };
        getCountriesData();
      }, []);




    function onCountryChange(event) {
        const countryCode = event.target.value;
    
        const url =
            countryCode === "world"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
    
                setCountry(countryCode);
                const lat = countryCode === "world" ? 0 : data.countryInfo.lat;
                const long = countryCode === "world" ? 0 : data.countryInfo.long;
               
            });
    };


    return (
        <div>
            {countries?.length > 0 && (
                <FormControl className="app__dropdown">
                    <Select
                        variant="outlined"
                        onChange={onCountryChange}
                        value={country}
                    >
                        <MenuItem value="world">World</MenuItem>
                        {countries.map((country) => (
                            <MenuItem value={country.value}  key={country.name} >{country.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>)}
        </div>
    )
}

export default CompareCountries
