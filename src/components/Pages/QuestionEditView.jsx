import React, { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { useHistory, useParams } from "react-router";
import { useLocation } from "react-router-dom";
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

const QuestionEditView = () => {
  const location=useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state?.userInfo?.user);
    console.log("location", location.state)
    const [text, setText] = useState(location.state.question.QuestionText)
    const [current, setCurrent] = useState("");
    const [answers, setAnswers] = useState(location.state.question.QuestionAnswers);
    
    const onSetText = (event) => {
      setText(event.target.value);
    }

    const onChangeAnswer = (event) =>{
      setCurrent(event.target.value)
    }

    const onClickAdd = async (event) =>{
      try{
        const { data, status } = await axiosHelperCall('POST', `https://si-main-server.herokuapp.com/api/answer/add`, {
          QuestionId : location.state.question.QuestionId,
          Answer:{
            AnswerText: current,
            IsAPicture: false
          }
        }, {});
        if(status === 200) {
          swal({
            title: "Success!",
            text: "You have successfully added a new answer.",
            icon: "success"
          }).then(value => {
            let newAnswer = {
              Answer : {AnswerText : current}
            }
            setAnswers([...answers, newAnswer])
            setCurrent("");
            console.log(answers)
          });
        }
      } catch(e){
        console.log('TAG-ERROR','FAILED REQUEST AT QuestionEditView.jsx');
      }
      
    }

    const onClickEdit = async (event) =>{
      try{
        const { data, status } = await axiosHelperCall('POST', `https://si-main-server.herokuapp.com/api/question/edit`, {
          QuestionId : location.state.question.QuestionId,
          QuestionType: location.state.question.QuestionType,
          QuestionText: text,
          IsDependent: false,
          CampaignId:location.state.id.id
        }, {});
        if(status === 200) {
          swal({
            title: "Success!",
            text: "You have successfully edited a question.",
            icon: "success"
          }).then(value => {
            history.goBack();
          });
        }
      } catch(e){
        console.log('TAG-ERROR','FAILED REQUEST AT QuestionEditView.jsx');
      }
      
    }

  return(<div className = 'create-fa-container'>
     <h1>Edit Question</h1>
       <label className='fa-label'>Question text</label>
       <InputComponent 
       type="text"
       value={text}
       onChange={onSetText}
   />
   <InputComponent 
       type="text"
       disabled
       value={location.state.question.QuestionType}
   />

{(location.state.question.QuestionType=="Single" || location.state.question.QuestionType=="Multiple") && <div> 
      <label className='fa-label'>Add answer</label>
      <InputComponent 
        type="text"
        value = {current}
        onChange={onChangeAnswer}
      />
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAdd}
          value='ADD ANSWER'
      /> 
      <label className='fa-label'>Answers</label>
      <table>
            <tbody>
                            {answers.map(a => (
                                <tr key={a.AnswerId}>
                                <td>{a.Answer.AnswerText}</td>
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    //onClick={() => onEditFa(fa)}
                                ><FaEdit/></button></td>)}
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    //onClick={() => onDeleteFA(fa)}
                                ><FaTrash/></button></td>)}
                            </tr>
                            ))}
              </tbody>
            </table>
      </div>}

      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickEdit}
          value='EDIT QUESTION'
      /> 

  </div>  );
//      <div className = 'create-fa-container'>
//        <h1>Edit</h1>
//        <label className='fa-label'>Campaign name</label>
//        <InputComponent 
//         type="text"
//         value={name}
//         onChange={onSetName}
//       />
//       <label className='fa-label'>Start Date</label>
//        <InputComponent 
//         type="date"
//         value={startDate}
//         onChange={onSetStartDate}
//       />
//       <label className='fa-label'>End Date</label>
//        <InputComponent 
//         type="date"
//         value={endDate}
//         onChange={onSetEndDate}
//       />
//       <br/>
// <table className="table">
//             <thead className="thead-dark">
//                 <tr>
//                 <th>ID</th>
//                 <th>Question Text</th>
//                 <th>Question Style</th>
//                 {currentUser?.uloga === "Admin" && (<th>Edit</th>)}
//                 {currentUser?.uloga === "Admin" && (<th>Delete</th>)}
//                 </tr>
//             </thead>
//             <tbody>
//                             {questions.map(q => (
//                                 <tr key={q?.QuestionId}>
//                                 <td>{q?.QuestionId}</td>
//                                 <td>{q?.QuestionText}</td>
//                                 <td>{q?.QuestionType}</td>
//                                 {currentUser?.uloga === "Admin" && (<td><button 
//                                     className='btn btn-link'
//                                     onClick={() => onEditQuestion(q)}
//                                 ><FaEdit/></button></td>)}
//                                 {currentUser?.uloga === "Admin" && (<td><button 
//                                     className='btn btn-link'
//                                     //onClick={() => onDeleteFA(fa)}
//                                 ><FaTrash/></button></td>)}
//                             </tr>
//                             ))}
//           {}
//               </tbody>
//           </table>


     
}

export default QuestionEditView;
