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
  //console.log('testbest molim', id);
  const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [questions, setQuestions] = useState([/*{text:"Da li je ovo pitanje ok",type:"Single",answers:["asim1", 'asim2']}, {text:"Pitanje2", type:"Single",answers:["asim3", "asim4"]}*/]);
  //console.log('testbest molim te', fa);
  const [add, setAdd] = useState(false);
  const [type, setType] = useState("Single");
  const [questionText, setQuestionText] = useState("");
  const [current, setCurrent] = useState("");
  const [answers, setAnswers] = useState([])
  const [maxValue, setMaxValue] = useState("0")
  const [minValue, setMinValue] = useState("0")
  const [selectedFas, setSelectedFas] = useState([]);
  const [fas, setFas] = useState([]);
  const [firstTime, setFirstTime] = useState(true)
  const [campaigns, setCampaigns] = React.useState([]);

  useEffect(()=>{
    onLoad();
    onLoad2();
    onLoad68();
  }, []);

  useEffect(()=>{
    onLoad3()
  }, [fas, selectedFas])

  const onLoad = async() => {
    try{
        const { data, status } = await axiosHelperCall('GET', `https://si-projekat2.herokuapp.com/api/campaign/`+id, {}, {});
        if(status !== 200) throw new Error();
        console.log("data", data);
        //dispatch(setCamps(data));
        //console.log("fasica", camps)
        setCampaign(data);
        setName(data.Name)
        setStartDate(data.StartDate.substring(0,10))
        setEndDate(data.EndDate.substring(0,10));
        setQuestions(data.Questions);
        console.log(data.Devices);
        setSelectedFas(data.Devices);
    } catch(e){
        console.log('TAG-ERROR','FAILED REQUEST AT Camps.jsx');
    }
  }

    const onLoad2 = async()=>{
        try{
          const { data, status } = await axiosHelperCall('GET', `https://si-projekat2.herokuapp.com/faDefinition/all`, {}, {});
          if(status !== 200) throw new Error();
          console.log("data", data)
          setFas(data);
          
          
      }catch(e){
          console.log('TAG-ERROR','FAILED REQUEST AT FAs.jsx');
      }
      }

      function comparer(otherArray){
        return function(current){
          return otherArray.filter(function(other){
            return other.deviceId == current.id
          }).length == 0;
        }
      }

      const onLoad3 = async()=>{
        
        if(selectedFas.length>0 && fas.length>0 && firstTime){
          console.log("Uso")
          console.log("selektovane", selectedFas);
        console.log("ukupne", fas);
          setFas(fas.filter(comparer(selectedFas)))
        setFirstTime(false)
        console.log(selectedFas);
        console.log(fas);
        }
      }

      const onLoad68 = async () => {
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

      const onSelectedFa = (fa)=>{
        setFas(fas.filter(f => f.id!==fa.id))
        setSelectedFas([...selectedFas, fa]);
      }
    
      const onUnselectedFa = (fa)=>{
        console.log(fa);
        setSelectedFas(selectedFas.filter(f => f.deviceId!==fa.deviceId))
        setFas([...fas, fa]);
      }

  const onSetQuestionText = (event) => {
    setQuestionText(event.target.value);
  }

  const onChangeAnswer = (event) =>{
    setCurrent(event.target.value)
  }

  const onClickAdd = (event) => {
    setAnswers([...answers, current])
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
    let index = getIndexAnswer(a, answers)
    var array = [...answers]; // make a separate copy of the array
    if (index !== -1) {
        array.splice(index, 1);
        setAnswers(array);
  }
  }

  const onSetStartDate = (event) => {
    let start = event.target.value;
    // const [year, month, day] =  start.split('-')
    // start = day + "-" + month + "-" + year;
      setStartDate(start);
}

const onSetEndDate = (event) => {
  let start = event.target.value;
    // const [year, month, day] =  start.split('-')
    // start = day + "-" + month + "-" + year;
      setEndDate(start);
}

const onClickAdd1 = (event) => {
    setAdd(!add);

  }

const onDeleteQuestion = async (q) => {
    console.log("TUSAMTUSAM")
    try{
        const { data, status } = await axiosHelperCall('DELETE', `https://si-projekat2.herokuapp.com/api/question/`+q.QuestionId, {
        }, {});
        if(status === 200) {
          swal({
            title: "Success!",
            text: "You have successfully deleted a question.",
            icon: "success"
          }).then(async value => {
            try{
                const { data, status } = await axiosHelperCall('GET', `https://si-projekat2.herokuapp.com/api/campaign/`+id, {}, {});
                if(status !== 200) throw new Error();
                console.log("data", data);
                setQuestions(data.Questions);
            } catch(e){
                console.log('TAG-ERROR','FAILED REQUEST AT Camps.jsx');
            }
          });
        }
      } catch(e){
          console.log(e)
        console.log('TAG-ERROR','FAILED REQUEST AT CampEdit.jsx');
      }
}

const onClickEditCampaign = async (event) => {
  console.log(campaigns)
  console.log(id)
  let ima = false;
    campaigns.map(kampanja=>{
      if(kampanja.Name==name && kampanja.CamapignId!=id){
        console.log("ID", id)
        console.log("KampanjaID", kampanja.CamapignId)
        ima = true;
      }
    })
    if(ima){
      swal({
        title: "Fail!",
        text: "There is already a campaign with that name!",
        icon: "error"
      })
    }
    else{
    let [year1, month1, day1] =  startDate.split('-')
      let start = day1 + "-" + month1 + "-" + year1;
      let [year, month, day] =  endDate.split('-')
      let end = day + "-" + month + "-" + year;
      let ds =[]
      console.log("selektovane na editu", selectedFas)
      selectedFas.map(fa=>{
        ds.push({
          DeviceId:fa?.id || fa.deviceId
        })
      })
      console.log("ds", ds)
      // let obj = {
      //   CampaignId: id,
      //     Name: name,
      //     StartDate: start,
      //     EndDate: end,
      //     Devices:ds
      // }
      // console.log("obj",obj)
      try{
        const { data, status } = await axiosHelperCall('POST', `https://si-projekat2.herokuapp.com/api/campaign/edit`, {
          CampaignId: id,
          Name: name,
          StartDate: start,
          EndDate: end,
          Devices:ds
        }, {});
        if(status === 200) {
          swal({
            title: "Success!",
            text: "You have successfully edited a campaign.",
            icon: "success"
          }).then(value => {
            history.push(routes.Campaigns);
          });
        }
      } catch(e){
        console.log('TAG-ERROR','FAILED REQUEST AT CampEdit.jsx');
      }
    }
}

const onClickAddQuestion = async () => {
    let ans = []
    if(type!="Text"){
        if(type=="Scale"){
          let max=maxValue
          let min=minValue
          if(max=="")
            max="0"
          if(min=="")
            min="0"
            let odgovor=min+"-"+max
        //setAnswers([min+"-"+max])
        ans.push({
          AnswerText: min+"-"+max,
          IsAPicture:false
      });
        }
        else {
        answers.map(answer=>{
          ans.push({
              AnswerText: answer,
              IsAPicture:false
          });
        })
      }
    }
    // else{
    //     ans.push({
    //         AnswerText: "-1",
    //         IsAPicture:false
    //     })
    // }
    console.log("ans", ans);
    let body = {CampaignId: id,
        QuestionType: type,
        QuestionText: questionText,
        IsDependent: false,
        Data1: null,
        Data2: null,
        Data3: null,
        Answers: ans};
        console.log(body)
        try{
            const { data, status } = await axiosHelperCall('POST', `https://si-projekat2.herokuapp.com/api/question`, {
                CampaignId: id,
                QuestionType: type,
                QuestionText: questionText,
                IsDependent: false,
                Data1: null,
                Data2: null,
                Data3: null,
                Answers: ans
            }, {});
            if(status === 200) {
              swal({
                title: "Success!",
                text: "You have successfully added a new question.",
                icon: "success"
              }).then(async value => {
                try{
                    const { data, status } = await axiosHelperCall('GET', `https://si-projekat2.herokuapp.com/api/campaign/`+id, {}, {});
                    if(status !== 200) throw new Error();
                    console.log("data", data);
                    setQuestions(data.Questions);
                } catch(e){
                    console.log('TAG-ERROR','FAILED REQUEST AT Camps.jsx');
                }
              });
            }
          } catch(e){
            console.log('TAG-ERROR','FAILED REQUEST AT CreateUser.jsx');
          }
          setCurrent("");
          setAnswers([]);
          setAdd(!add);
}

const onSetScaleValue2 = (e) =>{
  setMinValue(e.target.value)
  //setAnswers([e.target.value])
}


  const onSetScaleValue = (e) =>{
      setMaxValue(e.target.value)
    //  setAnswers([e.target.value])
  }



  const onSetName = (event) => {
    setName(event.target.value)
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


  return(
     <div className = 'create-fa-container'>
       <h1>Edit campaign</h1>
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
                                <tr key={f?.id || f.deviceId}>
                                <td>{f?.naziv || f.name}</td>
                                <td>{f?.tag}</td>
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
                {/* {currentUser?.uloga === "Admin" && (<th>Unselect</th>)} */}
                </tr>
            </thead>
            <tbody>
                            {selectedFas.map(f => (
                                <tr key={f?.deviceId || f.id}>
                                <td>{f?.name || f.naziv}</td>
                                {/* <td>{f.tag}</td> */}
                                {/* {currentUser?.uloga === "Admin" && (<td><button 
                                    className='btn btn-link'
                                     onClick={() => onUnselectedFa(f)}
                                ><FaTrash/></button></td>)} */}
                            </tr>
                            ))}
              </tbody>
          </table>
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
                                    onClick={() => onDeleteQuestion(q)}
                                ><FaTrash/></button></td>)}
                            </tr>
                            ))}
          {}
              </tbody>
          </table>

          {currentUser?.uloga === "Admin" && add==false && (<button 
              className='btn btn-success'
              onClick={onClickAdd1}
          ><FaPlus/>ADD QUESTION</button>)}

{add==true && <div><label className='fa-label'>Type of question </label>
        <select defaultValue="Choose" onChange={(e)=>{setType(e.target.value)}}>
            <option>Single</option>
            <option>Scale</option>
            <option>Multiple</option>
            <option>Text</option>
        </select>
        <br/>
        
        {(type=="Single" || type=="Multiple") && <div> <label className='fa-label'>Enter Question Text</label>
      <InputComponent 
        type="text"
        value={questionText}
        onChange={onSetQuestionText}
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
        value={questionText}
        onChange={onSetQuestionText}
      /><InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAddQuestion}
          value='ADD QUESTION'
      /> </div>}

{type=="Scale" && <div><label className='fa-label'>Enter Question Text</label> <InputComponent 
        type="text"
        value={questionText}
        onChange={onSetQuestionText}
      />
      <label className='fa-label'>Min value</label> 
      <InputComponent 
        type="number"
        value={minValue}
        onChange={onSetScaleValue2}
      />
      <label className='fa-label'>Max value</label> 
      <InputComponent 
        type="number"
        value={maxValue}
        onChange={onSetScaleValue}
      />
      <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickAddQuestion}
          value='ADD QUESTION'
      /> </div>}

         </div>}

          {add ==false && <InputComponent className='create-fa-button'
          type='button'
          onClick={onClickEditCampaign}
          value='EDIT CAMPAIGN'
      /> }
     </div>  );
}

export default CampEditView;
