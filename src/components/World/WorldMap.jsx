import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./WorldMap.css";
import 'leaflet/dist/leaflet.css'
import { showColor, showDataOnMap } from "../../utilities/util";
import moment from 'moment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import CountryTable from "./CountryTable";
import {
  CardContent,
  Card,
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Circules from './Circules';


function WorldMap({ countries, casesType, center, zoom }) {

  const [date, setDate] = useState(moment("1/29/20", "MM/DD/YY"));
  const [formattedDate, setFormattedDate] = useState("1/29/20");
  const [isActive, setIsActive] = useState(false);
  const [global, setGlobal] = useState(countries);
  const [globalVaccine, setGlobalVaccine] = useState(countries);
  const [countriesData, setCountriesData] = useState(countries);
  const [stopped, setStopped] = useState(false);
  const [color, setColor] = useState(casesType);
  const [vaccine, setVaccine] = useState(countries)






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
          countryInfo: getCountryInfo(country.country),
        }));

        const countriesVaccine = globalVaccine.map((country) => ({
          country: country.country,
          vaccine: parseInt(`${country.timeline[formattedDate]? country.timeline[formattedDate]:0}`),
          countryInfo: getCountryInfo(country.country),
        }));
        
        setCountriesData(countries2);
        setVaccine(countriesVaccine);
      }, 200)
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
    return () => clearInterval(intervalId);
  }, [isActive, formattedDate, date, global, countries, casesType,globalVaccine])


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

    const getCountriesVaccine = async() => {
      await fetch ("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=all&fullData=false")
      .then((response) => response.json())
      .then((data)=>{
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
    setStopped(true);
    setIsActive(false);
    setFormattedDate("1/29/20")
    setDate(moment("1/29/20", "MM/DD/YY"))
    setCountriesData(countries)
  }

  return (
    
    <div className="map">
      <Grid container style={{ color: "white", display: "flex", flexDirection: "row", textAlign: "center" }}>
        
        <Grid item xs={12} sm={12} md={12} lg={8} style={{ padding: "15px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{ padding: "15px", display: "flex", alignItems: "center", fontSize: "22px", color: "black" }}>
            <Grid item xs={12} sm={12} md={12} lg={10}>
              <span><strong>Date: {formattedDate}</strong></span>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2} style={{ display: "flex", justifyContent: "space-between" }}>
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
          </Grid>

          <MapContainer center={center} zoom={zoom} timeDimension={true}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          <div>
          
          <Circules data={countriesData} casesType ={color}></Circules>
          <Circules data={vaccine} casesType ="vaccine"></Circules>
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
