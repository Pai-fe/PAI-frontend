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



const Campaigns = () => {
    const [campaigns, setCampaigns]  = React.useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state?.userInfo?.user);
    const camps = useSelector(state => state?.camps?.list);

    const onLoad = async() => {
        try{
            const { data, status } = await axiosHelperCall('GET', `https://si-main-server.herokuapp.com/api/campaigns/get`, {}, {});
            if(status !== 200) throw new Error();
            console.log("data", data);
            setCampaigns(data);
        } catch(e){
            console.log('TAG-ERROR','FAILED REQUEST AT FAs.jsx');
        }
      }

      useEffect(()=>{
        onLoad();
      }, []);

      const onEditCampaign = async(camp) => {
        //dispatch(setFA(fa));
        console.log(camp)
        setTimeout(()=>{
          history.push(routes.CAMP_EDIT_VIEW.replace(':id', camp.CamapignId))
        }, 1000)
      }

      const onDeleteCamp = async (camp)=>{
          
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
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    onClick={() => onEditCampaign(camp)}
                                ><FaEdit/></button></td>)}
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    onClick={() => onDeleteCamp(camp)}
                                ><FaTrash/></button></td>)}
                            </tr>
                            ))}
          {}
              </tbody>
          </table>
          {currentUser?.uloga === "Admin" && (<button 
              className='btn btn-success'
              onClick={() => {console.log("Tusam");history.push(routes.CampaignCreateView)}}
          ><FaPlus/>CREATE NEW CAMPAIGN</button>)}
        </div>
      );
}

export default Campaigns;