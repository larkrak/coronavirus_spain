import './App.css';
import MapView from './components/Spain/MapView';
import World from './components/world/World';
import Landing from './components/Spain/Landing';
import React from 'react';


import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Grid from '@material-ui/core/Grid';

function App() {

  return (
    
    <Router>
    {/* <ParticlesBackground /> */}
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
                    background={"https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"}
            ></Landing>
            <Landing numColumns={3} router={"/news"}
                      name={"INFORMACIÓN"}
                    background={"https://www.isglobal.org/documents/10179/7701712/covid+virus+3d.jpg"}

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
