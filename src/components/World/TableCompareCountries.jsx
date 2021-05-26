import React,{useEffect, useState} from 'react';
import './TableCompareCountries.css';

function TableCompareCountries({firstCountry, secondCountry}) {


    const [country1, setCountry1] = useState({});
    const [country2, setCountry2] = useState({});
    const [vaccineFistCountry, setVaccineFistCountry] = useState(0);
    const[vaccineSecondCountry, setVaccineSecondCountry] = useState(0);

    useEffect(() => {

        

        /**
         * We create a async function with a promise, it is waiting for a response from the external API.
         */

         const getVaccineFirstCountry = async () => {
            await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries/"+firstCountry+"?lastdays=1&fullData=false")
            .then((response) => response.json())
            .then((data) =>{  
                if(data.timeline){
                    const   vaccinated = data.timeline[Object.keys(data.timeline)[0]]
                    setVaccineFistCountry(vaccinated);

                }else{
                    setVaccineSecondCountry(0);
                }
                 
            })
          };



        const getFirstCountryData = async () => {
          await fetch("https://disease.sh/v3/covid-19/countries/"+firstCountry+"?strict=true")
            .then((response) => response.json())
            .then((data) => {
               const country = {
                country: data.country,
                population: data.population,
                countryInfo: data.countryInfo,
                casesPerOneMillion: data.casesPerOneMillion,
                deathsPerOneMillion: data.deathsPerOneMillion,
                vaccinated: vaccineFistCountry
                
               }
            setCountry1(country);
            });
        };


        const getVaccineSecondCountryData = async () => {
            await fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries/"+secondCountry+"?lastdays=1&fullData=false")
            .then((response) => response.json())
            .then((data) =>{  
                if(data.timeline){
                 const   vaccinated = data?.timeline[Object.keys(data.timeline)[0]]
                    setVaccineSecondCountry(vaccinated);}else{
                        setVaccineSecondCountry(0);
                    }
            })
          };


        const getSecondCountryData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries/"+secondCountry+"?strict=true")
              .then((response) => response.json())
              .then((data) => {  
                const country = {
                    country: data.country,
                    population: data.population,
                    countryInfo: data.countryInfo,
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
        <div className="countries__table">
            
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
                                        <td>{country1['population']}</td>
                                        <td>{country2['population']}</td>
                                    </tr>
                                    <tr>
                                        <td>Vaccinated</td>
                                        {country1['vaccinated'] >= 0 &&(
                                        <td>{country1['vaccinated']}</td>)}
                                        {country2['vaccinated'] >= 0 &&(
                                        <td>{country2['vaccinated']}</td>)}
                                        
                                    </tr>
                                    <tr>
                                        <td>Cases per one million</td>
                                        <td>{country1['casesPerOneMillion']}</td>
                                        <td>{country2['casesPerOneMillion']}</td>
                                    </tr>
                                    <tr>
                                        <td>Deaths per one million</td>
                                        <td>{country1['deathsPerOneMillion']}</td>
                                        <td>{country2['deathsPerOneMillion']}</td>
                                    </tr>
                                   


                                </tbody>
                            </table>
        </div>
    )
}

export default TableCompareCountries
