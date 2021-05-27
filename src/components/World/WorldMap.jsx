import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./WorldMap.css";
import 'leaflet/dist/leaflet.css'
import moment from 'moment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import CountryTable from "./CountryTable";
import {
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Circles from './Circles';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

/**
 * 
 * This is probably the most interesting component of all, here I control what is sent to the CountryTable and Circles Components, 
 * It is based on a setInterval function to simulate a player, since React-Leaflet does not have that feature developed yet, 
 * I had to make my own player, every 200ms the circles on the map will change and new circles will be display the map,
 * the same information is sent to the CountryTable component so it changes the value of the table. 
 * Making the illusion that it is a video but it is not.
 * @param {*} countries
 * @param {*} casesType
 * @param {*} center
 * @param {*} zoom 
 * @returns 
 */


function WorldMap({ countries, casesType, center, zoom }) {

  const [date, setDate] = useState(moment("1/29/20", "MM/DD/YY"));
  const [formattedDate, setFormattedDate] = useState("1/29/20");
  const [isActive, setIsActive] = useState(false);
  const [global, setGlobal] = useState(countries);
  const [globalVaccine, setGlobalVaccine] = useState(countries);
  const [countriesData, setCountriesData] = useState(countries);
  const [stopped, setStopped] = useState(false);
  const [color, setColor] = useState(casesType);
  const [casesActive, setCasesActive] = useState(true);
  const [vaccineActive, setVaccineActive] = useState(true);





  useEffect(() => {
    setColor(casesType);
    const todayDate = moment();
    let intervalId;


    /**
     * compare todays Date with the current date of the time, if the timer is 2 days close to the todays, date then the time will stop. 
     */
    if (todayDate <= date.add(1, "days")) {
      setIsActive(false);
    }
    if (isActive) {
      setStopped(false);
      intervalId = setInterval(() => {
        setDate(date.add(1, "days"))
        setFormattedDate((date.get('month') + 1) + "/" + date.get('date') + "/" + date.get('year').toString().substr(-2, 2))
        const countries2 = global.map((country) => ({
          country: country.country,
          cases: country.timeline.cases[formattedDate],
          deaths: country.timeline.deaths[formattedDate],
          recovered: country.timeline.recovered[formattedDate],
          vaccinated: getVaccinated(country.country, formattedDate),
          countryInfo: getCountryInfo(country.country),
        }));
        setCountriesData(countries2);

      }, 200)
    }
    /**
     * Get the number of vaccinated in a given date.
     * @param {*} country 
     * @param {String} formatted 
     * @returns 
     */
    function getVaccinated(country, formatted) {
      let found;
      for (var i = 0; i < globalVaccine.length; i++) {
        if (globalVaccine[i].country === country) {
          found = globalVaccine[i].timeline[formatted] ? globalVaccine[i].timeline[formatted] : 0;
        }
      }
      return found;
    }

    /**
     * Get country info(flag, lat, long)
     * @param {String} country 
     * @returns 
     */

    function getCountryInfo(country) {
      let found = {}
      for (var i = 0; i < countries.length; i++) {
        if (countries[i].country === country) {
          found = countries[i].countryInfo
        }
      }
      return found;
    }
    return () => clearInterval(intervalId);
  }, [isActive, formattedDate, date, global, countries, casesType, globalVaccine])


  useEffect(() => {
    /**
     * We create a async function with a promise, it is waiting for a response from the external API.
     */
    const getCountriesData = async () => {
      let listOfCountries = "https://disease.sh/v3/covid-19/historical/Afghanistan,Albania,Algeria,Andorra,Angola,Anguilla,Antigua and Barbuda,Argentina,Armenia,Aruba,Australia,Austria,Azerbaijan,Bahamas,Bahrain,Bangladesh,Barbados,Belarus,Belgium,Belize,Benin,Bermuda,Bhutan,Bolivia,Bosnia,Botswana,Brazil,British Virgin Islands,Brunei,Bulgaria,Burkina Faso,Burundi,Cabo Verde,Cambodia,Cameroon,Canada,Caribbean Netherlands,Cayman Islands,Central African Republic,Chad,Channel Islands,Chile,China,Colombia,Comoros,Congo,Costa Rica,Croatia,Cuba,Curaçao,Cyprus,Czechia,Côte d'Ivoire,DRC,Denmark,Diamond Princess,Djibouti,Dominica,Dominican Republic,Ecuador,Egypt,El Salvador,Equatorial Guinea,Eritrea,Estonia,Ethiopia,Falkland Islands (Malvinas),Faroe Islands,Fiji,Finland,France,French Guiana,French Polynesia,Gabon,Gambia,Georgia,Germany,Ghana,Gibraltar,Greece,Greenland,Grenada,Guadeloupe,Guatemala,Guinea,Guinea-Bissau,Guyana,Haiti,Holy See (Vatican City State),Honduras,Hong Kong,Hungary,Iceland,India,Indonesia,Iran,Iraq,Ireland,Isle of Man,Israel,Italy,Jamaica,Japan,Jordan,Kazakhstan,Kenya,Kuwait,Kyrgyzstan,Lao People's Democratic Republic,Latvia,Lebanon,Lesotho,Liberia,Libyan Arab Jamahiriya,Liechtenstein,Lithuania,Luxembourg,MS Zaandam,Macao,Macedonia,Madagascar,Malawi,Malaysia,Maldives,Mali,Malta,Marshall Islands,Martinique,Mauritania,Mauritius,Mayotte,Mexico,Micronesia,Moldova,Monaco,Mongolia,Montenegro,Montserrat,Morocco,Mozambique,Myanmar,Namibia,Nepal,Netherlands,New Caledonia,New Zealand,Nicaragua,Niger,Nigeria,Norway,Oman,Pakistan,Palestine,Panama,Papua New Guinea,Paraguay,Peru,Philippines,Poland,Portugal,Qatar,Romania,Russia,Rwanda,Réunion,S. Korea,Saint Helena,Saint Kitts and Nevis,Saint Lucia,Saint Martin,Saint Pierre Miquelon,Saint Vincent and the Grenadines,Samoa,San Marino,Sao Tome and Principe,Saudi Arabia,Senegal,Serbia,Seychelles,Sierra Leone,Singapore,Sint Maarten,Slovakia,Slovenia,Solomon Islands,Somalia,South Africa,South Sudan,Spain,Sri Lanka,St. Barth,Sudan,Suriname,Swaziland,Sweden,Switzerland,Syrian Arab Republic,Taiwan,Tajikistan,Tanzania,Thailand,Timor-Leste,Togo,Trinidad and Tobago,Tunisia,Turkey,Turks and Caicos Islands,UAE,UK,USA,Uganda,Ukraine,Uruguay,Uzbekistan,Vanuatu,Venezuela,Vietnam,Wallis and Futuna,Western Sahara,Yemen,Zambia,Zimbabwe?lastdays=all"


      await fetch(listOfCountries)
        .then((response) => response.json())
        .then((data) => {
          var filtered = data.filter(function (el) {
            return el != null;
          });
          setGlobal(filtered)
        });
    };

    const getCountriesVaccine = async () => {
      await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=all&fullData=false")
        .then((response) => response.json())
        .then((data) => {
          //Filter nulls 
          var filtered = data.filter(function (el) {
            return el != null;
          });
          setGlobalVaccine(filtered);
        })
    };
    getCountriesData();
    getCountriesVaccine();
  }, [countries]);

  function stopTimer() {

    function getVaccinated(country, formatted) {
      let found;
      for (var i = 0; i < globalVaccine.length; i++) {
        if (globalVaccine[i].country === country) {
          found = globalVaccine[i].timeline[formatted] ? globalVaccine[i].timeline[formatted] : 0;
        }
      }
      return found;
    }
    function getCountryInfo(country) {
      let found = {}
      for (var i = 0; i < countries.length; i++) {
        if (countries[i].country === country) {
          found = countries[i].countryInfo
        }
      }
      return found;
    }

    setStopped(true);
    setIsActive(false);
    setFormattedDate("1/29/20")
    setDate(moment("1/29/20", "MM/DD/YY"))
    const countries2 = global.map((country) => ({
      country: country.country,
      cases: country.timeline.cases[formattedDate],
      deaths: country.timeline.deaths[formattedDate],
      recovered: country.timeline.recovered[formattedDate],
      vaccinated: getVaccinated(country.country, formattedDate),
      countryInfo: getCountryInfo(country.country),
    }));
    setCountriesData(countries2);

  }


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
    vaccinated: {
      hex: "blue",
      multiplier: 100,
    }
  };

  return (

    <div className="map">
      <Grid container style={{ color: "white", display: "flex", flexDirection: "row", textAlign: "center" }}>
        <Grid item xs={12} sm={12} md={12} lg={8} style={{ padding: "15px" }}>
          <Grid container style={{ padding: "15px", fontSize: "22px", color: "black" }}>
            <Grid item xs={6} sm={6} md={6} lg={2} >
              <Button
                variant="contained"
                color="default"
                onClick={() => setIsActive(!isActive)}
              >{isActive ? <PauseIcon></PauseIcon> : <PlayArrowIcon></PlayArrowIcon>}</Button>
              <Button
                variant="contained"
                color="default"
                onClick={stopTimer}
              >{<StopIcon></StopIcon>}</Button>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} >
              <p><strong>Date: {formattedDate}</strong></p>
              </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4} >
              <div style={{textAlign: 'end'}}>
              <Button
                  onClick={() => setCasesActive(!casesActive)}
                >
                  <Grid container direction = "row" alignItems="center">
                    <Grid item>
                   <div class='box' style={{ backgroundColor: casesTypeColors[casesType].hex, marginTop: "8px", marginRight:"5px" }}></div>
                    </Grid>
                    <Grid item>
                    {casesType}
                    </Grid>
                    <Grid item>
                    {casesActive ? <CheckIcon></CheckIcon> : <ClearIcon></ClearIcon>}
                    </Grid>
                  </Grid>
                </Button>
                <Button
                  onClick={() => setVaccineActive(!vaccineActive)}
                >
                   <Grid container direction = "row" alignItems="center">
                    <Grid item>
                    <div class='box' style={{ backgroundColor: "blue",marginTop: "8px",marginRight:"5px"}}></div>
                    </Grid>
                   </Grid>
                  <Grid>
                  Vaccination
                  </Grid>
                    <Grid>
                    {vaccineActive ? <CheckIcon></CheckIcon> : <ClearIcon></ClearIcon>}
                    </Grid>    
                </Button>
              </div>     
            </Grid>
          </Grid>

          <MapContainer center={center} zoom={zoom} timeDimension={true}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <div>
              {casesActive && (<Circles data={countriesData} casesType={color}></Circles>)}
              {vaccineActive && (<Circles data={countriesData} casesType="vaccinated"></Circles>)}
            </div>
          </MapContainer>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={4} style={{ color: "black", padding: "15px" }}>
          <CountryTable
            countries={countriesData} type={color} stopped={stopped}>
          </CountryTable>
        </Grid>
      </Grid>
    </div>
  );
}

export default WorldMap;
