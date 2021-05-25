import React, { useState, useRef} from 'react'
import {
    FormControl,
    Select,
    MenuItem,
    CardContent,
    Card,
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Graph from './Graph';


/**
 * EveryTime a coutry changes from the select input it will change the information of the 
 * banners, meaning that if user selects SPAIN, Spain information will be displayed inside the covid 
 * cards. 
 * 
 * @param {*} event 
 */




function CompareCountries(data) {
    const [country, setCountry] = useState("");
    const [country2, setCountry2] = useState("");
  


    function onCountryChange(event) {
        const countryCode = event.target.value;
        setCountry(countryCode);
      };

     
    function onCountryChange2(event) {
        const countryCode = event.target.value;
        setCountry2(countryCode);
      };



    return (
        <div>
            <Card container>
                <CardContent>
                        {data?.data.length > 0 && (
                            <FormControl className="app__dropdown">
                                <Grid container>
                                <Grid item xs={6}>
                                    <Select
                                        variant="outlined"
                                          onChange={onCountryChange}
                                        value={country}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        {data.data.map((country) => (
                                            <MenuItem value={country.value} key={country.name} >{country.name}</MenuItem>
                                        ))}
                                    </Select>

                                </Grid>

                                <Grid item xs={6}>
                                    <Select
                                        variant="outlined"
                                         onChange={onCountryChange2}
                                        value={country2}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        {data.data.map((country) => (
                                            <MenuItem value={country.value} key={country.name} >{country.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                </Grid>
                            </FormControl>)}
                    
                        <Graph country1 = {country} country2 = {country2}></Graph>
                </CardContent>
            </Card>

        </div>
    )
}

export default CompareCountries
