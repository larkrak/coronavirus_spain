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
import { makeStyles } from '@material-ui/core/styles';
import TableCompareCountries from './TableCompareCountries';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


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
    const [case2, setCase] = useState("cases");

    const typeOfCasesList = [
        {name:"recovered"},{name:"cases"},{ name:"deaths"}
    ]
        

    function onCountryChange(event) {
        const countryCode = event.target.value;
        setCountry(countryCode);
    };


    function onCountryChange2(event) {
        const countryCode = event.target.value;
        setCountry2(countryCode);
    };

    function onChangeCase(event) {
        const cases = event.target.value;
        setCase(cases);
    };

    const useStyles = makeStyles((theme) => ({
        button: {
            marginBottom: 15,
        },
        formControl: {
            margin: theme.spacing(1),
            width: "100%"
        }
    }));


    const classes = useStyles();




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
                        {data?.data.length > 0 && (
                            <Grid item xs={12} sm={12} md={12} lg={8} >

                                <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex' }}>
                                    <Grid item xs={12} sm={12} md={4} lg={4} >

                                        <FormControl className={classes.formControl}>

                                            <h3>Select  country </h3>
                                            <Select style={{ margin: "15px" }}
                                                variant="outlined"
                                                onChange={onCountryChange}
                                                value={country}
                                            >
                                                <MenuItem value=""></MenuItem>
                                                {data.data.map((country) => (
                                                    <MenuItem value={country.name} key={country.name} >{country.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>


                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4}>

                                        <FormControl className={classes.formControl}>
                                            <h3>Select country </h3>
                                            <Select style={{ margin: "15px" }}
                                                variant="outlined"
                                                onChange={onCountryChange2}
                                                value={country2}
                                            >
                                                <MenuItem value=""></MenuItem>
                                                {data.data.map((country) => (
                                                    <MenuItem value={country.name} key={country.name} >{country.name}</MenuItem>
                                                ))}
                                            </Select>

                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={4} lg={4}>

                                        <FormControl className={classes.formControl}>
                                            <h3>Select a type </h3>
                                            <Select style={{ margin: "15px" }}
                                                variant="outlined"
                                                onChange={onChangeCase}
                                                value={case2}
                                            >
                                                <MenuItem value=""></MenuItem>
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
