import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

//Store
import { useDispatch, useSelector } from 'react-redux';
import { setFA, setFAs } from '../../redux/actions/fasActions';

//Request
import { axiosHelperCall } from '../../helpers/axios.helper';
import { CONFIG } from '../../helpers/config';

// Components
import InputComponent from '../Inputs/InputComponent';

//Routes
import { routes } from '../AppRouter/RoutesList';

import './Table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const FAListView = ({ onEditClick, onDeleteClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state?.userInfo?.user);
  const fas = useSelector(state => state?.fas?.list);

  const onLoad = async() => {
    try{
        const { data, status } = await axiosHelperCall('GET', `${CONFIG.APP_URL}/faDefinition/all`, {}, {});
        if(status !== 200) throw new Error();
        console.log("data", data)
        dispatch(setFAs(data));
        console.log("fasica", fas)
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

  const onEditFa = async(fa) => {
    dispatch(setFA(fa));
    setTimeout(()=>{
      history.push(routes.FA_EDIT_VIEW.replace(':id', fa?.id))
    }, 1000)
  }
  
  useEffect(()=>{
    onLoad();
  }, []);
  
  console.log('testbest molim te', );
  return (
    <div className='fa-list-view'>
      <table className="table">
        <thead className="thead-dark">
            <tr>
            <th>ID</th>
            <th>GEO-TAG</th>
            <th>Name</th>
            <th>Tag</th>
            {currentUser?.uloga === "Admin" && (<th>Edit</th>)}
            {currentUser?.uloga === "Admin" && (<th>Delete</th>)}
            </tr>
        </thead>
        <tbody>
                        {fas.map(fa => (
                            <tr key={fa?.id}>
                            <td>{fa?.id}</td>
                            <td>{fa?.geotag[0]} | {fa?.geotag[1]}</td>
                            <td>{fa?.naziv}</td>
                            <td>{fa?.tag}</td>
                            {currentUser?.uloga === "Admin" && (<td><button 
                                className='btn btn-link'
                                onClick={() => onEditFa(fa)}
                            ><FaEdit/></button></td>)}
                            {currentUser?.uloga === "Admin" && (<td><button 
                                className='btn btn-link'
                                onClick={() => onDeleteFA(fa)}
                            ><FaTrash/></button></td>)}
                        </tr>
                        ))}
      {/* {fas.map(fa => (
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
      ))} */}
          </tbody>
      </table>
      {/* <InputComponent 
          type='button'
          onClick={() => history.push(routes.FA_CREATE_VIEW)}
          value='CREATE NEW FA'
      /> */}
      {currentUser?.uloga === "Admin" && (<button 
          className='btn btn-success'
          onClick={() => history.push(routes.FA_CREATE_VIEW)}
      ><FaPlus/>CREATE NEW FA</button>)}
    </div>
  );
}

export default FAListView;