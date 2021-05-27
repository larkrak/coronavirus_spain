/**
 * This is the MAIN component of the World section, this controls all the Status,WorldMap and CompareCountries components.
 * @author Darryl Estrada
 * @Version 1.0.0
 * @Date May/27/2021
 * 
 */

import React, { useState, useEffect } from "react";
//Import components
import Status from "./Status";
import WorldMap from "./WorldMap";
import "./World.css";
import ProgressBar from './ProgressBar';
import CompareCountries from './compareCountries';
//Import Material UI components
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
  FormControl,
  Select,
  MenuItem, 
} from "@material-ui/core";




function World() {
  /*List of hooks */

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("world");
  const [countryInfo, setCountryInfo] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
 

  /*The useEffect function will run everytime the state of an object changes, but if there is no given object it 
    will only run once, at the load data phase.
  */

  useEffect(() => {
    /**
     * We create a async function with a promise, it is waiting for a response from disease.sh, this information 
     * is today's world covid data. 
     */
    const getWorldData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };
    getWorldData();

  }, []);

  useEffect(() => {
    /**
     * Download a list of countries that disease.sh work with.
     * @async
     * @function getCountriesData
     * @return  {} the collected data is transformed into a countries. 
     */
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));
          
          //Setting the countries into this information used to create a select input.
          setCountries(countries);
          setMapCountries(data);
          
        });
    };
    getCountriesData();
  }, [casesType]);


  /**
   * EveryTime a coutry changes from the select input it will change the information of the 
   * banners, meaning that if user selects SPAIN, Spain information will be displayed inside the covid 
   * cards. 
   * 
   * @param {*} event 
   */
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
        setMapCenter([lat, long]);
        setMapZoom(4);
      });
  };



  return (
  

    <Grid container>
    <Grid item xs={12} sm={12} md={12} lg={12} >
      <Grid item xs={12} sm={12} md={12} lg={12} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", margin:"15px"}}>
        <a href="/~dawbi2104/">
          <Button
            variant="contained"
            color="default"
            startIcon={<ArrowBackIcon />}
          />
        </a>
        <FormControl>
              <Select style={{backgroundColor:"white"}}
                variant="outlined"
                onChange={onCountryChange}
                value={country}
              >
                <MenuItem value="world">World</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value} key={country.value} >{country.name}</MenuItem>
                ))}
              </Select>
          </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} style={{ display:"flex", justifyContent:"space-between", margin:"15px"}}>
        <Status
          onClick={(e) => setCasesType("cases")}
          active={casesType === "cases"}
          isRed
          title="Cases"
          cases={countryInfo.todayCases}
          total={countryInfo.cases}
        ></Status>
        <Status
          onClick={(e) => setCasesType("recovered")}
          active={casesType === "recovered"}
          title="Recovered"
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered}
        ></Status>
        <Status
          onClick={(e) => setCasesType("deaths")}
          active={casesType === "deaths"}
          title="Deaths"
          isRed
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths}
        ></Status>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} style={{margin:"15px"}}>
          
        <ProgressBar data = {countryInfo} type={casesType} ></ProgressBar>

      </Grid>
      
      <Grid item xs={12} sm={12} md={12} lg={12} style={{margin:"15px"}}>
        <WorldMap 
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        ></WorldMap>
      </Grid>
    </Grid>

    <Grid item xs={12} sm={12} md={12} lg={12} style={{padding:"15px"}}>
      <CompareCountries data={countries}></CompareCountries>
    </Grid>

</Grid>

  );
}

export default World;
