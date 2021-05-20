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
    "AN":{code: "01", name: "Andalucia", provincias: ['AL', 'CA', 'CO', 'GR', 'H', 'J', 'MA', 'SE'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#06d6a0"},
    "AR":{code: "02", name: "Aragón", provincias:['HU', 'TE', 'Z'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#f72585"},
    "IB":{code: "03", name: "Islas Baleares", provincias: ['PM'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#3fc1c0"},
    "CN":{code: "04", name: "Canarias", provincias: ['GC','TF'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#f9c74f"},
    "CB":{code: "05", name: "Cantabria", provincias: ['S'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#7dcfb6"},
    "CM":{code: "06", name: "Castilla-La Mancha", provincias: ['AB','CR','GU','TO'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#432818"},
    "CL":{code: "07", name: "Castilla y León", provincias: ['AV','BU','LE','P','SA','SG','SO','VA','ZA'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#bb9457"},
    "CT":{code: "08", name: "Cataluña", provincias:['B','GI','L','T'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#be0aff"},
    "CE":{code: "09", name: "Ciudad Autónoma de Ceuta", provincias:['CE'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#f9b27c"},
    "EX":{code: "10", name: "Extremadura", provincias:['BA','CC'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#fe6d73"},
    "GA":{code: "11", name: "Galicia", provincias:['C', 'LU', 'OR', 'PO'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#ef476f"},
    "RI":{code: "12", name: "La Rioja", provincias:['LO'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#248232"},
    "MD":{code: "13", name: "Madrid", provincias:['M'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#f9c80e"},
    "ML":{code: "14", name: "Ciudad Autónoma de Melilla", casos_totales: 0, uci_totales: 0, def_totales: 0, provincias:['ML'], color: "#118ab2"},
    "MC":{code: "15", name: "Murcia", provincias:['MU'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#073b4c"},
    "NC":{code: "16", name: "Comunidad Foral de Navarra", provincias:['NA'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#ee6c4d"},
    "PV":{code: "17", name: "País Vasco", provincias:['VI','BI','SS'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#293241"},
    "AS":{code: "18", name: "Principado de Asturias", provincias:["O"], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#a4161a"},
    "VC":{code: "19", name: "Comunidad Valenciana", provincias:['A','CS','V'], casos_totales: 0, uci_totales: 0, def_totales: 0, color: "#8d0801"}
}


const CovidMap = ({ provincias }) => {

const [data_ccaa, dataSetCCAA] = useState([])
const [data_region, dataSetRegion] = useState([])

const [casesByDate, setCasesByDate] = useState([])
const [dates, setDates] = useState([])

const [typeOfData, setTypeOfData] = useState(0);
const [daysToShow, setDaysToShow] = useState(0);

const [prueba, setPrueba] = useState([{}]);
const [dataIntoTheChart, setDataToChart] = useState([])

const myRefTypeOfData = useRef(typeOfData);
const myRefDaysToShow = useRef(daysToShow);


const refPrueba = useRef()

const [open, setOpen] = useState(false);
const [open2, setOpen2] = useState(false);

const [restrictions, setRestrictions] = useState(false)


const handleChangeType = (event) => {
  setTypeOfData(event.target.value);
  myRefTypeOfData.current = event.target.value;
  
  if(refPrueba.current !== undefined){

    let newValues = refPrueba.current[myRefTypeOfData.current][0].slice(-myRefDaysToShow.current)

    setCasesByDate([newValues, refPrueba.current[myRefTypeOfData.current][1]])
    setDates(generateDatesArray().slice(-myRefDaysToShow.current))
  }
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

  if(refPrueba.current !== undefined){


    let newValues = refPrueba.current[myRefTypeOfData.current][0].slice(-myRefDaysToShow.current)

    setCasesByDate([newValues, refPrueba.current[myRefTypeOfData.current][1]])
    setDates(generateDatesArray().slice(-myRefDaysToShow.current))

  }
};

const handleClose2 = () => {
  setOpen2(false);
};

const handleOpen2 = () => {
  setOpen2(true);
};

const refTemp = useRef()

function random_rgba() {
  let arr = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"]
  let random = Math.floor(Math.random() * (arr.length - 0)) + 0;
  return arr[random];
}

const addTheOtherRegions = (event) => {


  let ccaa = data_ccaa[1]
  let isoClicked = data_ccaa[3] 

  let arrayOfObjectsDataChart = []
  let dataCCAA = []

  console.log(provincias)

  for (var [key, value] of Object.entries(CCAAsetup)) {

    if(key === isoClicked){
      for (var [key2, value2] of Object.entries(value)){

        if(key2 === 'provincias'){

          if(value2.length > 1){

            for(var [num, feature] of Object.entries(provincias)){

                if(value[key2].indexOf(feature.properties.iso_prov) != -1){

                  refTemp.current = {
                    label: feature.properties.name,
                    data: [feature.properties.total_casos_provincia],
                    backgroundColor:[
                      random_rgba()
                    ], 
                    barThickness: 30,
                    borderWidth: 1,
                    borderColor: "black"
                  }
                  arrayOfObjectsDataChart.push(refTemp.current) 

                  dataCCAA = {
                    label: CCAAsetup[feature.properties.iso_ccaa].name,
                    data: [feature.properties.total_casos_ccaa],
                    backgroundColor:[
                      CCAAsetup[feature.properties.iso_ccaa].color
                    ], 
                    barThickness: 30,
                    borderWidth: 1,
                    borderColor: "black"
                  }               
                }
            }
            arrayOfObjectsDataChart.push(dataCCAA)
            setDataToChart(arrayOfObjectsDataChart)
          }
        }
      }
    }
  } 
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

        CCAAsetup[feature.properties.iso_ccaa].casos_totales = feature.properties.total_casos_ccaa

        layer.options.color = CCAAsetup[feature.properties.iso_ccaa].color


        layer.on('click', function (e) {

          let ccaa = CCAAsetup[feature.properties.iso_ccaa].name

          dataSetRegion([e.target.feature.properties.total_casos_provincia, [e.target.feature.properties.name]])
          dataSetCCAA([e.target.feature.properties.total_casos_ccaa, CCAAsetup[e.target.feature.properties.iso_ccaa].name, e.target.options.color, e.target.feature.properties.iso_ccaa, e.target.feature.properties.iso_prov])
          setPrueba([{total: e.target.feature.properties.total_casos_ccaa, name: CCAAsetup[e.target.feature.properties.iso_ccaa].name, color: e.target.options.color, iso_ccaa: e.target.feature.properties.iso_ccaa, iso_prov: e.target.feature.properties.iso_prov}])

          setRestrictions(true)

          setDataToChart([
                        {
                          label: CCAAsetup[e.target.feature.properties.iso_ccaa].name, 
                          data: [e.target.feature.properties.total_casos_ccaa],
                          backgroundColor: [
                            e.target.options.color
                          ],
                          barThickness: 50,
                          borderWidth: 1,
                          borderColor: "black"
                        },
                        {
                          label: e.target.feature.properties.name,
                          data: [e.target.feature.properties.total_casos_provincia],
                          backgroundColor: [
                            '#99d98c',
                          ],
                          barThickness: 50,
                          borderWidth: 1,
                          borderColor: "black"
                        }
                      ])
           

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

          if(myRefDaysToShow.current !== 0){
            casesByDate = casesByDate.slice(-myRefDaysToShow.current)
            hospByDate = hospByDate.slice(-myRefDaysToShow.current)
            uciByDate = uciByDate.slice(-myRefDaysToShow.current)
            defByDate = defByDate.slice(-myRefDaysToShow.current)
            dates = dates.slice(-myRefDaysToShow.current)
          }

          let regName = e.target.feature.properties.name

          refPrueba.current = [[casesByDate, regName], [hospByDate, regName], [uciByDate, regName], [defByDate, regName]]

          if(myRefTypeOfData.current === 0){
            setCasesByDate([casesByDate,regName])
          }
          if(myRefTypeOfData.current === 1){
            setCasesByDate([hospByDate,regName])
          }
          if(myRefTypeOfData.current === 2){
            setCasesByDate([uciByDate,regName])
          }
          if(myRefTypeOfData.current === 3){
            setCasesByDate([defByDate,regName])
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
    addTheOtherRegions:{
      backgroundColor: "red"
    }
  }
});

    return (
      <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={8} style={{padding:"15px"}}>
            <a href="/~dawbi2104/">
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
                          <MenuItem value={0}>Show Total Cases</MenuItem>
                          <MenuItem value={1}>Show Total Hospitalizations</MenuItem>
                          <MenuItem value={2}>Show Total UCI Cases</MenuItem>
                          <MenuItem value={3}>Show Total Defunctions</MenuItem>
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
                          <MenuItem value={0}>All</MenuItem>
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
                          <FormControl className={classes.formControl}>
                            <Button 
                            onClick={addTheOtherRegions}
                            variant="contained">
                              Add All Regions
                            </Button>
                          </FormControl>
                        </ThemeProvider>
                            <CardContent>
                                <Bar
                                  data={{
                                      labels: data_ccaa[1] ? ["Total Coronavirus Cases"] : '',
                                        datasets:   
                                        [...dataIntoTheChart]
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
