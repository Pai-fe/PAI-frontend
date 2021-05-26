import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import swal from "sweetalert";

import { axiosHelperCall } from "../../helpers/axios.helper";
import { CONFIG } from "../../helpers/config";

import { routes } from "../AppRouter/RoutesList";

import InputComponent from "../Inputs/InputComponent";
import GeoMap from "../Map/Map";

import './FACreateView.css'

const optionsList = [
  {
    value: "Admin",
    text: "Admin"
  },
  {
    value: "User",
    text: "User"
  },
];

const FAEditView = () => {
  let { id } = useParams();
  console.log('testbest molim', id);
  const fa = useSelector(state => state.fas.fa);
  console.log('testbest molim te', fa);

  const history = useHistory();

  const [latitude, setLatitude] = useState(fa.geotag[0]);
  const [longitude, setLongitude] = useState(fa.geotag[1]);
  const [name, setName] = useState(fa.naziv);
  const [tag, setTag] = useState(fa.tag);

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
      const { data, status } = await axiosHelperCall('PUT', `${CONFIG.APP_URL}/faDefinition/edit`, {
        id: fa.id,
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
          value='EDIT'
      />
    </div>
  );
}

export default FAEditView;
