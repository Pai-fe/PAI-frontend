import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from "react-router-dom";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImVrcnNtYW5vdmkxQGV0Zi51bnNhLmJhIiwidWxvZ2EiOiJBZG1pbiJ9LCJpYXQiOjE2MjE4ODQ5NTksImV4cCI6MTYyMTk3MTM1OX0.G2BukwV6c-3daMf3m863WnBl8EINeCkwd6Ilw47ufq8';

const queryParams = new URLSearchParams(window.location.search);

class CreateFAForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        naziv: '',
        geotag: "0,0",
        tag: ''
      };
      var id = this.props.match.params.id;
      console.log(id)
    }

    componentDidMount(){
      
      this.id = this.props.match.params.id;
      if(this.id == undefined) return

      var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+token);
    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        fetch("https://si-projekat2.herokuapp.com/faDefinition/all", requestOptions).
        then(response =>{
            if(response.status == 200){
                console.log('sacu da setam')
                console.log(this.state.list)
                response.json().then(res => {
                    res.forEach(x => {
                      if(x.id == this.id){
                        console.log(x);
                        this.setState({
                          naziv: x.naziv,
                          geotag: x.geotag,
                          tag: x.tag
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
    }
  
    predaj = (event) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImVrcnNtYW5vdmkxQGV0Zi51bnNhLmJhIiwidWxvZ2EiOiJBZG1pbiJ9LCJpYXQiOjE2MjE4ODQ5NTksImV4cCI6MTYyMTk3MTM1OX0.G2BukwV6c-3daMf3m863WnBl8EINeCkwd6Ilw47ufq8");
      myHeaders.append("Content-Type", "application/json");
      
      var raw = this.id == undefined ? JSON.stringify({"naziv":this.state.naziv,"geotag":this.state.geotag,"tag":this.state.tag}) : 
            JSON.stringify({"naziv":this.state.naziv,"geotag":this.state.geotag,"tag":this.state.tag, "id": this.id});
      
      
      var requestOptions = {
        method: this.id == undefined ? 'POST' : 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      var link = this.id == undefined ? "https://si-projekat2.herokuapp.com/faDefinition/create" : "https://si-projekat2.herokuapp.com/faDefinition/edit"

      fetch(link, requestOptions)
          .then(response => response.text())
          .then(result => {
              console.log(result)
              alert(JSON.parse(result).message);
            })
          .catch(error => console.log('error', error));
  
      return ;
    }
  
    render() {    
      return (
      <form>

        <div className="field">
        <input
          type='text'
          name='naziv'
          value={this.state.naziv}
          placeholder='Naziv'
          onChange={this.myChangeHandler}
        />
        </div>


        <div className="field">
        <input
          type='text'
          name='tag'
          value={this.state.tag}
          placeholder='Tag'
          onChange={this.myChangeHandler}
        />
        </div>

        <button type='button' onClick={e => this.predaj(e)}> Submit </button>
  
  
        </form>
      );
    }
  }
  
  
  export default CreateFAForm;