import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GavelIcon from '@material-ui/icons/Gavel';


const Restrictions = (props) => {

    let restrictionsArray = [ {"A" : ['Sí. La restricción de entrada no será aplicable a aquellos pasajeros que se sometan al control sanitario consistente en: suscripción de una declaración responsable,  control de sintomatología o prueba diagnóstica de Infección Activa con resultado negativo en las 72 horas previas a la llegada y/o aislamiento.',
                                    'Sin limitaciones',
                                    'Si, hasta el 23 de junio'] },
                            {"B" : ['Sin limitación.', 
                                    'Restricciones no aplicables para municipios colindantes que compartan calle.',
                                    'Sí, desde el 02-03-2020'] },
                            {"C" : ['Entre las 22:00 y las 6:00 horas.', 
                                    'Entre las 23:00 y las 6:00 horas.',
                                    'Entre las 22:00 y las 6:00 horas.'] },
                            {"D" : ['Máximo 6 personas.', 
                                    'Maximo 4 sagitarios juntos. Por cada luna de fuego en el mes.',
                                    'No mas de 3 veganos en la misma mesa'] }
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
                    Restricciones 
                </Typography>
                    <Card style={{overflow:"auto"}}>
                        <CardContent style={{display:"flex", justifyContent:"center", flexWrap:"wrap", alignItems:"flex-column", textAlign:"center", overflowWrap:"break-word"}} >
                            <Grid item lg={3} xs={12} sm={12} md={12} style={{padding:"15px"}} >
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Limitaciones perimetral
                                </Typography>
                                <GavelIcon></GavelIcon>
                                {props.restrictions? true && (
                                    <Typography> {getRandoms(arrTexts) ? getRandoms(arrTexts)[0] : ''} </Typography>
                                ) : ''}
                            </Grid>
                            <Grid item lg={3} xs={12} sm={12} md={12} style={{padding:"15px"}}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Limitaciones con otras regiones territoriales *
                                </Typography>
                                <GavelIcon>xs=6 sm=3</GavelIcon>
                                {props.restrictions? true && (
                                    <Typography>{getRandoms(arrTexts) ? getRandoms(arrTexts)[1] : ''}</Typography>
                                ) : ''}
                            </Grid>
                            <Grid item lg={3} xs={12} sm={12} md={12} style={{padding:"15px"}}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Circulación nocturna
                                </Typography>
                                <GavelIcon>xs=6 sm=3</GavelIcon>
                                {props.restrictions? true && (
                                    <Typography>{getRandoms(arrTexts) ? getRandoms(arrTexts)[2] : ''}</Typography>
                                ) : ''}
                            </Grid>
                            <Grid item lg={3} xs={12} sm={12} md={12} style={{padding:"15px"}}>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Grupos sociales
                                </Typography>
                                <GavelIcon>xs=6 sm=3</GavelIcon>
                                {props.restrictions? true && (
                                    <Typography>{getRandoms(arrTexts) ? getRandoms(arrTexts)[3] : ''}</Typography>
                                ) : ''}
                            </Grid>
                        </CardContent>
                        <Typography>*<em>Comarcas o regiones sanitarias</em></Typography>
                    </Card>
                </Box>
            </Grid>    
    )
}


export default Restrictions;