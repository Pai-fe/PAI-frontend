import React from 'react';
import ReactDOM from 'react-dom';
import { FaThinkPeaks } from 'react-icons/fa';
import './CreateUserForm.css';
import Swal from 'sweetalert2'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImVrcnNtYW5vdmkxQGV0Zi51bnNhLmJhIiwidWxvZ2EiOiJBZG1pbiJ9LCJpYXQiOjE2MjE4ODQ5NTksImV4cCI6MTYyMTk3MTM1OX0.G2BukwV6c-3daMf3m863WnBl8EINeCkwd6Ilw47ufq8';

const queryParams = new URLSearchParams(window.location.search);
class CreateUserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      role: 'Admin'
    };
  }

  componentDidMount(){
      
    this.id = this.props.match.params.id;
    this.email = this.props.match.params.email;

    if(this.id == undefined) return;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://si-projekat2.herokuapp.com/user/all", requestOptions).
    then(response =>{
        if(response.status == 200){
            console.log('sacu da setam')
            console.log(this.state.list)
            response.json().then(res => {
                res.forEach(x => {
                  if(x.id == this.id){
                    console.log(x);
                    this.setState({
                      email: x.email,
                      password: x.password,
                      role: x.role
                    })
                  }
                });
            })  
        }else{
            console.log('belaj');
        }
    })


  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
    console.log(nam, val)
  }

  predaj = (event) => {
    var kreiram = this.id == undefined

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImVrcnNtYW5vdmkxQGV0Zi51bnNhLmJhIiwidWxvZ2EiOiJBZG1pbiJ9LCJpYXQiOjE2MjE4ODQ5NTksImV4cCI6MTYyMTk3MTM1OX0.G2BukwV6c-3daMf3m863WnBl8EINeCkwd6Ilw47ufq8");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = kreiram ? JSON.stringify({"email":this.state.email,"password":this.state.password,"uloga":this.state.role}) : 
          JSON.stringify({"email":this.state.email,"password":this.state.password,"uloga":this.state.role, "id": this.id});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    var link = kreiram ? "https://si-projekat2.herokuapp.com/user/create" : "https://si-projekat2.herokuapp.com/user/update";
    fetch(link, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          Swal.fire(
            'Good job!',
            kreiram ? 'You successfully created a new user!' : 'You successfully edited the user!',
            'success'
          )
          
        })
        .catch(error => console.log('error', error));

    return false;
  }

  render() {    
    return (
    <form>
      <h1>Welcome {this.state.email} </h1>

      <br></br>

      <p>Enter email:</p>
      <div className="field">
      <input
        type='text'
        name='email'
        value = {this.state.email}
        placeholder='Email'
        onChange={this.myChangeHandler}
      />
      </div>

      <p>Enter user password:</p>
      <div className="field">
      <input
        type='password'
        name='password'
        value = {this.state.password}
        placeholder='Password'
        onChange={this.myChangeHandler}
      />
      </div>

      <p>Enter user role:</p>
      <select name='role' onChange={this.myChangeHandler} value={this.state.role}>
        <option key="Admin" name="Admin" value="Admin">Admin</option>
        <option key="User" name="User" value="User" >User</option>
      </select>


        <button type='button' onClick={e => this.predaj(e)}> Submit </button>


      </form>
    );
  }
}


export default CreateUserForm;