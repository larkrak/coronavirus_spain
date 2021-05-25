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

    getRandoms = (arrTexts) => {
        let output = []
        arrTexts.forEach(element => {
            let random = Math.floor(Math.random() * (element.length - 0)) + 0
            output.push(element[random])
        });

        return output;
    }

    #processCovidData = (covidData) => {


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
                mapRegion.properties.restrictions = this.getRandoms(arrTexts)
            }

        }

        this.setState(this.mapRegions)
    }

}

export default LoadDataTask