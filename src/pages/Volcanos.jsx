
//import * as React from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css"
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Menu } from "@mui/material";
import { useBetween } from "use-between";
import { useNavigate } from "react-router-dom";
import { GuestMapChart } from "../components/GuestMapChart";
//import {createContext, useContext} from "react"
import { TextField } from "@mui/material";
import { Link } from 'react-router-dom'
import IndVolcano from "./IndVolcano";
import { AuthMapChart } from "../components/AuthMapChart";

//const UserContext = createContext() //global context state 

//https://stackoverflow.com/questions/64920972/how-to-populate-select-dropdown-elements-from-api-data

//https://stackoverflow.com/questions/64920972/how-to-populate-select-dropdown-elements-from-api-data
//this controls state of query link. based on state of dropdown menu country selected
//https://stackoverflow.com/questions/38901106/how-to-make-a-shared-state-between-two-react-components
const useFormState = () => {
  const [rowData, setRowData] = useState([])
  const[country, setCountry] = useState('Australia')
  return {
    rowData, setRowData, country, setCountry
  }
}
// // Make a custom hook for sharing your form state between any components
 const useSharedFormState = () => useBetween(useFormState);

function PopulationWithinDropDown({onSelect}){
  
  const[popWithin, setPopWithin] = useState(0)
  const{rowData, setRowData} = useSharedFormState([]) //need to try and access row data state so that 
  const[populationData, setPopulationData] = useState(['5km', '10km', '30km', '100km'])
  const [countryData, setCountryData] = React.useState([]);
  const {country, setCountry} = useSharedFormState();
  //console.log(rowData)

  const changePopWithinValue = event => {
    setPopWithin(event.target.value)
    onSelect(event.target.value)
    //console.log('population within changed to : ', event.target.value);
  }

  function fetchCountryAndPopulation(){
    console.log('in fetch population, popwithin =  : ' + popWithin + ' and country = ' + country)
    if(popWithin === 0){
      return fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}`, {
        method: "GET", headers: {
          'Accept': 'application/json'
        }
      })
        .then((res) => res.json())
    }
    else{
      return fetch(`http://sefdb02.qut.edu.au:3001/volcanoes?country=${country}&populatedWithin=${popWithin}`, {
      method: "GET", headers: {
        'Accept': 'application/json'
      }
    })
      .then((res) => res.json())
    }   
  }

  useEffect(
    () => {
      fetchCountryAndPopulation().then((data) => setRowData(data));
      console.log(rowData)
     // fetchCountryInfo().then((countryList) => setCountryData(countryList));
    },
    [popWithin, country]
  );

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Population within</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={popWithin}
          label="Age"
          onChange={changePopWithinValue}
        >{populationData.map((item) =>
          <MenuItem key={item} value={item} >{item}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );

}

//then have actual component 
function DropDown({ onSelect }) {
  const [countryData, setCountryData] = React.useState([]);
  // const { country, setCountry } = useSharedFormState()
  const [country, setCountry] = useState('Australia');

  function fetchCountryInfo() {
    return fetch('http://sefdb02.qut.edu.au:3001/countries', {
      method: "GET", headers: {
        'Accept': 'application/json'
      }
    })
      .then((res) => res.json())
  }

  useEffect(
    () => {
      fetchCountryInfo().then((countryList) => setCountryData(countryList));
    },
    []
  );
  const changeCountryValue = event => {
    setCountry(event.target.value)
    onSelect(event.target.value)
    //console.log(queryLink);
    // setQueryLink('http://sefdb02.qut.edu.au:3001/volcanoes?country=' + event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Age"
          onChange={changeCountryValue}
        >{countryData.map((item) =>
          <MenuItem key={item} value={item} >{item}</MenuItem>)}

        </Select>
      </FormControl>
    </Box>
  );
}
//https://stackoverflow.com/questions/62861269/attempted-import-error-usehistory-is-not-exported-from-react-router-dom
function SearchVolcID({ volcId }) { //dpnt use verb name 
  console.log("volcId", volcId)
  const navigate = useNavigate();

  const [state, setState] = useState({ data: "" }) //change state names 

  const handleClick = () => {
    //console.log(volcId)
    setState({ data: volcId });
    //navigate("/indvolcano");
  };
  if (volcId !== 0) {
    return (
      <div>
        {/* <button onClick={handleClick}>
          Go see volcano
        </button> */}
        <IndVolcano id={volcId} />
      </div>

    );
  }
  else {
    <div>
      <button onClick={handleClick}>
        Go see volcano
      </button>

    </div>
  }


}




export default function Volcanos() {
  const {rowData, setRowData} = useSharedFormState([]);
  // const { country, setCountry } = useSharedFormState()
  // const { volcId, setVolcId } = useSharedFormState()
  // const { loggedIn, setLoggedIn } = useSharedFormState()
  const {country, setCountry} = useSharedFormState();
  const [queryLink, setQueryLink] = useState('');
  const [volcId, setVolcId] = useState();
  const [loggedIn, setLoggedIn] = useState(true)
  const[popWithin, setPopWithin] = useState(0)

  const table = {
    columns: [
      { headerName: "Id", field: "id", sortable: true, filter: "agNumberColumnFilter" },
      { headerName: "Name", field: "name", sortable: true, filter: true },
      { headerName: "Country", field: "country", sortable: true, filter: true },
      { headerName: "Region", field: "region", sortable: true, filter: true },
      { headerName: "Subregion", field: "subregion", sortable: true, filter: true }
    ],
  }



  function fetchVolcanoInfo() {
    let fetchLink = 'http://sefdb02.qut.edu.au:3001/volcanoes?country=' + country;
    let acceptHeader = 'volcanoes?country=' + country;
    return fetch(fetchLink, {
      method: "GET", headers: {
        'Accept': acceptHeader
      }
    })
      .then((res) => res.json())
  }
  useEffect(
    () => {
      fetchVolcanoInfo().then((volcanoList) => setRowData(volcanoList));
    },
    [country]
  )

  return (
    <div
      className="ag-theme-balham"
      style={{
        height: "500px",
        width: "1000px"
      }}
    >
      <DropDown onSelect={setCountry} />
      
      <PopulationWithinDropDown onSelect ={setPopWithin} />
      
      <AgGridReact
        columnDefs={table.columns}
        rowData={rowData}
        //onRowClicked = {routeChange}
        pagination={true}
        paginationPageSize={15}
        //onRowSelected = {onRowSelected}
        //onSelectionChanged = {onSelectionChanged}
        onRowClicked={(row) => setVolcId(row.data.id)}
        rowSelection='single'
      />
      {volcId ? <SearchVolcID volcId={volcId} /> : null}
      
    </div>
  );
}

function Map_Chart(props) {
  //get token. if not null or whatever, check logic in login page. This should go in IndVolcano page bcs you will need access to population data
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <AuthMapChart />;
  }
  return <GuestMapChart />;
}
