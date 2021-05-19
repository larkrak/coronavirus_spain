import './App.css';
import MapView from './components/Spain/MapView';
import World from './components/world/World';
import Landing from './components/Spain/Landing';
import React from 'react';
import ParticlesBackground from './components/Spain/ParticlesBackground';

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Grid from '@material-ui/core/Grid';

function App() {

  return (
    
    <Router>
   <ParticlesBackground/> 
      <div>
        <Route exact path="/">
          <Grid container spacing={0}
                direction="row"
                alignItems="center"
                justify="center">
            <Landing numColumns={6} text={"ESPAÑA"} router={"/spain"} name={"ESPAÑA"}
                    background={"https://img2.rtve.es/i/?w=1600&i=1616009578561.jpg"} 
                    
            ></Landing>
            <Landing numColumns={3} router={"/world"}
                      name={"MUNDO"}
                    background={"https://cdn.pixabay.com/photo/2015/04/15/16/44/world-724108_1280.jpg"}
            ></Landing>
            <Landing numColumns={3} router={"/news"}
                      name={"INFORMACIÓN"}
                    background={"http://www.educacionyfp.gob.es/dam/jcr:00573f9f-8848-41f9-b54c-42c9ac036919/covid-como-protegerse.jpg"}

            ></Landing>
          </Grid>
        </Route>
      <Route exact path="/spain">
        <MapView></MapView>
      </Route>
      <Route exact path="/world">
        <World></World>
      </Route>
      <Route path="/news">
        <h2>asd</h2>
      </Route>
    </div>
  </Router>
  );

}



export default App;
