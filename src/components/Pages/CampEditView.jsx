import React, { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useHistory, useParams } from "react-router";
import swal from "sweetalert";

import { axiosHelperCall } from "../../helpers/axios.helper";
import { CONFIG } from "../../helpers/config";

import { routes } from "../AppRouter/RoutesList";

import InputComponent from "../Inputs/InputComponent";
import GeoMap from "../Map/Map";

import './FACreateView.css'

import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

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

const CampEditView = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state?.userInfo?.user);
  let { id } = useParams();
  const [campaign, setCampaign] = useState();
  const [name, setName] = useState("")
  console.log('testbest molim', id);
  const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [questions, setQuestions] = useState([/*{text:"Da li je ovo pitanje ok",type:"Single",answers:["asim1", 'asim2']}, {text:"Pitanje2", type:"Single",answers:["asim3", "asim4"]}*/]);
  //console.log('testbest molim te', fa);


  const onLoad = async() => {
    try{
        const { data, status } = await axiosHelperCall('GET', `https://si-main-server.herokuapp.com/api/campaign/`+id, {}, {});
        if(status !== 200) throw new Error();
        console.log("data", data);
        //dispatch(setCamps(data));
        //console.log("fasica", camps)
        setCampaign(data);
        setName(data.Name)
        setStartDate(data.StartDate.substring(0,10))
        setEndDate(data.EndDate.substring(0,10));
        setQuestions(data.Questions);
    } catch(e){
        console.log('TAG-ERROR','FAILED REQUEST AT Camps.jsx');
    }
  }

  const onSetStartDate = (event) => {
    let start = event.target.value;
    const [year, month, day] =  start.split('-')
    start = day + "-" + month + "-" + year;
      setStartDate(start);
}

const onSetEndDate = (event) => {
  let start = event.target.value;
    const [year, month, day] =  start.split('-')
    start = day + "-" + month + "-" + year;
      setEndDate(start);
}

  useEffect(()=>{
    onLoad();
  }, []);




  const onSetName = (event) => {
    setName(event.target)
  }

  const onEditQuestion = (q) =>{
    console.log(q)
    setTimeout(()=>{
      history.push({
            pathname :routes.QUESTION_EDIT_VIEW,
            state: {question:q, id:id}
        })
    }, 1000)      
  }

//   const onSetLongitude = (event) => {
//     //
//   }

//   const onSetName = (event) => {
//     setName(event.target.value);
//   }

//   const onSetTag = (event) => {
//     setTag(event.target.value);
//   }

//   const onClickCreate = async() => {
//     try{
//       const { data, status } = await axiosHelperCall('PUT', `${CONFIG.APP_URL}/faDefinition/edit`, {
//         id: fa.id,
//         naziv: name,
//         geotag: `${latitude},${longitude}`,
//         tag: tag
//       }, {});
//       if(status === 200) {
//         swal({
//           title: "Success!",
//           text: "You have successfully added a new Feedback application definition.",
//           icon: "success"
//         }).then(value => {
//           history.push(routes.FA_LIST_VIEW);
//         });
//       }
//     } catch(e){
//       console.log('TAG-ERROR','FAILED REQUEST AT CreateUser.jsx');
//     }
//   }

  return(
     <div className = 'create-fa-container'>
       <h1>Edit</h1>
       <label className='fa-label'>Campaign name</label>
       <InputComponent 
        type="text"
        value={name}
        onChange={onSetName}
      />
      <label className='fa-label'>Start Date</label>
       <InputComponent 
        type="date"
        value={startDate}
        onChange={onSetStartDate}
      />
      <label className='fa-label'>End Date</label>
       <InputComponent 
        type="date"
        value={endDate}
        onChange={onSetEndDate}
      />
      <br/>
<table className="table">
            <thead className="thead-dark">
                <tr>
                <th>ID</th>
                <th>Question Text</th>
                <th>Question Style</th>
                {currentUser?.uloga === "Admin" && (<th>Edit</th>)}
                {currentUser?.uloga === "Admin" && (<th>Delete</th>)}
                </tr>
            </thead>
            <tbody>
                            {questions.map(q => (
                                <tr key={q?.QuestionId}>
                                <td>{q?.QuestionId}</td>
                                <td>{q?.QuestionText}</td>
                                <td>{q?.QuestionType}</td>
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    onClick={() => onEditQuestion(q)}
                                ><FaEdit/></button></td>)}
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    //onClick={() => onDeleteFA(fa)}
                                ><FaTrash/></button></td>)}
                            </tr>
                            ))}
          {}
              </tbody>
          </table>
     </div>  );
}

export default CampEditView;
