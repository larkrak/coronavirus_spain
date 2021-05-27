import React,{useEffect, useState} from 'react';
import './TableCompareCountries.css';
/***
 * This component generates table that displays a more detailed information of a country or countries, 
 * it makes API calls to get the vaccination progress of the country and also the most current general information of that country.
 * @author Darryl Estrada
 * @date May/27/2021
 * @param {String} FirstCountry
 * @param {String} SecondCountry
 */
function TableCompareCountries({firstCountry, secondCountry}) {


    //Hooks
    const [country1, setCountry1] = useState({});
    const [country2, setCountry2] = useState({});
    const [vaccineFistCountry, setVaccineFistCountry] = useState();
    const[vaccineSecondCountry, setVaccineSecondCountry] = useState();

    useEffect(() => {

        

        /**
         * We create a async function with a promise, We get the vaccination historical of the first country.
         */

         const getVaccineFirstCountry = async () => {
            await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries/"+firstCountry+"?lastdays=1&fullData=false")
            .then((response) => response.json())
            .then((data) =>{  
                if(data.timeline){
                    const   vaccinated = data.timeline[Object.keys(data.timeline)[0]]
                    setVaccineFistCountry(vaccinated);

                }else{
                    setVaccineSecondCountry("");
                }
                 
            })
          };

          /**
           * @author Darryl Estrada
           * @async this function  gets a country information and set it to hooks. 
           * 
           */

        const getFirstCountryData = async () => {
          await fetch("https://disease.sh/v3/covid-19/countries/"+firstCountry+"?strict=true")
            .then((response) => response.json())
            .then((data) => {
                //create a country variable
               const country = {
                country: data.country,
                    cases: data.cases,
                    todayCases: data.todayCases,
                    deaths: data.deaths,
                    todayDeaths: data.todayDeaths,
                    recovered: data.recovered,
                    todayRecovered: data.todayRecovered,
                    population: data.population,
                    countryInfo: data.countryInfo,
                    tests: data.tests,
                    casesPerOneMillion: data.casesPerOneMillion,
                    deathsPerOneMillion: data.deathsPerOneMillion,
                vaccinated: vaccineFistCountry
                
               }
            setCountry1(country);
            });
        };


        /**
         * We create a async function with a promise, We get the vaccination historical of the second country.
         */

        const getVaccineSecondCountryData = async () => {
            await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries/"+secondCountry+"?lastdays=1&fullData=false")
            .then((response) => response.json())
            .then((data) =>{  
                if(data.timeline){
                 const   vaccinated = data?.timeline[Object.keys(data.timeline)[0]]
                    setVaccineSecondCountry(vaccinated);}else{
                        setVaccineSecondCountry("");
                    }
            })
          };


        const getSecondCountryData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries/"+secondCountry+"?strict=true")
              .then((response) => response.json())
              .then((data) => {  
                const country = {
                    country: data.country,
                    cases: data.cases,
                    todayCases: data.todayCases,
                    deaths: data.deaths,
                    todayDeaths: data.todayDeaths,
                    recovered: data.recovered,
                    todayRecovered: data.todayRecovered,
                    population: data.population,
                    countryInfo: data.countryInfo,
                    tests: data.tests,
                    casesPerOneMillion: data.casesPerOneMillion,
                    deathsPerOneMillion: data.deathsPerOneMillion,
                    vaccinated: vaccineSecondCountry
                    
                   }
                setCountry2(country);          
              });
          };

          
          
          getFirstCountryData();
          getVaccineFirstCountry();  
          getSecondCountryData();
          getVaccineSecondCountryData();

      }, [firstCountry,secondCountry, vaccineFistCountry, vaccineSecondCountry]);



        


    return (
        <div className="countries__table2">
            
             <table>
                                <thead>
                                    <tr>
                                        <th>Information</th>
                                        { country1.countryInfo && (
                                        <th><img className="country__img" src={country1.countryInfo.flag} alt="" /> {firstCountry}</th>)}
                                        { country2.countryInfo && (
                                        <th><img className="country__img" src={country2.countryInfo.flag} alt="" /> {secondCountry}</th>)}
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Population</td>
                                        { country1.countryInfo && (
                                        <td>{country1['population']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['population']}</td>)}
                                    </tr>
                                    <tr>
                                        <td>Cases</td>
                                        { country1.countryInfo && (
                                        <td>{country1['cases']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['cases']}</td>)}
                                    </tr>
                                    <tr>
                                        <td>Vaccinated</td>
                                        {country1['vaccinated'] > 0 &&(
                                        <td>{country1['vaccinated']}</td>)}
                                        {country2['vaccinated'] > 0 &&(
                                        <td>{country2['vaccinated']}</td>)}
                                        
                                    </tr>
                                    <tr>
                                        <td>Deaths</td>
                                        { country1.countryInfo && (
                                        <td>{country1['deaths']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['deaths']}</td>)}
                                    </tr>
                                    <tr>
                                        <td>Recovered</td>
                                        { country1.countryInfo && (
                                        <td>{country1['recovered']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['recovered']}</td>)}
                                    </tr>


                                    <tr>
                                        <td>Today cases</td>
                                        { country1.countryInfo && (
                                        <td>{country1['todayCases']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['todayCases']}</td>)}
                                    </tr>

                                    <tr>
                                        <td>Today deaths</td>
                                        { country1.countryInfo && (
                                        <td>{country1['todayDeaths']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['todayDeaths']}</td>)}
                                    </tr>
                                    
                                    <tr>
                                        <td>Today recovered</td>
                                        { country1.countryInfo && (
                                        <td>{country1['todayRecovered']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['todayRecovered']}</td>)}
                                    </tr>
                                    
                                
                                    <tr>
                                        <td>Test</td>
                                        { country1.countryInfo && (
                                        <td>{country1['tests']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['tests']}</td>)}
                                    </tr>
                                    

                                   
                                    <tr>
                                        <td>Cases per one million</td>
                                        { country1.countryInfo && (
                                        <td>{country1['casesPerOneMillion']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['casesPerOneMillion']}</td>)}
                                    </tr>
                                    <tr>
                                        <td>Deaths per one million</td>
                                        { country1.countryInfo && (
                                        <td>{country1['deathsPerOneMillion']}</td>)}
                                        { country2.countryInfo && (
                                        <td>{country2['deathsPerOneMillion']}</td>)}
                                    </tr>
                                   


                                </tbody>
                            </table>
        </div>
    )
}

export default TableCompareCountries
