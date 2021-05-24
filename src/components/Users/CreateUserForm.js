import React from 'react';
import ReactDOM from 'react-dom';
import './CreateUserForm.css';


class CreateUserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      role: 'Admin'
    };
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  predaj = (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImVrcnNtYW5vdmkxQGV0Zi51bnNhLmJhIiwidWxvZ2EiOiJBZG1pbiJ9LCJpYXQiOjE2MjE4ODQ5NTksImV4cCI6MTYyMTk3MTM1OX0.G2BukwV6c-3daMf3m863WnBl8EINeCkwd6Ilw47ufq8");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"email":this.state.email,"password":this.state.password,"uloga":this.state.role});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("https://si-projekat2.herokuapp.com/user/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
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
        placeholder='Email'
        onChange={this.myChangeHandler}
      />
      </div>

      <p>Enter user password:</p>
      <div className="field">
      <input
        type='password'
        name='password'
        placeholder='Password'
        onChange={this.myChangeHandler}
      />
      </div>

      <p>Enter user role:</p>
      <select name='role' onChange={this.myChangeHandler}>
        <option selected value="Admin">Admin</option>
        <option value="User">User</option>
      </select>


        <button type='button' onClick={e => this.predaj(e)}> Submit </button>


      </form>
    );
  }
}


export default CreateUserForm;