import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { useDispatch, useSelector } from 'react-redux';
import {useRef} from 'react';

import { axiosHelperCall } from "../../helpers/axios.helper";
import { CONFIG } from "../../helpers/config";

import { routes } from "../AppRouter/RoutesList";

import InputComponent from "../Inputs/InputComponent";
//import GeoMap from "../Map/Map";

import './FACreateView.css'
import './Table.css'

import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const CampaignCreateView = () => {
    const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state?.userInfo?.user);

    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [questions, setQuestions] = useState([]);
    const [add, setAdd] = useState(false);
    const [type, setType] = useState("Single");
    const [text, setText] = useState("");
    const [answers, setAnswers] = useState([])
    const [current, setCurrent] = useState("");
    const [editQuestion, setEditQuestion] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState({});
    const [index, setIndex] = useState(0);
    const [questionToEditText, setQuestionToEditText] = useState("")
    const [questionToEditAnswers, setQuestionToEditAnswers] = useState([])
    const [maxValue, setMaxValue] = useState("0");
    const [minValue, setMinValue] = useState("0");
    const [fas, setFas] = useState([]);
    const [selectedFAs, setSelectedFAs] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [campaigns, setCampaigns] = React.useState([]);
    const [picture, setPicture] = useState(false);
    const [url, setUrl] = useState("");
    const [url2, setUrl2] = useState("");

    const onLoad = async()=>{
        try{
          const { data, status } = await axiosHelperCall('GET', `https://si-projekat2.herokuapp.com/faDefinition/all`, {}, {});
          if(status !== 200) throw new Error();
          console.log("data", data);
          setFas(data);
      }catch(e){
          console.log('TAG-ERROR','FAILED REQUEST AT FAs.jsx');
      }
      }

      const onLoad2 = async () => {
        try {
            const {
                data,
                status
            } = await axiosHelperCall('GET', `https://si-projekat2.herokuapp.com/api/campaign/all`, {}, {});
            if (status !== 200) throw new Error();

            console.log("data", data);
            setCampaigns(data);

        } catch (e) {
            console.log('TAG-ERROR', 'FAILED REQUEST AT FAs.jsx');
        }
    }

      useEffect(()=>{
        onLoad();
        onLoad2();
      }, []);

  const onSetName = (event) => {
    setName(event.target.value);
  }

  const onSetStartDate = (event) => {
      let start = event.target.value;
        setStartDate(start);
  }

  const onSetEndDate = (event) => {
    let start = event.target.value;
        setEndDate(start);
  }

  const onChangeValue = (event) =>{
      setMaxValue(event.target.value);
  }

  const onChangeValue2 = (event) =>{
    setMinValue(event.target.value);
}

  const onClickAdd1 = (event) => {
    setAdd(!add);
    setType("Single")
  }

  const onClickAdd = (event) => {
    if(type=="Single" || type=="Multiple"){
      let newAnswer = {AnswerText: current, 
                        IsAPicture: picture,
                        Base64: url2}
      setAnswers([...answers, newAnswer])
      setCurrent("");
      //setPicture(false);
      setUrl2("")
      setUrl("")                  
    }
    else{
    setAnswers([...answers, current])
    setCurrent("");
    }
  }

const onSetText = (event) => {
    setText(event.target.value);
  }

  

    const onClickAddQuestionScale = (event) => {
      let min = minValue;
      let max = maxValue;
      
      if(min=="")
        min="0"
      if(max=="")
        max="0";  
      let odgovor = min+"-"+max;
    let newQ = {text:text, type:type, answers:[odgovor]};
    console.log("newQ", newQ)
    setQuestions([...questions, newQ]);
    console.log(newQ);
    setAdd(!add);
    setText("")
    setAnswers([])
    }

  const onClickAddQuestion = (event) => {
    let newQ = {text:text, type:type, answers:answers};
    console.log("newQ", newQ)
    setQuestions([...questions, newQ]);
    console.log(newQ);
    setAdd(!add);
    setText("")
    setAnswers([])
  }

  const onEditQuestion = (question) => {
      let id = getIndex(question.text, questions, 'text')
      setIndex(id);
      setQuestionToEditText(question.text)
      setCurrent("")
      setAnswers(question.answers)
    setQuestionToEdit(question);
    setType(question.type)
    if(question.type=="Scale"){
      let splitovano = question.answers[0].split("-")
      console.log("Splitovano", splitovano)
        setMaxValue(splitovano[1])
        setMinValue(splitovano[0])
    }
    //console.log(maxValue)
    setEditQuestion(true);
  }

  const onDeleteQuestion = (question)=>{
    let id = getIndex(question.text, questions, 'text')
    console.log("id", id)
    setIndex(id);
    var array = [...questions]; // make a separate copy of the array
    if (index !== -1) {
        array.splice(id, 1);
        setQuestions(array);
  }
  }

  function getIndex(value, arr, prop) {
    console.log("value", value)
    console.log("arr", arr)
    console.log("prop", prop)
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
    }

  const onSetQuestionToEdit = (event) =>{
     setQuestionToEditText(event.target.value);
  }

  const onChangeAnswer = (event) =>{
    setCurrent(event.target.value)
  }

  const onClickAddEdit = (event) => {
      let copy = questionToEdit;
      if(type=="Single" || type=="Multiple"){

        
        
          let newAnswer = {AnswerText: current, 
                            IsAPicture: picture,
                            Base64: url2}
          copy.answers = [...copy.answers, newAnswer]
          setQuestionToEdit(copy)
          setUrl2("")                  
          setUrl("")
      }
      else{
      copy.answers = [...copy.answers, current]
      setQuestionToEdit(copy)
      }
      setCurrent("");
  }

  function getIndexAnswer(value, arr) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

  const onDeleteAnswer = (a) => {
    let id = getIndexAnswer(a, answers)
    var array = [...answers]; // make a separate copy of the array
    if (index !== -1) {
        array.splice(id, 1);
        setAnswers(array);
  }
  }

  const checkBoxNesto = (e) => {
    if(e.target.value=="No Picture")
      setPicture(false)
    else if (e.target.value=="Picture")
      setPicture(true);
      console.log("pixel")
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

  const onAnswerEdit = (a) => {
      //console.log(answers);
      console.log("da")
      console.log(a)
    let i = getIndexAnswer(a, questionToEdit.answers);
    console.log("i", i);
    var array = questionToEdit
    array.answers = [...questionToEdit.answers];
    array.answers.splice(i, 1);
    console.log(array);
    setQuestionToEdit(array);
    console.log(questionToEdit)
    setAnswers(array.answers);
  }

  const onSelectedFa = (fa)=>{
    setFas(fas.filter(f => f.id!==fa.id))
    setSelectedFAs([...selectedFAs, fa]);
  }

  const onUnselectedFa = (fa)=>{
    setSelectedFAs(selectedFAs.filter(f => f.id!==fa.id))
    setFas([...fas, fa]);
  }

  const onClickEditQuestion = (event) =>{

      let items = [...questions]
      let item = questionToEdit;
      item.text = questionToEditText;
      if(type=="Scale"){
        let min = minValue
        let max=maxValue
        if(min=="")
          min="0"
        if(max=="")
          max="0"  
        item.answers[0] = min+"-"+max;
      }
        
      items[index] = item;
      setQuestions(items)
      console.log("question to edit", item)
      setEditQuestion(false);
      setAnswers([])
  }

  const onClickCreate = async() => {
    // setDisabled(true);
    let ima = false;
    campaigns.map(kampanja=>{
      if(kampanja.Name==name)
        ima = true;
    })
    if(ima){
      swal({
        title: "Fail!",
        text: "There is already a campaign with that name!",
        icon: "error"
      })
    }
    else{
      let qs = [];
        let [year1, month1, day1] =  startDate.split('-')
      let start = day1 + "-" + month1 + "-" + year1;
      let [year, month, day] =  endDate.split('-')
      let end = day + "-" + month + "-" + year;
      questions.map(question=>{
        let ans = []
        if(question.type=="Single" || question.type=="Multiple"){
          question.answers.map(answer=>{
            ans.push({
                AnswerText: answer.AnswerText,
                IsAPicture: answer.IsAPicture,
                Base64: answer.Base64
            });
          })
        }
        else{
        question.answers.map(answer=>{
          ans.push({
              AnswerText: answer,
              IsAPicture:false
          });
        })
      }
          let newQuestion = {
              QuestionText: question.text,
              QuestionType: question.type,
              IsDependent: false,
              Data1: null,
              Data2: null,
              Data3: null,
              Answers: ans
          }
          qs.push(newQuestion);
      })
      let ds =[]
      selectedFAs.map(fa=>{
        ds.push({
          DeviceId:fa.id
        })
      })
      console.log(ds)
      let newObj = {
        Name: name,
        StartDate: startDate,
        EndDate: endDate,
        Questions:qs,
        Devices:ds
      }
      console.log("obj", newObj);
    try{
      const { data, status } = await axiosHelperCall('POST', `https://si-projekat2.herokuapp.com/api/campaign/add`, {
        Name: name,
        StartDate: start,
        EndDate: end,
        Questions:qs,
        Devices: ds
      }, {});
      if(status === 200) {
        swal({
          title: "Success!",
          text: "You have successfully added a new campaign.",
          icon: "success"
        }).then(value => {
          history.push(routes.Campaigns);
        });
      }
    } catch(e){
      console.log('TAG-ERROR','FAILED REQUEST AT CreateUser.jsx');
    }
  }
    setDisabled(false);
  }

  

  return(
    <div className = 'create-fa-container'>
      <h1>Create new Campaign</h1>
      <label className='fa-label'>Campaign name</label>
      <InputComponent 
        type="text"
        value={name}
        onChange={onSetName}
      />
        <label className='fa-label dateLabel'>Start date</label>
            <InputComponent
                type="date"
                //value={startDate}
                onChange={onSetStartDate}
            />
        <label className='fa-label'>End date</label>
          <InputComponent
              type="date"
              //value={endDate}
              onChange={onSetEndDate}
          />

      <label className='fa-label'>Available FAs</label>
      <br/>
      <table className="table">
            <thead className="thead-dark">
                <tr>
                <th>Naziv</th>
                <th>Tag</th>
                {currentUser?.uloga === "Admin" && (<th>Select</th>)}
                </tr>
            </thead>
            <tbody>
                            {fas.map(f => (
                                <tr key={f.id}>
                                <td>{f.naziv}</td>
                                <td>{f.tag}</td>
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    onClick={() => onSelectedFa(f)}
                                ><FaPlus/></button></td>)}
                            </tr>
                            ))}
              </tbody>
          </table>

          <label className='fa-label'>Selected FAs</label>
      <br/>
      <table className="table">
            <thead className="thead-dark">
                <tr>
                <th>Naziv</th>
                <th>Tag</th>
                {currentUser?.uloga === "Admin" && (<th>Unselect</th>)}
                </tr>
            </thead>
            <tbody>
                            {selectedFAs.map(f => (
                                <tr key={f.id}>
                                <td>{f.naziv}</td>
                                <td>{f.tag}</td>
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    onClick={() => onUnselectedFa(f)}
                                ><FaTrash/></button></td>)}
                            </tr>
                            ))}
              </tbody>
          </table>


<br/>
      <label className='fa-label'>Questions</label>
        <br/>
        <div className='fa-list-view' style={{marginTop: "0"}}>
          <table className="table">
            <thead className="thead-dark">
                <tr>
                <th>Question</th>
                <th>Type</th>
                {currentUser?.uloga === "Admin" && (<th>Edit</th>)}
                {currentUser?.uloga === "Admin" && (<th>Delete</th>)}
                </tr>
            </thead>
            <tbody>
                            {questions.map(q => (
                                <tr key={q.text}>
                                <td>{q.text}</td>
                                <td>{q.type}</td>
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    onClick={() => onEditQuestion(q)}
                                ><FaEdit/></button></td>)}
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    onClick={() => onDeleteQuestion(q)}
                                ><FaTrash/></button></td>)}
                            </tr>
                            ))}
              </tbody>
          </table>
          </div>
          {currentUser?.uloga === "Admin" && add==false && editQuestion==false && (<button 
              className='btn btn-success'
              onClick={onClickAdd1}
          ><FaPlus/>ADD QUESTION</button>)}

          {add==true && <div><label className='fa-label'>Type of question </label>
        <select class="form-select" style={{width: "90%", marginTop: "25px", marginLeft: "25px"}} aria-label="Question select" defaultValue="Choose" onChange={(e)=>{setType(e.target.value)}}>
            <option>Single</option>
            <option>Scale</option>
            <option>Multiple</option>
            <option>Text</option>
        </select>
        <br/>


       {(type=="Single" || type=="Multiple") && <div> <label className='fa-label'>Enter Question Text</label>
      <InputComponent 
        type="text"
        value={text}
        onChange={onSetText}
      />
      <label className='fa-label'>Add answer</label>
      <InputComponent 
        type="text"
        value = {current}
        name="odgovor"
        onChange={onChangeAnswer}
      />

<select class="form-select" style={{width: "30%", marginTop: "25px", marginLeft: "25px"}} aria-label="Question select" defaultValue="Choose" onChange={checkBoxNesto}>
            <option>No Picture</option>
            <option>Picture</option>
        </select>
        {picture && <div> 
          <img src={url} height="200"/> <br/>
    <input type='file' onChange={onSelectFile}/>
    </div>}
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAdd}
          value='ADD ANSWER'
      /> 
      <table>
            <tbody>
                            {answers.map(a => (
                                <tr key={a.AnswerText}>
                                <td>{a.AnswerText}</td>
                                {a.Base64&& <td><img src={`data:image/jpeg;base64,${a?.Base64}`} height="65" /></td>}
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    onClick={() => onDeleteAnswer(a)}
                                ><FaTrash/></button></td>)}
                            </tr>
                            ))}
              </tbody>
            </table>
            <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAddQuestion}
          value='ADD QUESTION'
      /> 
      </div>}

      {type=="Text" && <div><label className='fa-label'>Enter Question Text</label> <InputComponent 
        type="text"
        value={text}
        onChange={onSetText}
      /><InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAddQuestion}
          value='ADD QUESTION'
      /> </div>}


        {type=="Scale" && 
            <div>
                <label className='fa-label'>Enter Question Text</label>
                <InputComponent 
                type="text"
                value={text}
                onChange={onSetText}
                />
      
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
      
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAddQuestionScale}
          value='ADD QUESTION'
      /> 
            </div>} 
        </div>}

        {editQuestion==true && (type=="Multiple" || type=="Single") &&
        <div>
            <label className='fa-label'>Enter Question Text</label>
      <InputComponent 
        type="text"
        value={questionToEditText}
        onChange={onSetQuestionToEdit}
      />
      <label className='fa-label'>Add answer</label>
      <InputComponent 
        type="text"
        value = {current}
        name="odgovor"
        onChange={onChangeAnswer}
      />
      <select class="form-select" style={{width: "30%", marginTop: "25px", marginLeft: "25px"}} aria-label="Question select" defaultValue="Choose" onChange={checkBoxNesto}>
            <option>No Picture</option>
            <option>Picture</option>
        </select>
        {picture && <div> 
          <img src={url} height="200"/> <br/>
    <input type='file' onChange={onSelectFile}/>
    </div>}
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAddEdit}
          value='ADD ANSWER'
      /> 
      <table>
            <tbody>
                            {questionToEdit.answers.map(a => (
                                <tr key={a.AnswerText}>
                                <td>{a.AnswerText}</td>
                                {a.Base64&& <td><img src={`data:image/jpeg;base64,${a?.Base64}`} height="65" /></td>}
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    onClick={() => onAnswerEdit(a)}
                                ><FaTrash/></button></td>)}
                            </tr>
                            ))}
              </tbody>
            </table>
            <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickEditQuestion}
          value='EDIT QUESTION'
      /> 
        </div>}

        {editQuestion==true && type=="Text" &&
        <div>
            <label className='fa-label'>Enter Question Text</label>
      <InputComponent 
        type="text"
        value={questionToEditText}
        onChange={onSetQuestionToEdit}
      />
            <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickEditQuestion}
          value='EDIT QUESTION'
      /> 
        </div>}

        {editQuestion==true && type=="Scale" &&
        <div>
            <label className='fa-label'>Enter Question Text</label>
      <InputComponent 
        type="text"
        value={questionToEditText}
        onChange={onSetQuestionToEdit}
      />
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
            <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickEditQuestion}
          value='EDIT QUESTION'
      /> 
        </div>}

      {add==false && editQuestion==false && <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickCreate}
          value='CREATE'
          disabled={disabled}
      />}
    </div>
  );
}

export default CampaignCreateView;