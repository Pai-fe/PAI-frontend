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
    const id = location.state.id;
    const [maxValue, setMaxValue] = useState(location.state.question.QuestionAnswers[0]?.Answer?.AnswerText)
    //console.log(location.state.question.QuestionAnswers[0].Answer.AnswerText)
    const [type, setType] = useState(location.state.question.QuestionType);
    console.log("TYpe", type)

    
    
    const onSetText = (event) => {
      setText(event.target.value);
    }

    const onChangeAnswer = (event) =>{
      setCurrent(event.target.value)
    }

    function getIndexAnswer(value, arr) {
      for(var i = 0; i < arr.length; i++) {
          if(arr[i].AnswerId === value) {
              return i;
          }
      }
      return -1; //to handle the case where the value doesn't exist
  }

  const onChangeValue = (event) =>{
    setMaxValue(event.target.value);
  }

  

  const onClickEditScale = async (event)=>{
    await axiosHelperCall('DELETE', `https://si-projekat2.herokuapp.com/api/answer/`+answers[0].AnswerId, {
      
        }, {}).then(async ()=>{
    try{
      const { data, status } = await axiosHelperCall('POST', `https://si-projekat2.herokuapp.com/api/answer`, {
        QuestionId : location.state.question.QuestionId,
        Answer:{
          AnswerText: maxValue,
          IsAPicture: false
        }
      }, {});
      if(status === 200) {
        swal({
          title: "Success!",
          text: "You have successfully added a new answer.",
          icon: "success"
        }).then(async value => {
          try{
            const { data, status } = await axiosHelperCall('PUT', `https://si-projekat2.herokuapp.com/api/question/`+location.state.question.QuestionId, {
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
        });
      }
    } catch(e){
      console.log('TAG-ERROR','FAILED REQUEST AT QuestionEditView.jsx');
    }
  })
  }

  //RUTA ZA BRISANJE NIJE JOS NAPRAVLJENA ALI KADA BUDE RADIT CE OVAJ POST
    const onDeleteAnswer = async (a) => {
      try{
        const { data, status } = await axiosHelperCall('DELETE', `https://si-projekat2.herokuapp.com/api/answer/`+a.AnswerId, {
          AnswerId : a.AnswerId
        }, {});
        if(status === 200) {
          swal({
            title: "Success!",
            text: "You have successfully deleted an answer.",
            icon: "success"
          }).then(value => {
            console.log(a)
            var array = [...answers]; // make a separate copy of the array
            let elementPlace = getIndexAnswer(a.AnswerId, array);
            array.splice(elementPlace, 1);
            setAnswers(array);
          });
        }
      } catch(e){
        console.log('TAG-ERROR','FAILED REQUEST AT QuestionEditView.jsx');
      }
    }

    const onClickAdd = async (event) =>{
      try{
        const { data, status } = await axiosHelperCall('POST', `https://si-projekat2.herokuapp.com/api/answer`, {
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
        const { data, status } = await axiosHelperCall('PUT', `https://si-projekat2.herokuapp.com/api/question/`+location.state.question.QuestionId, {
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
                                    onClick={() => onDeleteAnswer(a)}
                                ><FaTrash/></button></td>)}
                            </tr>
                            ))}
              </tbody>
            </table>
      </div>}

      {/* {(location.state.question.QuestionType=="Text") && <div> 
      <label className='fa-label'>Add answer</label>
      <InputComponent 
        type="text"
        value = {current}
        onChange={onChangeAnswer}
      />
      </div>} */}

      {(location.state.question.QuestionType=="Scale") && <div> 
      <label className='fa-label'>Max value</label>
      <InputComponent className='create-fa-button'
          type='number'
          value = {maxValue}
          onChange = {onChangeValue}
      />
      </div>}

      {type!="Scale" && <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickEdit}
          value='EDIT QUESTION'
      />} 

{type=="Scale" && <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickEditScale}
          value='EDIT SCALE'
      />} 

  </div>  );


     
}

export default QuestionEditView;
