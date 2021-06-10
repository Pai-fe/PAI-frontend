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

import { FaTrash, FaEdit, FaPlus, FaFileExport } from 'react-icons/fa';

import swal from "sweetalert";



const Campaigns = () => {
    const [campaigns, setCampaigns] = React.useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state?.userInfo?.user);
    const camps = useSelector(state => state?.camps?.list);
    const [search, setSearch] = useState("")

    const sortiraj = (e) => {
        if(e.target.value == "ID Ascending"){
            let clone = []
            clone = [...campaigns]
            clone = clone.sort((a,b) => a.CamapignId>b.CamapignId ? 1 : -1)  
            setCampaigns(clone)
        }
        else if (e.target.value =="ID Descending"){
        let clone = []
        clone = [...campaigns]
        clone = clone.sort((a,b) => a.CamapignId>b.CamapignId ? -1 : 1)  
        setCampaigns(clone)
        }
    }


    const onLoad = async () => {
        try {
            const {
                data,
                status
            } = await axiosHelperCall('GET', `https://si-projekat2.herokuapp.com/api/campaign/all`, {}, {});
            if (status !== 200) throw new Error();

            console.log("data", data);
            data.sort((a,b) => a.CamapignId>b.CamapignId ? 1 : -1)
            console.log("data", data);
            setCampaigns(data);

        } catch (e) {
            console.log('TAG-ERROR', 'FAILED REQUEST AT FAs.jsx');
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

    useEffect(() => {
        onLoad();
        //onLoad2();
    }, []);

    const onExportCampaign = (camp) => {
        history.push(routes.CreateCampaignReport.replace(':id', camp.CamapignId))
    }

    const onSetSearch = (e) => {
        setSearch(e.target.value);
    }

    const onEditCampaign = async (camp) => {
        //dispatch(setFA(fa));
        console.log(camp)
        setTimeout(() => {
            history.push(routes.CAMP_EDIT_VIEW.replace(':id', camp.CamapignId))
        }, 1000)
    }

    const onDeleteCamp = async (camp) => {
        try {
            const {
                data,
                status
            } = await axiosHelperCall('DELETE', `https://si-projekat2.herokuapp.com/api/campaign/delete/` + camp.CamapignId, {}, {});
            if (status === 200) {
                swal({
                    title: "Success!",
                    text: "You have successfully deleted a campaign.",
                    icon: "success"
                }).then(value => {
                    onLoad();
                });
            }
        } catch (e) {
            console.log('TAG-ERROR', 'FAILED REQUEST AT FAs.jsx');
        }
    }

    return (
        <div>
            <label className='fa-label'>Sort by </label>
        <select class="form-select" style={{width: "30%", marginTop: "25px", marginLeft: "25px"}} aria-label="Question select" defaultValue="Choose" onChange={sortiraj}>
            <option>ID Ascending</option>
            <option>ID Descending</option>
        </select>
        <label className='fa-label'>Search</label>
      <InputComponent 
        type="text"
        value={search}
        onChange={onSetSearch}
      />
        <div className='fa-list-view'>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Start date</th>
                    <th>End date</th>
                    {currentUser?.uloga === "Admin" && (<th>Report</th>)}
                    {currentUser?.uloga === "Admin" && (<th>Edit</th>)}
                    {currentUser?.uloga === "Admin" && (<th>Delete</th>)}
                </tr>
                </thead>
                <tbody>
                {campaigns.filter(camp=>camp.Name.includes(search)).map(camp => (
                    <tr key={camp?.CamapignId}>
                        <td>{camp?.CamapignId}</td>
                        <td>{camp?.Name}</td>
                        <td>{camp?.StartDate.substring(0,10)}</td>
                        <td>{camp?.EndDate.substring(0,10)}</td>
                        {currentUser?.uloga === "Admin" && (
                            <td>
                                <button
                                    className='btn btn-link'
                                    onClick={() => onExportCampaign(camp)}>
                                    <FaFileExport/>
                                </button>
                            </td>
                        )}
                        {currentUser?.uloga === "Admin" && (<td>
                                <button
                                    className='btn btn-link'
                                    onClick={() => onEditCampaign(camp)}>
                                    <FaEdit/>
                                </button>
                            </td>
                        )}
                        {currentUser?.uloga === "Admin" && (<td>
                            <button
                                className='btn btn-link'
                                onClick={() => onDeleteCamp(camp)}>
                                <FaTrash/>
                            </button>
                        </td>)}
                    </tr>
                ))}
                </tbody>
            </table>
            {currentUser?.uloga === "Admin" &&
            (<button
                className='btn btn-success'
                onClick={() => {
                    console.log("Tusam");
                    history.push(routes.CampaignCreateView)
                }}
            >
                <FaPlus/>CREATE NEW CAMPAIGN</button>)}
        </div>
        </div>
    );
}

export default Campaigns;