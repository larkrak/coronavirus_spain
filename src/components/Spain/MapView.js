import React, {useState, useEffect } from 'react';
import Loading from './Loading'
import CovidMap from './Map'
import LoadDataTask from '../../tasks/LoadDataTask'


const MapView = () => {

    const [provincias, setProvincias] = useState([]);

    const load = () => {
        const loadDataTask = new LoadDataTask();
        loadDataTask.load(setProvincias)
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