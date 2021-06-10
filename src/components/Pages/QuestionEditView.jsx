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
  const imageToBase64 = require('image-to-base64');
  const location=useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state?.userInfo?.user);
    console.log("location", location.state)
    const [text, setText] = useState(location.state.question.QuestionText)
    const [current, setCurrent] = useState("");
    const [answers, setAnswers] = useState(location.state.question.QuestionAnswers);
    const id = location.state.id;
    const [maxValue, setMaxValue] = useState(location.state.question.QuestionAnswers[0]?.Answer?.AnswerText.split("-")[1])
    const [minValue, setMinValue] = useState(location.state.question.QuestionAnswers[0]?.Answer?.AnswerText.split("-")[0])
    //console.log(location.state.question.QuestionAnswers[0].Answer.AnswerText)
    const [type, setType] = useState(location.state.question.QuestionType);
    const [picture, setPicture] = useState(false);
    const [url, setUrl] = useState("");
    const [url2, setUrl2] = useState("");
    const [prikaz, setPrikaz] = useState(true);
    

    
    
    const onSetText = (event) => {
      setText(event.target.value);
    }

    const onChangeAnswer = (event) =>{
      setCurrent(event.target.value)
    }

    const onChangeUrl = (event) => {
      setUrl(event.target.value)
      
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

  const onChangeValue2 = (event) =>{
    setMinValue(event.target.value);
  }

  const checkBoxNesto = (e) => {
    if(e.target.value=="No Picture")
      setPicture(false)
    else if (e.target.value=="Picture")
      setPicture(true);
  }
  

  const onClickEditScale = async (event)=>{
    let max = maxValue
    let min = minValue
    if(max=="")
      max="0"
    if(min=="")
      min="0"  
    await axiosHelperCall('DELETE', `https://si-projekat2.herokuapp.com/api/answer/`+answers[0].AnswerId, {
      
        }, {}).then(async ()=>{
    try{
      const { data, status } = await axiosHelperCall('POST', `https://si-projekat2.herokuapp.com/api/answer`, {
        QuestionId : location.state.question.QuestionId,
        Answer:{
          AnswerText: min+"-"+max,
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
        const { data, status } = await axiosHelperCall('DELETE', `https://si-projekat2.herokuapp.com/api/answer/`+a.Answer.AnswerId, {
          AnswerId : a.Answer.AnswerId
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

    async function toDataUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
  }

    const onClickCheck = (event) => {
      
      toDataUrl(url, function(myBase64) {
        setUrl2(myBase64.split(",")[1]) // myBase64 is the base64 string
        //console.log(myBase64)
    });
    setPrikaz(true);

      
    }

    const onSelectFile = (event) =>{
      //onSelectFile(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          
          reader.readAsDataURL(event.target.files[0]); // read file as data url

          reader.onload = (event) => { // called once readAsDataURL is completed
            setUrl2(event.target.result.split(",")[1]);
            setUrl(event.target.result)
            
          }
        }
    //}
    }

    const onClickAdd = async (event) =>{
        console.log(picture)
   
        let odgovor = {AnswerText: current,
          IsAPicture: picture,
        Base64: url2}
        console.log("odgovor", odgovor)
      try{
        const { data, status } = await axiosHelperCall('POST', `https://si-projekat2.herokuapp.com/api/answer`, {
          QuestionId : location.state.question.QuestionId,
          Answer:odgovor
        }, {})
        
        if(status === 200) {
          swal({
            title: "Success!",
            text: "You have successfully added a new answer.",
            icon: "success"
          }).then(value => {
            console.log("data", data)
            let newAnswer = {
              Answer : {
                AnswerId: data.AnswerId,
                AnswerText : current,
                IsAPicture:picture,
                Base64: url2}
            }
            setAnswers([...answers, newAnswer])
            setCurrent("");
            console.log(answers)
          });
        //   .then(value => {
        //     console.log("answers", answers)
        //      console.log("value", value)
        //       // let newAnswer = {
        //       //   AnswerId: value.data.AnswerId,
        //       //     AnswerText : current,
        //       //             IsAPicture: picture,
        //       //           Base64: url2}
        //       // console.log(newAnswer)
        //       // setAnswers([...answers, newAnswer])
        //       // setCurrent("");
        //       // console.log(answers)
        //  });
        }
      } catch(e){
        console.log('TAG-ERROR','FAILED REQUEST AT QuestionEditView.jsx');
      }
      setUrl2("")
      //setUrl("")
      setPicture(false)
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
      <select class="form-select" style={{width: "30%", marginTop: "25px", marginLeft: "25px"}} aria-label="Question select" defaultValue="Choose" onChange={checkBoxNesto}>
            <option>No Picture</option>
            <option>Picture</option>
        </select>
        {picture && <div> 
          <img src={url} height="200"/> <br/>
    <input type='file' onChange={onSelectFile}/>

      
      
      {/* {prikaz && <div><img src={`${url}`} height="65" style={{ alignSelf: 'center' }}/> {url}</div>} */}
      </div>}
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAdd}
          value='ADD ANSWER'
      /> 
      <label className='fa-label'>Answers</label>
      <table>
            <tbody>
                            {answers.map(a => (
                                <tr key={a.Answer.AnswerId}>
                                <td>{a.Answer.AnswerText}</td>
                                
                                {a.Answer.Base64&& <td><img src={`data:image/jpeg;base64,${a.Answer?.Base64}`} height="65" /></td>}
                                {/* <td>{"data:image/png;base64," + a.Answer?.Base64}</td> */}
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
      <label className='fa-label'>Min value</label>
      <InputComponent className='create-fa-button'
          type='number'
          value = {minValue}
          onChange = {onChangeValue2}
      /> 
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
