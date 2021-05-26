import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GavelIcon from '@material-ui/icons/Gavel';


const Restrictions = (props) => {

    

    let restrictionsArray = [ {"A" : ['Between 01:00 a.m. and 6:00 a.m. from May 24.',
                                    'No restrictions on night mobility.',
                                    'There are no restrictions on night mobility. From May 9, non-essential activity is limited from 00:00 to 06:00.'] },
                            {"B" : ['No limitations.', 
                                    'Physical activity may be practiced in outdoor facilities, individually or in groups, up to a maximum of 25 people and without physical contact, respecting the distance of 2 meters, being the use of a mask mandatory, with the sole exception of circumstances that require a high additional intake of oxygen.',
                                    'Gyms at 50%. Groups of maximum 10 people in closed facilities and 20 outdoors for individual physical activity. Mandatory mask and keep distance.'] },
                            {"C" : ['The capacity inside will be 50% and a maximum of 6 people. On the terrace, the capacity is 85% and a maximum of 10 tables. Bar consumption prohibited.The closing time is set at 1:00.', 
                                    'Capacity of 50% indoors and 100% on the terrace with tables for a maximum of four people, whether they are living together or not. Closing hours at 22:00. Bar consumption prohibited.',
                                    'No limitations on the restoration activity'] },
                            {"D" : ['It is recommended to avoid gatherings of more than four people indoors and outdoors.', 
                                    'It is recommended that they be of eight people and three living units as a maximum',
                                    'No limitations'] }
    ]

    let arrTexts = []

    restrictionsArray.forEach(element => {
        for (const property in element) {
            arrTexts.push(element[property])
        }
    });

    function getRandoms(arrTexts){
        let output = []
        arrTexts.forEach(element => {
            let random = Math.floor(Math.random() * (element.length - 0)) + 0
            output.push(element[random])
        });

        return output;

    }

    return (
        
            <Grid item xs={12} sm={12} md={12} lg={12} style={{ margin:"15px" }}>
                <Box>
                <Typography variant="h3" style={{ color:"white" }} gutterBottom>
                    Restrictions 
                </Typography>
                    <Card style={{overflow:"auto"}}>
                        <CardContent style={{display:"flex", justifyContent:"center", flexWrap:"wrap", alignItems:"flex-column", textAlign:"center", overflowWrap:"break-word"}} >
                            <Grid item lg={3} xs={12} sm={12} md={12} style={{padding:"15px"}} >
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Curfew
                                </Typography>
                                <GavelIcon></GavelIcon>
                                {props.restrictionsOn? true && (
                                    <Typography> {getRandoms(arrTexts) ? getRandoms(arrTexts)[0] : ''} </Typography>
                                ) : ''}
                            </Grid>
                            <Grid item lg={3} xs={12} sm={12} md={12} style={{padding:"15px"}}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Sport
                                </Typography>
                                <GavelIcon>xs=6 sm=3</GavelIcon>
                                {props.restrictionsOn? true && (
                                    <Typography>{getRandoms(arrTexts) ? getRandoms(arrTexts)[1] : ''}</Typography>
                                ) : ''}
                            </Grid>
                            <Grid item lg={3} xs={12} sm={12} md={12} style={{padding:"15px"}}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Restoration
                                </Typography>
                                <GavelIcon>xs=6 sm=3</GavelIcon>
                                {props.restrictionsOn? true && (
                                    <Typography>{getRandoms(arrTexts) ? getRandoms(arrTexts)[2] : ''}</Typography>
                                ) : ''}
                            </Grid>
                            <Grid item lg={3} xs={12} sm={12} md={12} style={{padding:"15px"}}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Social meetings
                                </Typography>
                                <GavelIcon>xs=6 sm=3</GavelIcon>
                                {props.restrictionsOn? true && (
                                    <Typography>{getRandoms(arrTexts) ? getRandoms(arrTexts)[3] : ''}</Typography>
                                ) : ''}
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>    
    )
}


export default Restrictions;