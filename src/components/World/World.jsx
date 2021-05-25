import {
  FormControl,
  Select,
  MenuItem,
  CardContent,
  Card,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Status from "./Status";
import WorldMap from "./WorldMap";
import "./World.css";
import CountryTable from "./CountryTable";
import { sortData } from '../../utilities/util';
import Graph from './Graph';
import ProgressBar from './ProgressBar';
import CompareCountries from './compareCountries';

function World() {
  /*We can use hooks to loop through all the countries*/

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("world");
  const [countryInfo, setCountryInfo] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [tableData, setTableData] = useState([]);

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
          const sortedData = sortData(data, casesType);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
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
    <div>


      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>World Covid Tracker</h1>
            {/*Ben convention to name the class of the form*/}
            <FormControl className="app__dropdown">
              <Select
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
          </div>
          <div className="app__stats">
            <Status
              onClick={(e) => setCasesType("cases")}
              active={casesType === "cases"}
              isRed
              title="Corona Virus Cases"
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
          </div>
          <div>
            <ProgressBar data={countryInfo} type={casesType} ></ProgressBar>
          </div>
          <div className="app__worldMap">
            <WorldMap
              countries={mapCountries}
              casesType={casesType}
              center={mapCenter}
              zoom={mapZoom}
            ></WorldMap>
          </div>
          <div>
          <CompareCountries data={countries}></CompareCountries>
        </div>
        </div>
        {/* <Card  container>
        <CardContent>
          <h3>Live Cases</h3>
          <h3>WorldWide new cases</h3>
          <CountryTable countries={tableData} type={casesType} ></CountryTable>
          <h3>Soy una grafica</h3>
          <Graph caseType={casesType} ></Graph>
        </CardContent>
      </Card> */}
       
      </div>

    </div>
  );
}

export default World;
