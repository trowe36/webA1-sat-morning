import React from "react";
//goal of class. Show map bas

import { Map, Marker } from "pigeon-maps"
import {useState} from "react";
import { useEffect } from "react";
import {Bar} from 'react-chartjs-2'

export function AuthMapChart(props) {
  //exampl is japan abu volcano
  const { volcano } = props;
  //const { name, country, region, subregion, last_eruption, summit, elevation, latitude, longitude} = volcano
  const { latitude, longitude, population_5km, population_10km, population_30km, population_100km } = volcano
  console.log('props in authmap chart', latitude)
    const token = localStorage.getItem("token")

    //console.log("token in authmapchart : " + token)

    if(token !== null && token !== undefined){
      console.log('pop 100km : ' + population_100km)
      return (
        <div>
          <h1>hello AUTHENTICATED MAP AND CHART</h1>
          <MyMap latitude = {latitude} longitude = {longitude}/>
          <MyChart pop5km={population_5km} pop10km={population_10km} pop30km={population_30km} pop100km={population_100km}/>
        </div>     
      );
    }
    else {
      return (
        <div>
          <h1>Hello from NON AUTHENTICATION MAP ONLY</h1>
          <MyMap latitude = {latitude} longitude = {longitude}/>
        </div>     
      );  
    }



  }


  
  export function MyMap(props) {
    const [center, setCenter] = useState([Number(props.latitude), Number(props.longitude)])
    const [zoom, setZoom] = useState(11)

    //everytime ID changes state, long/lat coords in myMap(props) will change. Update the map everytime this happens. 
    useEffect(() => {
    setCenter([Number(props.latitude), Number(props.longitude)])
      // Runs after EVERY rendering
    }, [props]);  

    return (
      <Map 
        height={300}
        center={center} 
        zoom={zoom} 
        //not sure if line below is needed
        onBoundsChanged={({ center, zoom }) => { 
          setCenter(center) 
          setZoom(zoom)         
        }} 
      >
        <Marker>
          width={50}
          anchor={center} 
        </Marker>
      </Map>
    )
  }

export function MyChart(props) {
  console.log('props data population 5km  ', props.pop5km)

  console.log('props data population 10km   ', props.pop10km)//these print correctly 
  //console.log('props data population 20km   ', props.pop20km)
  console.log('props data population 30km   ', props.pop30km)
  console.log('props data population 100km  ', props.pop100km)

  const [km5, setkm5] = useState(0)
  const [km10, setkm10] = useState(0)
  const [km30, setkm30] = useState(0)
  const [km100, setkm100] = useState(0)

  useEffect(() => {
    setkm5(Number(props.pop5km))
    setkm10(Number(props.pop10km))
    setkm30(Number(props.pop30km))
    setkm100(Number(props.pop100km))
      // Runs after EVERY rendering
    }, [props]);  

  //dont use state name as variable
  const state = {
    labels: ['5km', '10km', '30km',
             '100km'],
    datasets: [
      {
        label: 'Population Density',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [km5, km10, km30, km100]
      }
    ]
  }
  return(
    <div>
      <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Population Density',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
    </div>
  )
}