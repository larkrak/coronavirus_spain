import { features } from '../data/spain-provincias.json'
import papa from 'papaparse'
import * as dfd from "danfojs/src/index";
import data from './data_final_per_region_and_CCAA_historic.csv'

class LoadDataTask {

    setState = null
    mapRegions = features
    load = (setState) => {
        this.setState = setState;

        try{
            papa.parse(data,{
                download: true,
                header: true,
                complete: (result) => this.#processCovidData(result.data),
            })   
        }catch(error){
            console.log(error)
        }
        
    }

    #processCovidData = (covidData) => {

        for (let index = 0; index < this.mapRegions.length; index++) {
            const mapRegion = this.mapRegions[index];
            const covidRegion = covidData.find(
                (covidRegion) => covidRegion.provincia_iso === mapRegion.properties.iso_prov
            );

            if(covidRegion != null){
                const total_casos_provincia = Number(covidRegion.num_casos)
                const total_hosp_provincia = Number(covidRegion.num_hosp)
                const total_uci_provincia = Number(covidRegion.num_uci)
                const total_def_provincia = Number(covidRegion.num_def)
                const total_casos_ccaa= Number(covidRegion.Suma_casos_CCAA)
                const total_hosp_ccaa = Number(covidRegion.Suma_hosp_CCAA)
                const total_uci_ccaa = Number(covidRegion.Suma_uci_CCAA)
                const total_def_ccaa = Number(covidRegion.Suma_def_CCAA)
                const progresion_num_casos = covidRegion.progresion_num_casos
                const progresion_num_hosp = covidRegion.progresion_num_hosp
                const progresion_num_uci = covidRegion.progresion_num_uci
                const progresion_num_def = covidRegion.progresion_num_def
                mapRegion.properties.total_casos_provincia = total_casos_provincia
                mapRegion.properties.total_hosp_provincia = total_hosp_provincia
                mapRegion.properties.total_uci_provincia = total_uci_provincia
                mapRegion.properties.total_def_provincia = total_def_provincia
                mapRegion.properties.total_casos_ccaa = total_casos_ccaa
                mapRegion.properties.total_hosp_ccaa = total_hosp_ccaa
                mapRegion.properties.total_uci_ccaa = total_uci_ccaa
                mapRegion.properties.total_def_ccaa = total_def_ccaa
                mapRegion.properties.progression_num_casos = progresion_num_casos
                mapRegion.properties.progression_num_hosp = progresion_num_hosp
                mapRegion.properties.progression_num_uci = progresion_num_uci
                mapRegion.properties.progression_num_def = progresion_num_def
            }

        }

        this.setState(this.mapRegions)
    }

}

export default LoadDataTask