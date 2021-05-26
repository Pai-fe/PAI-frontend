import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";

import { axiosHelperCall } from "../../helpers/axios.helper";
import { CONFIG } from "../../helpers/config";

import { routes } from "../AppRouter/RoutesList";

import InputComponent from "../Inputs/InputComponent";
import GeoMap from "../Map/Map";

import './FACreateView.css'

const FACreateView = () => {
  const history = useHistory();

  const [latitude, setLatitude] = useState("43.85537342499372");
  const [longitude, setLongitude] = useState("18.40814328393261");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const onSetLatitude = (event) => {
    //
  }

  const onSetLongitude = (event) => {
    //
  }

  const onSetName = (event) => {
    setName(event.target.value);
  }

  const onSetTag = (event) => {
    setTag(event.target.value);
  }

  const onClickCreate = async() => {
    try{
      const { data, status } = await axiosHelperCall('POST', `${CONFIG.APP_URL}/faDefinition/create`, {
        naziv: name,
        geotag: `${latitude},${longitude}`,
        tag: tag
      }, {});
      if(status === 200) {
        swal({
          title: "Success!",
          text: "You have successfully added a new Feedback application definition.",
          icon: "success"
        }).then(value => {
          history.push(routes.FA_LIST_VIEW);
        });
      }
    } catch(e){
      console.log('TAG-ERROR','FAILED REQUEST AT CreateUser.jsx');
    }
  }

  return(
    <div className = 'create-fa-container'>
      <h1>Create new FA definition</h1>
      <label className='fa-label'>FA Latitude</label>
      <InputComponent 
        type="text"
        value={latitude}
        disabled
        onChange={onSetLatitude}
      />
      <label className='fa-label'>FA Longitude</label>
      <InputComponent 
        type="text"
        value={longitude}
        disabled
        onChange={onSetLongitude}
      />
      <label className='fa-label'>FA Name</label>
      <InputComponent 
        type="text"
        value={name}
        onChange={onSetName}
      />
      <label className='fa-label'>FA Tag</label>
      <InputComponent 
        type="text"
        value={tag}
        onChange={onSetTag}
      />
      <label className='fa-label'>Select FA location</label>
      <GeoMap 
        lat={latitude}
        lng={longitude}
        setLat={setLatitude}
        setLng={setLongitude}
      />
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickCreate}
          value='CREATE'
      />
    </div>
  );
}

export default FACreateView;