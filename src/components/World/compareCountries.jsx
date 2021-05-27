import React, { useState } from 'react'
import {
    FormControl,
    Select,
    MenuItem,
    CardContent,
    Card
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Graph from './Graph';
import TableCompareCountries from './TableCompareCountries';



/**
 * This component is in charge of the comparison of two contries, it controls the TableCompareCountries and Graph components.
 * @author Darryl
 * @date May/27/2021
 * @param {country[]}  
 */

function CompareCountries(data) {
    //Declaration and initialization of hooks variables.
    const [country, setCountry] = useState("");
    const [country2, setCountry2] = useState("");
    const [case2, setCase] = useState("cases");
    //List of type of cases to be shown in the select input.
    const typeOfCasesList = [
        {name:"recovered"},{name:"cases"},{ name:"deaths"}
    ]
        
    /**
     * This function changes the state of the country hook.
     * @author Darryl
     * @date 27/May/2021
     * @param {*} event 
     */
    function onCountryChange(event) {
        const countryCode = event.target.value;
        setCountry(countryCode);
    };

    /**
     * This function changes the state of the country2 hook.
     * @author Darryl
     * @date 27/May/2021
     * @param {*} event 
     */
    function onCountryChange2(event) {
        const countryCode = event.target.value;
        setCountry2(countryCode);
    };

    /**
     * This function changes the state of the case2 hook.
     * @author Darryl
     * @date 27/May/2021
     * @param {*} event 
     */
    function onChangeCase(event) {
        const cases = event.target.value;
        setCase(cases);
    };


  


    




    return (
        <div>
            <Card container>
                <CardContent>
                    <Grid container >
                        <Grid item xs={12} sm={12} md={12} lg={4} >

                            <TableCompareCountries
                                firstCountry={country}
                                secondCountry={country2}

                            ></TableCompareCountries>

                        </Grid>
                        {/**
                         * There is a time when we dont have any data because we have not recieved the data from the APi, We 
                         * made a conditional to render this data, only when we have already recieved the data form the API.
                         */}
                        {data?.data.length > 0 && (
                            <Grid item xs={12} sm={12} md={12} lg={8} >
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex' }}>
                                    <Grid item xs={12} sm={12} md={4} lg={4} >
                                        <FormControl >
                                            <h3>Select  country </h3>
                                            <Select style={{ margin: "15px" }}
                                                variant="outlined"
                                                onChange={onCountryChange}
                                                value={country}
                                            >
                                                <MenuItem value="">None</MenuItem>
                                                {data.data.map((country) => (
                                                    <MenuItem value={country.name} key={country.name} >{country.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>

                                        <FormControl >
                                            <h3>Select country </h3>
                                            <Select style={{ margin: "15px" }}
                                                variant="outlined"
                                                onChange={onCountryChange2}
                                                value={country2}
                                            >
                                                <MenuItem value="">None</MenuItem>
                                                {data.data.map((country) => (
                                                    <MenuItem value={country.name} key={country.name} >{country.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>
                                        <FormControl >
                                            <h3>Select a type </h3>
                                            <Select style={{ margin: "15px" }}
                                                variant="outlined"
                                                onChange={onChangeCase}
                                                value={case2}
                                            >
                                                {typeOfCasesList.map((country) => (
                                                    <MenuItem value={country.name} key={country.name} >{country.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Graph country1={country} country2={country2} caseType={case2}  ></Graph>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>

        </div>
    )
}

export default CompareCountries
