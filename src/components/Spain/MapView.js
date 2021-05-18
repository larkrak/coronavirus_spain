import React, {useState, useEffect } from 'react';
import Loading from './Loading'
import CovidMap from './Map'
import LoadCountriesTask from '../../tasks/LoadCountriesTask'


const MapView = () => {

    const [provincias, setProvincias] = useState([]);

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setProvincias)
    };

    useEffect(load, []);

    return (
    <div>
        {provincias.length === 0 ? ( 
        <Loading /> ) 
        : ( 
        <div>
            <CovidMap provincias = {provincias} />
        </div>  
        )} 
    </div>
    )
}

export default MapView;