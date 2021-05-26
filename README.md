
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Coronavirus interactive map
## Made by: 
> Ismael Collado Cala, Darryl Johan Estrada Zavala, Luis Gerardo Corrales Bravo


### Source Code -> Folder SRC <-

```bash
SpainMap/src/
├── App.css
├── App.js
├── App.test.js
├── components {Dir}
│   ├── Spain {Dir}
│   │   ├── Landing.js
│   │   ├── Loading.js
│   │   ├── Map.js
│   │   ├── MapView.js
│   │   ├── ParticlesBackground.js
│   │   └── Restrictions.js
│   └── World {Dir}
|       ├── Circles.jsx
│       ├── compareCountries.jsx
│       ├── CountryTable.css
│       ├── CountryTable.jsx
│       ├── Graph.jsx
│       ├── ProgressBar.css
│       ├── ProgressBar.jsx
│       ├── Status.css
│       ├── Status.jsx
│       ├── TableCompareCountries.css
│       ├── TableCompareCountries.jsx
│       ├── World.css
│       ├── World.jsx
│       ├── WorldMap.css
│       └── WorldMap.jsx
├── data {Dir}
│   └── spain-provincias.json
├── index.css
├── index.js
├── particles-config.js
├── reportWebVitals.js
├── setupTests.js
├── tasks {Dir}
│   ├── data_final_per_region_and_CCAA_historic.csv
│   └── LoadDataTask.js
└── utilities {Dir}
    └── util.js
```


# File -> App.js <-

* First component loading on the web page. This component contains a Router, specified home as 3 Landing components, one for Spain, World and Covid Information.
* Depending on the href of the Landong component, Router will load one or another component.


# Directory -> components <-

It contains the differents components of our proyect:

* [Spain](#Spain)
* [World](#World)
* [Covid Information](#Covid-Information)



# Spain

* Landing
    * Component that loads a grid component with a tag < a >. In this component is where I control the size of the hovered item. This component also receives the url of the image I am using, algo the href  for the routing element.
* Loading
    * This is a simple component used to show a circular progress component while data is being read. The truth is that this is barely visible becouse the rest of the components loading and the background.
* Mapview
    * Is the div containing my main data. All the components including the map, restrictions and graphs. This components loads the Loading component while the main variable (provincias) is lenght of 0. When that variable is not 0, I render CovidMap component sending provincias variable as a prop. CovidMap is how I called the funcion exported in "Map.js" component.
* Map
    * This component is where all the main functionality happens. The main layout is inside this component. Also, all the events managing the clicks of the user. The restriction measures and the data content on the graphs.
* ParticlesBackground
    * This component is only the background of our application. This is a library that needs a config json that will load inside the component. Also, its a component of react installing it as a npm package. Its not vanilla js.
* Restrictions
    * This component are the restrictions for every region. The user click on a region and the restrictions shows.



# World

* Circles
    * This component is in charge of generating the <Circle LeafLet\> that willl be displayed on the map.
  
* compareCountries
    * This component is in charge of the comparison of two contries, it controls  the TableCompareCountries and Graph components. 
* CountryTable
    * This component returns a table that is generated with the data recived by WorldMap component, when the WorldMap component is stopped it makes an async request to the disease.sh API the get the current data.
* Graph
    * This component generates a Graph based on the given country or countries and the type of case the user wants, since we need an historical of cases, this component makes an API call to get the countries data. 
* ProgressBar
    * This component generates a progress bar that is based on the type of cases of the selected country and the population of that country. 
* Status
    * This component displays information of cases and when it is click it trigers a function given by its parent component. 
* TableCompareCountries
    * This component generates table  that displays a more detailed information of a country or countries, it makes API calls to get the vaccination progress of the country and also the most current general information of that country. 
* World
    * This is the MAIN component of the World section, this controls all the Status,WorldMap and CompareCountries components. 
* WorldMap
    * This is probably the most interesting component of all, here I control what is sent to the CountryTable and Circles Components, It is based on a setInterval function to simulate a player, since React-Leaflet does not have that feature developed yet, I had to make my own player, every 200ms the circles on the map will change and new circles will be display the map, the same information is sent to the CountryTable  component so it changes the value of the table. Making the illusion that it is a video  but it is not. 