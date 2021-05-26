import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

//Store
import { useDispatch, useSelector } from 'react-redux';
import { setFAs } from '../../redux/actions/fasActions';

//Request
import { axiosHelperCall } from '../../helpers/axios.helper';
import { CONFIG } from '../../helpers/config';

// Components
import InputComponent from '../Inputs/InputComponent';

//Routes
import { routes } from '../AppRouter/RoutesList';

const FAListView = ({ onEditClick, onDeleteClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state?.userInfo?.user);
  const fas = useSelector(state => state?.fas?.list);

  const onLoad = async() => {
    try{
        const { data, status } = await axiosHelperCall('GET', `${CONFIG.APP_URL}/faDefinition/all`, {}, {});
        if(status !== 200) throw new Error();
        dispatch(setFAs(data));
    } catch(e){
        console.log('TAG-ERROR','FAILED REQUEST AT FAs.jsx');
    }
  }

  const onDeleteFA = async(fa) => {
    try{
      const { data, status } = await axiosHelperCall('DELETE', `${CONFIG.APP_URL}/faDefinition/delete`, {
          id: fa?.id
      }, {});
      onLoad();
    } catch(e) {
        console.log('TAG-ERROR','FAILED REQUEST AT Users.jsx');
    }
  }
  
  useEffect(()=>{
    onLoad();
  }, []);

  return (
    <div>
      {fas.map(fa => (
        <div key={fa?.id} style={{ width: '100%',  display: 'flex', flexDirection: 'row' }}>
          <p style={{ marginRight: '30px' }}>Id:</p>
          <p style={{ marginRight: '30px' }}>{fa?.id} </p>
          <p style={{ marginRight: '30px' }}>GEO-TAG: (lat, lng)</p>
          <p style={{ marginRight: '30px' }}>{fa?.geotag[0]} | {fa?.geotag[1]}</p>
          <p style={{ marginRight: '30px' }}>Name:</p>
          <p style={{ marginRight: '30px' }}>{fa?.naziv} </p>
          <p style={{ marginRight: '30px' }}>Tag:</p>
          <p style={{ marginRight: '30px' }}>{fa?.tag} </p>
          {currentUser?.uloga === "Admin" && (<InputComponent 
              type='button'
              onClick={() => history.push(routes.FA_EDIT_VIEW)}
              value='EDIT FA'
          />)}
          {currentUser?.uloga === "Admin" && (<InputComponent 
              type='button'
              onClick={() => onDeleteFA(fa)}
              value='DELETE FA'
          />)}
        </div>
      ))}
      <InputComponent 
          type='button'
          onClick={() => history.push(routes.FA_CREATE_VIEW)}
          value='CREATE NEW FA'
      />
    </div>
  );
}

export default FAListView;