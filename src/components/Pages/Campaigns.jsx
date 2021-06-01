import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

//Store
import { useDispatch, useSelector } from 'react-redux';
import { setCamp, setCamps } from '../../redux/actions/campsActions';

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

import swal from "sweetalert";



const Campaigns = () => {
    const [campaigns, setCampaigns]  = React.useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state?.userInfo?.user);
    const camps = useSelector(state => state?.camps?.list);


    const onLoad = async() => {
        try{
            const { data, status } = await axiosHelperCall('GET', `https://si-projekat2.herokuapp.com/api/campaign/all`, {}, {});
            if(status !== 200) throw new Error();
            
            console.log("data", data);
            setCampaigns(data);
            
        }catch(e){
            console.log('TAG-ERROR','FAILED REQUEST AT FAs.jsx');
        }
      }

      // const onLoad2 = async()=>{
      //   try{
      //     const { data, status } = await axiosHelperCall('GET', `${CONFIG.APP_URL}/faDefinition/all`, {}, {});
      //     if(status !== 200) throw new Error();
      //     console.log("data", data);
      //     //setCampaigns(data);
          
      // }catch(e){
      //     console.log('TAG-ERROR','FAILED REQUEST AT FAs.jsx');
      // }
      // }

      useEffect(()=>{
        onLoad();
        //onLoad2();
      }, []);

      const onEditCampaign = async(camp) => {
        //dispatch(setFA(fa));
        console.log(camp)
        setTimeout(()=>{
          history.push(routes.CAMP_EDIT_VIEW.replace(':id', camp.CamapignId))
        }, 1000)
      }

      const onDeleteCamp = async (camp)=>{
        try{
          const { data, status } = await axiosHelperCall('DELETE', `https://si-projekat2.herokuapp.com/api/campaign/delete/`+camp.CamapignId, {}, {});
          if(status === 200) {
            swal({
              title: "Success!",
              text: "You have successfully deleted a campaign.",
              icon: "success"
            }).then(value => {
              onLoad();
            });
          }
      }catch(e){
          console.log('TAG-ERROR','FAILED REQUEST AT FAs.jsx');
      }
      }

      return ( 
        <div className='fa-list-view'>
          <table className="table">
            <thead className="thead-dark">
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Start date</th>
                <th>End date</th>
                {currentUser?.uloga === "Admin" && (<th>Edit</th>)}
                {currentUser?.uloga === "Admin" && (<th>Delete</th>)}
                </tr>
            </thead>
            <tbody>
                {campaigns.map(camp => (
                    <tr key={camp?.CamapignId}>
                        <td>{camp?.CamapignId}</td>
                        <td>{camp?.Name}</td>
                        <td>{camp?.StartDate}</td>
                        <td>{camp?.EndDate}</td>
                        {currentUser?.uloga === "Admin" && (<td>
                            <button 
                                className='btn btn-link'
                                onClick={() => onEditCampaign(camp)}
                            >
                        <FaEdit/></button></td>)}
                            {currentUser?.uloga === "Admin" && (<td><button 
                            className='btn btn-link'
                            onClick={() => onDeleteCamp(camp)}
                        >
                        <FaTrash/></button></td>)}
                    </tr>
                ))}
              </tbody>
          </table>
          {currentUser?.uloga === "Admin" && 
          (<button 
              className='btn btn-success'
              onClick={() => {console.log("Tusam");history.push(routes.CampaignCreateView)}}
            >
              <FaPlus/>CREATE NEW CAMPAIGN</button>)}
        </div>
      );
}

export default Campaigns;