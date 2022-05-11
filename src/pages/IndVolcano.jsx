import React from "react";
import { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
let query = ""
import  {AuthMapChart}  from "../components/AuthMapChart";



// 
function Headline(props) {
  //console.log(props)
  const { volcano } = props;
  //const {isAuthenticated} = props.isAuthenticated
  let token = localStorage.getItem("token")

  //console.log(volcano)
  if(token != null){
    const { name, country, region, subregion, last_eruption, summit, elevation, latitude, longitude, population_5km, population_10km, population_30km, population_100km } = volcano
    return (
      <div className="Headline">
        <h2>Name: {name}</h2>
        <h2>country:{country}</h2>
        <h2>region:{region}</h2>
        <h2>subregion:{subregion}</h2>
        <h2>:last_eruption{last_eruption}</h2>
        <h2>summit:{summit}</h2>
        <h2>elevation:{elevation}</h2>
        <h2>latitude:{latitude}</h2>
        <h2>longitude:{longitude}</h2>
        <h2>population_5km: {population_5km}</h2>
        <h2>population_10km: {population_10km}</h2>
        <h2>population_30km: {population_30km}</h2>
        <h2>population_100km: {population_100km}</h2>
      </div>
    );
  }
  else{
    const { name, country, region, subregion, last_eruption, summit, elevation, latitude, longitude } = volcano
    return (
      <div className="Headline">
        <h2>Name: {name}</h2>
        <h2>country:{country}</h2>
        <h2>region:{region}</h2>
        <h2>subregion:{subregion}</h2>
        <h2>:last_eruption{last_eruption}</h2>
        <h2>summit:{summit}</h2>
        <h2>elevation:{elevation}</h2>
        <h2>latitude:{latitude}</h2>
        <h2>longitude:{longitude}</h2>
      </div>
    );
  }
}
//https://www.codegrepper.com/code-examples/javascript/react+setstate+in+another+component
export default function IndVolcano({ id }) {
  const { loading, volcano, error } = useVolcano(id);
  console.log('volcano before passing into authmapchart', volcano)
  let token = localStorage.getItem("token")
  return (
    <div>
      {!loading ? <Headline volcano={volcano} /> : null}
      {!loading ? <AuthMapChart volcano={volcano}/> : null}
    </div>
  )
}


//-------------------------------------API CODE BELOW 

function useVolcano(id) {
  const [loading, setLoading] = useState(true);
  const [volcano, setVolcano] = useState([]);
  useEffect(() => {
    getForecastByQuery(id).then((data) => {
      setVolcano(data);
      //console.log(data)
      setLoading(false);
    });
  }, [id]);//maybe need id end point in dependency? idk

  return {
    loading,
    volcano,
    error: null
  };
}

function getForecastByQuery(q) {
  let token = localStorage.getItem("token")
  if(token != undefined){
    const url = 'http://sefdb02.qut.edu.au:3001/volcano/' + q;
    const token = localStorage.getItem("token")
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
    return fetch(url, {headers})//'http://sefdb02.qut.edu.au:3001/volcano/423'
    .then((res) => res.json())
    .then((data) =>
    ({
      name: data.name,
      country: data.country,
      region: data.region,
      subregion: data.subregion,
      last_eruption: data.last_eruption,
      summit: data.summit,
      elevation: data.elevation,
      latitude: data.latitude,
      longitude: data.longitude,
      population_5km: data.population_5km,
      population_10km: data.population_10km,
      population_30km: data.population_30km,
      population_100km: data.population_100km,
    }))   
  }
  else{
    return fetch('http://sefdb02.qut.edu.au:3001/volcano/' + q)//'http://sefdb02.qut.edu.au:3001/volcano/423'
    .then((res) => res.json())
    .then((data) =>
    ({
      name: data.name,
      country: data.country,
      region: data.region,
      subregion: data.subregion,
      last_eruption: data.last_eruption,
      summit: data.summit,
      elevation: data.elevation,
      latitude: data.latitude,
      longitude: data.longitude
    }))
  }

}

