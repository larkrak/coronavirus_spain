import React, { useState, useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Line } from 'react-chartjs-2'
import { createMuiTheme } from '@material-ui/core/styles';
import { Bar } from 'react-chartjs-2'
import { ThemeProvider } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import Restrictions from './Restrictions'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';



const CCAAsetup = {
    "01":{code: "01", name: "Andalucia", provincias: ['AL', 'CA', 'CO', 'GR', 'H', 'J', 'MA', 'SE'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#06d6a0"},
    "02":{code: "02", name: "Aragón", provincias:['HU', 'TE', 'Z'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#f72585"},
    "03":{code: "03", name: "Islas Baleares", provincias: ['PM'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#3fc1c0"},
    "04":{code: "04", name: "Canarias", provincias: ['GC','TF'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#f9c74f"},
    "05":{code: "05", name: "Cantabria", provincias: ['S'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#7dcfb6"},
    "06":{code: "06", name: "Castilla-La Mancha", provincias: ['AB','CR','GU','TO'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#432818"},
    "07":{code: "07", name: "Castilla y León", provincias: ['AV','BU','LE','P','SA','SG','SO','VA','ZA'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#bb9457"},
    "08":{code: "08", name: "Cataluña", provincias:['B','GI','L','T'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#be0aff"},
    "09":{code: "09", name: "Ciudad Autónoma de Ceuta", provincias:['CE'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#f9b27c"},
    "10":{code: "10", name: "Extremadura", provincias:['BA','CC'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#fe6d73"},
    "11":{code: "11", name: "Galicia", provincias:['C', 'LU', 'OR', 'PO'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#ef476f"},
    "12":{code: "12", name: "La Rioja", provincias:['LO'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#248232"},
    "13":{code: "13", name: "Madrid", provincias:['M'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#f9c80e"},
    "14":{code: "14", name: "Ciudad Autónoma de Melilla", casos_totales: 0, uci_totales: 0, def_totales: 0, provincias:['ML'], color: "#118ab2"},
    "15":{code: "15", name: "Murcia", provincias:['MU'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#073b4c"},
    "16":{code: "16", name: "Comunidad Foral de Navarra", provincias:['NA'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#ee6c4d"},
    "17":{code: "17", name: "País Vasco", provincias:['VI','BI','SS'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#293241"},
    "18":{code: "18", name: "Principado de Asturias", provincias:["O"], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#a4161a"},
    "19":{code: "19", name: "Comunidad Valenciana", provincias:['A','CS','V'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#8d0801"}
    
}


const CovidMap = ({ provincias }) => {

const [data_ccaa, dataSetCCAA] = useState([])
const [data_region, dataSetRegion] = useState([])

const [casesByDate, setCasesByDate] = useState([])
const [dates, setDates] = useState([])

const [typeOfData, setTypeOfData] = useState(10);
const [daysToShow, setDaysToShow] = useState(10);

const myRefTypeOfData = useRef(typeOfData);
const myRefDaysToShow = useRef(daysToShow);

const [open, setOpen] = useState(false);
const [open2, setOpen2] = useState(false);

const [restrictions, setRestrictions] = useState(false)

const handleChangeType = (event) => {
  setTypeOfData(event.target.value);
  myRefTypeOfData.current = event.target.value;
  setCasesByDate([])
  dataSetRegion([])
  dataSetCCAA([])
};

const handleClose = () => {
  setOpen(false);
};

const handleOpen = () => {
  setOpen(true);
};

const handleChangeDays = (event) => {
  setDaysToShow(event.target.value);
  myRefDaysToShow.current = event.target.value
  setCasesByDate([])
  dataSetRegion([])
  dataSetCCAA([])

};

const handleClose2 = () => {
  setOpen2(false);
};

const handleOpen2 = () => {
  setOpen2(true);
};

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: 15,  
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));


function generateDatesArray(){
  var startDate = '2020-01-01';
  var endDate = moment().format('YYYY-MM-DD')
  
  var current = new moment(startDate);
  var end = new moment(endDate);
  
  var dates = [];
  
  while (current.isBefore(endDate)) {
    dates.push(current.format('YYYY-MM-DD'));
    current.add(1, 'days');
  }  

  current = new moment(startDate);
  dates = [];
  while (current < end) {
    dates.push(current.format('YYYY-MM-DD'));
    current.add(1, 'days');
  }
  return dates;
}


function onEachFeature(feature, layer) {

    if (feature.properties && feature.properties.name) {

        let region = feature.properties.name;

        CCAAsetup[feature.properties.cod_ccaa].casos_totales = feature.properties.total_casos_ccaa

        layer.options.color = CCAAsetup[feature.properties.cod_ccaa].color


        layer.on('click', function (e) {

          let ccaa = CCAAsetup[feature.properties.cod_ccaa].name

          

          //dataSetCCAA([e.target.feature.properties.total_casos_ccaa, [CCAAsetup[e.target.feature.properties.cod_ccaa].name], e.target.options.color])
          dataSetRegion([e.target.feature.properties.total_casos_provincia, [e.target.feature.properties.name]])
          dataSetCCAA([e.target.feature.properties.total_casos_ccaa, CCAAsetup[e.target.feature.properties.cod_ccaa].name, e.target.options.color, e.target.feature.properties.cod_ccaa])
          setRestrictions(true)
            /*layer.bindPopup('<Card><Cardcontent>'
            +'<Typography variant="{h1}">'+region+'</Typography><br>'
            +'<h4>Casos Históricos:</h4>'
            +'<table class="info" >'
                + '<tr><th>Casos Totales Diagnosticados</th><th>Casos totales de ingresos en UCI</th><th>Casos totales de defunciones</th></tr>'
                + '<tr><td>'+e.target.feature.properties.total_casos+'</td><td>'+e.target.feature.properties.total_uci+'</td><td>'+e.target.feature.properties.total_def+'</td></tr>'
            +'</table>'
            +'</Cardcontent></Card>').openPopup()*/

          layer.bindPopup('<div class="info">'
          +'<h1>'+region+', '+ccaa+'</h1>'
          +'<div><p><h3>Casos Totales Diagnosticados: '+e.target.feature.properties.total_casos_provincia+'</h3></p>'
          +'<p><h3>Casos totales de hospitalizaciones: '+e.target.feature.properties.total_hosp_provincia+'</h3></p>'
          +'<p><h3>Casos totales de ingresos en UCI: '+e.target.feature.properties.total_uci_provincia+'</h3></p>'
          +'<p><h3>Casos totales de defunciones: '+e.target.feature.properties.total_def_provincia+'</h3></p>'
          +'</div>'
          +'</div>').openPopup()

          
          var casesByDate = e.target.feature.properties.progression_num_casos.split(",")
          var hospByDate = e.target.feature.properties.progression_num_hosp.split(",")
          var uciByDate = e.target.feature.properties.progression_num_uci.split(",")
          var defByDate = e.target.feature.properties.progression_num_def.split(",")

          var dates = generateDatesArray();

          // if(myRefDaysToShow.current == 30){
          //   hospByDate = hospByDate.slice(-30)
          //   dates = dates.slice(-30)
          // }
          // if(myRefDaysToShow.current == 60){
          //   uciByDate = uciByDate.slice(-60)
          //   dates = dates.slice(-60)
          // }
          // if(myRefDaysToShow.current == 90){
          //   defByDate = defByDate.slice(-90)
          //   dates = dates.slice(-90)
          // }
          if(myRefDaysToShow.current !== 10){
            casesByDate = casesByDate.slice(-myRefDaysToShow.current)
            hospByDate = hospByDate.slice(-myRefDaysToShow.current)
            uciByDate = uciByDate.slice(-myRefDaysToShow.current)
            defByDate = defByDate.slice(-myRefDaysToShow.current)
            dates = dates.slice(-myRefDaysToShow.current)
          }

          if(myRefTypeOfData.current === 10){
            setCasesByDate([casesByDate,e.target.feature.properties.name])
          }
          if(myRefTypeOfData.current === 20){
            setCasesByDate([hospByDate,e.target.feature.properties.name])
          }
          if(myRefTypeOfData.current === 30){
            setCasesByDate([uciByDate,e.target.feature.properties.name])
          }
          if(myRefTypeOfData.current === 40){
            setCasesByDate([defByDate,e.target.feature.properties.name])
          }
          setDates(dates)
        });
    }
}

const classes = useStyles();
    
const theme = createMuiTheme({
  typography:{
    h3: {
      fontWeight: 200,
      letterSpacing: 2,
      fontSize:28
    }
  },
  card:{
    asd:{
      backgroundColor: "red"
    }
  }
});


console.log(data_ccaa[3])


    return (

      <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={8} style={{height:"80%", padding:"15px"}}>
            <a href="/">
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<ArrowBackIcon />}
              />
            </a>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                    <MapContainer style={{ height:"80vh", outline:"5px solid white"}} zoom="6" center={[40.53667, -3.74922]} scrollWheelZoom={true} zoomControl={true} >
                        <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <GeoJSON 
                        data={provincias} 
                        onEachFeature={onEachFeature}
                        weight={2}
                        opacity={0.25}
                        >
                        </GeoJSON>
                        
                    </MapContainer>
                </Box>
            </Grid>

          </Grid>

          <Grid item xs={12} sm={12} md={9} lg={4} style={{margin:"auto"}}>
            <Grid item xs={12} sm={12} md={12} lg={12} style={{margin:"15px"}} >
                <Box style={{textAlign:"center"}}>
                    <Card >
                      <Typography variant="h3"  color="textSecondary" gutterBottom>
                        Progression day by day
                      </Typography>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Select data</InputLabel>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          open={open}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          value={typeOfData}
                          onChange={handleChangeType}
                        >
                          <MenuItem value={10}>Show Total Cases</MenuItem>
                          <MenuItem value={20}>Show Total Hospitalizations</MenuItem>
                          <MenuItem value={30}>Show Total UCI Cases</MenuItem>
                          <MenuItem value={40}>Show Total Defunctions</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Show last days</InputLabel>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          open={open2}
                          onClose={handleClose2}
                          onOpen={handleOpen2}
                          value={daysToShow}
                          onChange={handleChangeDays}
                        >
                          <MenuItem value={10}>All</MenuItem>
                          <MenuItem value={30}>Last 30</MenuItem>
                          <MenuItem value={60}>Last 60</MenuItem>
                          <MenuItem value={90}>Last 90</MenuItem>
                          <MenuItem value={150}>Last 150</MenuItem>
                          <MenuItem value={300}>Last 300</MenuItem>

                        </Select>
                      </FormControl>
                        <CardContent>
                            <Line
                              data={{
                                  labels: dates,
                                    datasets: [{
                                      label: casesByDate[1],
                                      data: casesByDate[0],
                                      backgroundColor: [
                                        data_ccaa[2]
                                      ],
                                    }],
                              }}
                              options= {{
                                responsive: true,
                              }}
                            />
                        </CardContent>
                    </Card>
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} style={{margin:"15px"}}>
                    <Box style={{textAlign:"center"}}>
                        <Card >
                        <ThemeProvider theme={theme}>
                          <Typography variant="h3"  color="textSecondary" gutterBottom>
                            Total cases compared
                          </Typography>
                        </ThemeProvider>
                            <CardContent>
                                <Bar
                                  data={{
                                      labels: data_ccaa[1] ? ["Total Coronavirus Cases"] : '',
                                        datasets: [
                                        {
                                          label: data_ccaa[1] ? data_ccaa[1] : '',
                                          data: data_ccaa,
                                          backgroundColor: [
                                            data_ccaa[2]
                                          ],
                                          barThickness: 90,
                                        },
                                        {
                                          label: data_region[1] ? data_region[1] : '',
                                          data: data_ccaa[3] !== undefined && CCAAsetup[data_ccaa[3]].provincias.length > 1 ? data_region : '',
                                          backgroundColor: [
                                            '#99d98c',
                                          ],
                                          barThickness: 80
                                        }                              
                                      ],
                                  }}


                               />
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>

          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} >
            <Restrictions style={{overflow:"auto"}} restrictions={restrictions}></Restrictions>
          </Grid>
      </Grid>

   
    )
}


export default CovidMap;
