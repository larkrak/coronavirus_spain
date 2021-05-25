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

/**
 * 
 * Use this hook in order to save in an accessible variable the content i will need after clicking on a region.
 * 
 * 
 */

const [data_ccaa, dataSetCCAA] = useState([])

/**
 * 
 * casesByDate. useState Hook
 * Use this to assign all the cases in array format. This will be treated inside the main click event. That click will get the values on that regions for every day 
 * It has the following format:
 * "2,3,4,5,6,7" { String splitted by coma. At that event i transform this to array format, so chartjs needs an array to plot data. } 
 * 
 * At the momento to set the value with the function setCasesByDate, i add an information i will need to show labels into the graph, the name. 
 * So in chartjs my data will be casesByDate[0] and the region name casesByDate[1]
 * 
 * 
 */

const [casesByDate, setCasesByDate] = useState([])


/**
 * 
 * dates, useState Hook.
 * Use this to assign the x label ticks. Just because i wasn't saving this data from the main CSV data. It wasn't necessary since i know the first day and the last one (today)
 * So i can calculate the rest of the range with a function. -> generateDatesArray()
 * 
 * 
 */

const [dates, setDates] = useState([])

/**
 * 
 * This 3 hooks are necessary for the change function on the graph. I mean when you specify another type of data.
 * First i specify them as 0 so without changing the select, the value loaded is 0 (first item of the select). Then, at the moment of changing it, i set the new type to the new select value.
 * 
 * Using this at handleChangeProgressionType() function.
 * 
 * In that function, previously (on a click on the map) i created a refference to the important values to plot. 
 * I mean, without using the change funcionality, the graph will load the request by default, 0 (total cases).
 * If you try to change the data to show without clicking previously in the map, the handleChangeProgressionType will try to show a new values, but, as you didnt click
 * in a region of the map, the reference im using inside the funcion is null, so i dont execute the useState hooks that loads data into the map. Instead of that, the data is loaded at the click event.
 * 
 * 
 * Im using a handlechange function for the 3 selects at the application. First graph has a change type of data and a change time to show.
 * The second graph only has a change type data.
 * 
 * 
 */

const [typeOfProgressionData, setTypeOfProgressionData] = useState(0);
const [daysToShow, setDaysToShow] = useState(0);
const [typeOfTotalData, setTypeOfTotalData] = useState(0);

/**
 * 
 * This hook was created in order to control when the data is required. If the user clicks in a region of the map, this hook will load CCAA data and region clicked.
 * But, if the user clicks in add regions, this hooks load all the regions with a function -> addTheOtherRegions().
 * This is a difficult function becouse im looping the main data and an object that i created just in case i would need something tricky.
 * For example, if i didnt created this object (CCAAsetup) i couldnt know what others regions are in the CCAA clicked. I control that in the previously mentioned function.
 * And add data to the hook dynamcally depending on the number of regions that i found. 
 * 
 * 
 */

const [dataIntoTheChart, setDataToChart] = useState([])


/**
 * 
 * Im using this hooks (useRef) to create a refference bases on the previous useState. I remember, i inicialized them at 0. (first select item)
 * 
 * 
 */

const myRefTypeOfProgressionData = useRef(typeOfProgressionData);
const myRefDaysToShow = useRef(daysToShow);
const myRefTypeOfTotalData = useRef(typeOfTotalData);


/**
 * 
 * refProgressionData and refTotalData are necessary for the changes function. At the momento the user clicks on a region, the refference is created with this format:
 * 
 * ref.current = [[total_cases, regName], [hops_cases, regName],[uci_cases, regName],[def_cases, regName]]
 * 
 * That means that i know exactly the values for all the other types of data without clicking on a region
 * So at the moment of changing the select, i load the type requested from that refference.
 * 
 * Same for refTotalData, only difference is that i needed to save data for CCAA and region, so the format is like this:
 * 
 * [
 * {CCAA: properties for differents types of data},
 * {Provincia: properties for differents types of data}
 * ]
 * 
 * 
 */

const refProgressionData = useRef()
const refTotalData = useRef()

/**
 * 
 * Hooks that update the state of the open select.
 * 
 * 
 */

const [openProgressionType, setOpenProgressionType] = useState(false);
const [openDaysToShow, setOpenDaysToShow] = useState(false);
const [openTotalType, setOpenTotalType] = useState(false);


/**
 * 
 * With this hook i control that the component of restriccions is loaded but empty at the page load. Becouse user didnt click in any region for the moment.
 * 
 * 
 */

const [restrictions, setRestrictions] = useState([])

const [restrictionOn, setRestrictionOn] = useState(false)

/**
 * 
 * @param {*} event 
 * 
 * This controls that a region was clicked, or not. So this only is triggered when the change comes after a click.
 * 
 * I mean that -> myRefTypeOfProgressionData <- is saving all the data from the different types of graph. So, in this function
 * As i specified values for the options of the select as 0,1,2,3, i can access thought that number to the array that contains the data, always that 
 * i introduced that data in the same order. This is why i can access to the data this way: 
 * 
 * -> refProgressionData.current[myRefTypeOfProgressionData.current] <-
 * 
 * 
 * refProgressionData contains an array of data of total cases, hosps, uci and def.
 * So refProgressionData[X] will be some of them, but i wrote the code to access them from the same position that the option value says.
 * 
 * Actually refProgressionData is in this format: -> [[data1, regionName], [data2, regionName], [data3, regionName], [data4, regionName]] <-
 * So i need to specify double indexing. first one will select -> [data1,regionName] <- but i need to slice the data so i need to -> [0] <-
 * 
 * 
 */

const handleChangeProgressionType = (event) => {
  setTypeOfProgressionData(event.target.value);
  myRefTypeOfProgressionData.current = event.target.value;
  
  if(refProgressionData.current !== undefined){

    let newValues = refProgressionData.current[myRefTypeOfProgressionData.current][0].slice(-myRefDaysToShow.current)

    setCasesByDate([newValues, refProgressionData.current[myRefTypeOfProgressionData.current][1]])
    setDates(generateDatesArray().slice(-myRefDaysToShow.current))
  }
};

const handleCloseProgressionType = () => {
  setOpenProgressionType(false);
};

const handleOpenProgressionType = () => {
  setOpenProgressionType(true);
};


/**
 * 
 * @param {*} event 
 * 
 * This function controls the same concept that the previous function, only for saving the refference of what days the user specified.
 * 
 */

const handleChangeDaysToShow = (event) => {
  setDaysToShow(event.target.value);
  myRefDaysToShow.current = event.target.value

  if(refProgressionData.current !== undefined){

    let newValues = refProgressionData.current[myRefTypeOfProgressionData.current][0].slice(-myRefDaysToShow.current)

    setCasesByDate([newValues, refProgressionData.current[myRefTypeOfProgressionData.current][1]])
    setDates(generateDatesArray().slice(-myRefDaysToShow.current))

  }
};

const handleCloseDaysToShow = () => {
  setOpenDaysToShow(false);
};

const handleOpenDaysToShow = () => {
  setOpenDaysToShow(true);
};


/**
 * 
 * This function is what controls the change event on the second graph (CCAA vs region). Is similar to the previous one but here i need to check another things.
 * 
 * Depending on the item of the select (total, hops, def, uci), need to load THAT data and only that one to a variable. That variable is what goes to the data object 
 * Into a useState. The variable binded to that useState is what goes to the final graph.
 * 
 */


const handleChangeTotalData = (event) => {

  setTypeOfTotalData(event.target.value)

  myRefTypeOfTotalData.current = event.target.value

  if(refTotalData.current !== undefined){

    var dataccaa = "";
    var dataprov = "";

    if(refNewData.current === undefined){

      if(myRefTypeOfTotalData.current === 0){
        dataccaa = refTotalData.current[0].CCAA.total
        dataprov = refTotalData.current[0].Provincia.total
      }
      if(myRefTypeOfTotalData.current === 1){
        dataccaa = refTotalData.current[0].CCAA.hosp
        dataprov = refTotalData.current[0].Provincia.hosp
      }
      if(myRefTypeOfTotalData.current === 2){
        dataccaa = refTotalData.current[0].CCAA.uci
        dataprov = refTotalData.current[0].Provincia.uci
      }
      if(myRefTypeOfTotalData.current === 3){
        dataccaa = refTotalData.current[0].CCAA.def
        dataprov = refTotalData.current[0].Provincia.def
      }

      setDataToChart([
        {
          label: refTotalData.current[0].CCAA.name, 
          data: [dataccaa],
          backgroundColor: [
            refTotalData.current[0].CCAA.color
          ],
          borderWidth: 1,
          borderColor: "black"
        },
        {
          label: refTotalData.current[0].Provincia.name,
          data: [dataprov],
          backgroundColor: [
            '#99d98c',
          ],
          borderWidth: 1,
          borderColor: "black"
        }
      ])

    }else{
      setDataToChart(refNewData.current)
    }
  }
  refNewData.current !== undefined ? setActive(true) : setActive(false)
};

const handleCloseTotalType = () => {
  setOpenTotalType(false);
};

const handleOpenTotalType = () => {
  setOpenTotalType(true);
};


/**
 * 
 *  _________
 * |_refTemp_|
 *  
 * This hook is here just because is not something general. This is only used in addTheOtherRegions(). Probably, I could have used a simple variable.
 * 
 * This function only has sense after user clicked on a region, so first thing i get is exactly the CCAA clicked. 
 * The hook dataSetCCAA gives me this info, i added that on the click event.
 * Need to set a couple of variables (arrays) to be pushing there the rest of the regions.
 * To do that im looping the object that i created just in case (CCAAsetup)
 * 
 * Loop it till i am in the key that is clicked ccaa. Then, i loop his value (that is another object) till i get the key named "provincias"
 * That key contains an array with all the regions for that CCAA in array format. I need to check that the array is higher than 1, to control ccaa with only 1 region.
 * Such as Madrid or Murcia for example.
 * 
 * Then, when im at that level, i loop that array. So, for each one of them (regions) i create an object with the format required for the chartjs component.
 * That object that i create at the loop, i push it to the array created previously. At the end of the loop i add the CCAA too. Then i just update the state of the
 * useState hook setDataToChart(), that is the variable that loads data inside the chartjs component.
 * 
 *  ____________
 * |_refNewData_|
 * 
 * As the data that im loading, depends directly of the selected option. (type of data: Total cases, hospitalizations...) first i need to check that.
 * Depending on that values, the data i get from the feature of the geojson is another.
 * Then, i create the object that will go to the hook setDataToChart() with that data.
 * 
 * This hook is used too at the handleChangeTotalData function, that handles the data that im showing at the graph. Its used the same way,
 * depending on the type selected, i need one or another data from the geojson.
 * 
 *  __________
 * |_isActive_|
 * 
 * This hook changes the text of the button that adds regions to "refresh" if u specified another type of data.
 * 
 * 
 */

const refTemp = useRef()
const refNewData = useRef()

const [isActive, setActive] = useState(false)

function random_rgba() {
  let arr = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"]
  let random = Math.floor(Math.random() * (arr.length - 0)) + 0;
  return arr[random];
}

const addTheOtherRegions = (event) => {

  let isoClicked = data_ccaa[3] 

  let arrayOfObjectsDataChart = []
  let dataCCAA = []

  for (var [key, value] of Object.entries(CCAAsetup)) {

    if(key === isoClicked){
      for (var [key2, value2] of Object.entries(value)){

        if(key2 === 'provincias'){

          if(value2.length > 1){

            for(var [num, feature] of Object.entries(provincias)){

                if(value[key2].indexOf(feature.properties.iso_prov) !== -1){

                  var data = ""
                  var dataccaa = ""
                  if(myRefTypeOfTotalData.current === 0){
                      data = feature.properties.total_casos_provincia
                      dataccaa = feature.properties.total_casos_ccaa
                  }
                  if(myRefTypeOfTotalData.current === 1){
                      data = feature.properties.total_hosp_provincia
                      dataccaa = feature.properties.total_hosp_ccaa
                  }
                  if(myRefTypeOfTotalData.current === 2){
                      data = feature.properties.total_uci_provincia
                      dataccaa = feature.properties.total_uci_ccaa
                  }
                  if(myRefTypeOfTotalData.current === 3){
                      data = feature.properties.total_def_provincia
                      dataccaa = feature.properties.total_def_ccaa
                  }
                  refTemp.current = {
                    label: feature.properties.name,
                    data: [data],
                    backgroundColor:[
                      random_rgba()
                    ], 
                    borderWidth: 1,
                    borderColor: "black",
                  }
                  arrayOfObjectsDataChart.push(refTemp.current) 

                  dataCCAA = {
                    label: CCAAsetup[feature.properties.iso_ccaa].name,
                    data: [dataccaa],
                    backgroundColor:[
                      CCAAsetup[feature.properties.iso_ccaa].color
                    ], 
                    borderWidth: 1,
                    borderColor: "black",
                  }               
                }
            }
            arrayOfObjectsDataChart.push(dataCCAA)
            refNewData.current = arrayOfObjectsDataChart
            setDataToChart(arrayOfObjectsDataChart)
          }
        }
      }
    }
  } 
};

/**
 * 
 * This is a kind of custom hook created by material ui. Its some kind of standard they use to apply styles.
 * 
 * 
 */


const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: 15,  
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));


/**
 * 
 * Function mentioned before. Generates an array of dates since 2020-01-01 to today.
 * 
 * 
 */


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


/**
 * 
 * @param {*} feature 
 * @param {*} layer 
 * 
 * This function is the main functionality in the component. This is a function of the geoJson component. Means that, for every one of the features inside the geoJson 
 * (we can understand a feature as a complex array of coordinates, which delimits zones in the map) it will do something to that feature (region).
 * 
 * In mi case, i created a click event that manage all the application. Depending on which region is clicked, the useStates load with a specific data.
 * 
 * 
 */



function onEachFeature(feature, layer) {

    if (feature.properties && feature.properties.name) {

        let region = feature.properties.name;

        CCAAsetup[feature.properties.iso_ccaa].casos_totales = feature.properties.total_casos_ccaa

        layer.options.color = CCAAsetup[feature.properties.iso_ccaa].color

        layer.on('click', function (e) {

          let ccaa = CCAAsetup[feature.properties.iso_ccaa].name

          dataSetCCAA([e.target.feature.properties.total_casos_ccaa, CCAAsetup[e.target.feature.properties.iso_ccaa].name, e.target.options.color, e.target.feature.properties.iso_ccaa, e.target.feature.properties.iso_prov])

          setRestrictions(e.target.feature.properties.restrictions)
          setActive(false)
          setRestrictionOn(true)
          refNewData.current = undefined

          setDataToChart([
                        {
                          label: CCAAsetup[e.target.feature.properties.iso_ccaa].name, 
                          data: [e.target.feature.properties.total_casos_ccaa],
                          backgroundColor: [
                            e.target.options.color
                          ],
                          borderWidth: 1,
                          borderColor: "black"
                        },
                        {
                          label: e.target.feature.properties.name,
                          data: [e.target.feature.properties.total_casos_provincia],
                          backgroundColor: [
                            '#99d98c',
                          ],
                          borderWidth: 1,
                          borderColor: "black"
                        }
                      ])

          refTotalData.current = [{
            CCAA: {name: CCAAsetup[e.target.feature.properties.iso_ccaa].name, total: e.target.feature.properties.total_casos_ccaa,  hosp: e.target.feature.properties.total_hosp_ccaa, uci: e.target.feature.properties.total_uci_ccaa, def: e.target.feature.properties.total_def_ccaa, color: e.target.options.color },
            Provincia: {name: e.target.feature.properties.name, total:e.target.feature.properties.total_casos_provincia,  hosp: e.target.feature.properties.total_hosp_provincia, uci: e.target.feature.properties.total_uci_provincia, def: e.target.feature.properties.total_def_provincia }
          }]

          console.log(feature)
           

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

          refProgressionData.current = [[casesByDate, regName], [hospByDate, regName], [uciByDate, regName], [defByDate, regName]]

          if(myRefTypeOfProgressionData.current === 0){
            setCasesByDate([casesByDate,regName])
          }
          if(myRefTypeOfProgressionData.current === 1){
            setCasesByDate([hospByDate,regName])
          }
          if(myRefTypeOfProgressionData.current === 2){
            setCasesByDate([uciByDate,regName])
          }
          if(myRefTypeOfProgressionData.current === 3){
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
  }
});

/**
 * 
 * 
 * This is a comment to explain my layout. Material ui has a component called grid. Grid a responsive and flexible layout system.  
 * Its based on the flexible box from CSS, which allows to alter the containers / items dimensions and fill the available space.
 * Material ui grid has 2 different components. A Container grid and Item grid. Its based on 12 columns, so container are 12 columns always and then 
 * You specify the items columns. My grid has the following format.
 * 
 * 
 *  <Grid container> --> Its full screen width
 *    <Grid item lg={8}> --> 8 of the 12 available columns
 *      
 *      <Grid item lg={12}> --> 12 to specify the 100% from the parent (that was 8)
 *          Here goes the map
 *      </Grid>
 *  
 *    </Grid> // End of 8 columns item // 
 * 
 *    <Grid item lg={4}> --> 4 of the 12 available columns, which are the rest of the previous 8 columns. So this one + the 8 columns are 100% (same as parent)
 * 
 *      <Grid item lg={12}> --> 12 to specify the 100% from the parent (that was 4)
 *          Here is the first graph, progression of cases
 *      </Grid>
 * 
 *      <Grid item lg={12}> --> 12 to specify the 100% from the parent (that was 4)
 *          Here goes the second graph, the total cases compared.
 *      </Grid>
 * 
 *    </Grid> // End of 4 columns item // 
 * 
 *    <Grid item lg={12}> --> 12 to specify the 100%
 *        Here goes the restrictions
 *    </Grid>
 * 
 *  </Grid> // End of cantainer //
 * 
 * 
 * 
 * 
 */

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
                    <MapContainer style={{ height:"100vh", outline:"5px solid white"}} zoom="6" center={[40.53667, -3.74922]} scrollWheelZoom={true} zoomControl={true} >
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
                          open={openProgressionType}
                          onClose={handleCloseProgressionType}
                          onOpen={handleOpenProgressionType}
                          value={typeOfProgressionData}
                          onChange={handleChangeProgressionType}
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
                          open={openDaysToShow}
                          onClose={handleCloseDaysToShow}
                          onOpen={handleOpenDaysToShow}
                          value={daysToShow}
                          onChange={handleChangeDaysToShow}
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
                          <Grid  item xs={12} sm={12} md={12} lg={12} style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                            <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Select data</InputLabel>
                              <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={openTotalType}
                                onClose={handleCloseTotalType}
                                onOpen={handleOpenTotalType}
                                value={typeOfTotalData}
                                onChange={handleChangeTotalData}
                              >
                                <MenuItem value={0}>Show Total Cases</MenuItem>
                                <MenuItem value={1}>Show Total Hospitalizations</MenuItem>
                                <MenuItem value={2}>Show Total UCI Cases</MenuItem>
                                <MenuItem value={3}>Show Total Defunctions</MenuItem>

                              </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                              <Button 
                              onClick={addTheOtherRegions}
                              variant="contained">
                                {isActive? "Refresh" : "Add all regions"}
                              </Button>
                            </FormControl>
                          </Grid>
                        </ThemeProvider>
                            <CardContent>
                                <Bar
                                  data={{
                                      labels: data_ccaa[1] ? ["Total Coronavirus Cases"] : '',
                                        datasets:   
                                        [...dataIntoTheChart]
                                  }}
                                  options={{
                                    scales:{
                                      xAxes: [{
                                        barThickness: 6,  // number (pixels) or 'flex'
                                        maxBarThickness: 8 // number (pixels)
                                      }]
                                    }
                                  }}
                               />
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} >
            <Restrictions style={{overflow:"auto"}} restrictionsOn={restrictionOn} restrictions={restrictions}></Restrictions>
          </Grid>
      </Grid>
    )
}


export default CovidMap;
