import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { useDispatch, useSelector } from 'react-redux';

import { axiosHelperCall } from "../../helpers/axios.helper";
import { CONFIG } from "../../helpers/config";

import { useLocation } from "react-router-dom";

import { routes } from "../AppRouter/RoutesList";

import InputComponent from "../Inputs/InputComponent";
//import GeoMap from "../Map/Map";

import './FACreateView.css'
import './Table.css'

import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const AddQuestion = (props) => {
    const location = useLocation();
    //console.log(location.state.setName("Enes"));
    console.log(location.state);
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state?.userInfo?.user);
    const [type, setType] = useState("Single answer");
    const [text, setText] = useState("");
    const [answers, setAnswers] = useState(["asim"])
    const [current, setCurrent] = useState("");


    const onClickAdd = (event) => {
        setAnswers([...answers, current])
        setCurrent("");
      }

    const onSetText = (event) => {
        setText(event.target.value);
      }

      const onChangeAnswer = (event) =>{
        setCurrent(event.target.value)
      }

    return (
       <div>
        <label className='fa-label'>Type of question </label>
        <select defaultValue="Choose" onChange={(e)=>{setType(e.target.value)}}>
            <option>Single answer</option>
            <option>Scale</option>
            <option>Multiple choice</option>
            <option>Text</option>
        </select>
        <br/>
        <label className='fa-label'>Enter Question Text</label>
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
          value='ADD'
      />
        {type=="Single answer" && <div>
            <table>
            <tbody>
                            {answers.map(a => (
                                <tr key={a}>
                                <td>{a}</td>
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
        {type=="Multiple choice" && <div>Multiple choice</div>}
        {type=="Text" && <div>Text</div>}
        {type=="Scale" && <div>Scale</div>}
       </div>
        
   )
}

export default AddQuestion;