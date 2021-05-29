import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { useDispatch, useSelector } from 'react-redux';

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
    const [type, setType] = useState("Single answer");
    const [text, setText] = useState("");
    const [answers, setAnswers] = useState([])
    const [current, setCurrent] = useState("");
    const [editQuestion, setEditQuestion] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState({});
    const [index, setIndex] = useState(0);
    const [questionToEditText, setQuestionToEditText] = useState("")

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

  const onClickAdd1 = (event) => {
    setAdd(!add);
  }

  const onClickAdd = (event) => {
    setAnswers([...answers, current])
    setCurrent("");
  }

const onSetText = (event) => {
    setText(event.target.value);
  }

  function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

  const onClickAddQuestion = (event) => {
    let newQ = {text:text, type:type, answers:answers};
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
    setEditQuestion(true);
  }

  const onDeleteQuestion = (question)=>{
    let id = getIndex(question.text, questions, 'text')
    setIndex(id);
    var array = [...questions]; // make a separate copy of the array
    if (index !== -1) {
        array.splice(index, 1);
        setQuestions(array);
  }
  }

  const onSetQuestionToEdit = (event) =>{
     setQuestionToEditText(event.target.value);
  }

  const onChangeAnswer = (event) =>{
    setCurrent(event.target.value)
  }

  const onClickAddEdit = (event) => {
      let copy = questionToEdit;
      copy.answers = [...copy.answers, current]
      setQuestionToEdit(copy)
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

  const onClickEditQuestion = (event) =>{

      let items = [...questions]
      let item = questionToEdit;
      item.text = questionToEditText;
      items[index] = item;
      setQuestions(items)
      console.log("question to edit", item)
      setEditQuestion(false);
  }

  const onClickCreate = async() => {
      let qs = [];
        let [year1, month1, day1] =  startDate.split('-')
      let start = day1 + "-" + month1 + "-" + year1;
      let [year, month, day] =  endDate.split('-')
      let end = day + "-" + month + "-" + year;
      questions.map(question=>{
        let ans = []
        question.answers.map(answer=>{
          ans.push({
              AnswerText: answer,
              IsAPicture:false
          });
        })
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
      let newObj = {
        Name: name,
        StartDate: startDate,
        EndDate: endDate,
        Questions:qs
      }
      console.log(newObj);
    try{
      const { data, status } = await axiosHelperCall('POST', `https://si-main-server.herokuapp.com/api/campaign/add`, {
        Name: name,
        StartDate: start,
        EndDate: end,
        Questions:qs
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

  

  return(
    <div className = 'create-fa-container'>
      <h1>Create new Campaign</h1>
      <label className='fa-label'>Campaign name</label>
      <InputComponent 
        type="text"
        value={name}
        onChange={onSetName}
      />
      <label className='fa-label'>Start date</label>
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
      <label className='fa-label'>Questions</label>
      <div className='fa-list-view'>
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
        <select defaultValue="Choose" onChange={(e)=>{setType(e.target.value)}}>
            <option>Single answer</option>
            <option>Scale</option>
            <option>Multiple choice</option>
            <option>Text</option>
        </select>
        <br/>


       {(type=="Single answer" || type=="Multiple choice") && <div> <label className='fa-label'>Enter Question Text</label>
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
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAdd}
          value='ADD ANSWER'
      /> 
      <table>
            <tbody>
                            {answers.map(a => (
                                <tr key={a}>
                                <td>{a}</td>
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
      /> 
      <label className='fa-label'>Max value</label>
      <InputComponent className='create-fa-button'
          type='number'
      />
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAddQuestion}
          value='ADD QUESTION'
      /> 
            </div>} 
        </div>}

        {editQuestion==true && (type=="Multiple choice" || type=="Single answer") &&
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
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAddEdit}
          value='ADD ANSWER'
      /> 
      <table>
            <tbody>
                            {questionToEdit.answers.map(a => (
                                <tr key={a}>
                                <td>{a}</td>
                                {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                    //onClick={() => onDeleteFA(fa)}
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

      {add==false && editQuestion==false && <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickCreate}
          value='CREATE'
      />}
    </div>
  );
}

export default CampaignCreateView;