import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImVrcnNtYW5vdmkxQGV0Zi51bnNhLmJhIiwidWxvZ2EiOiJBZG1pbiJ9LCJpYXQiOjE2MjE4ODQ5NTksImV4cCI6MTYyMTk3MTM1OX0.G2BukwV6c-3daMf3m863WnBl8EINeCkwd6Ilw47ufq8';


class FATable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loaded: false
        }
    }

    componentDidMount(){
        this.updateList();
    }

    updateList(){
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
                    this.setState({
                        list: res,
                        loaded: true
                    })
                })  
            }else{
                console.log('belaj');
            }
        })
    }

    brisi(id){
        console.log(id);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"id":id});
        
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://si-projekat2.herokuapp.com/faDefinition/delete", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.updateList();
                })
            .catch(error => console.log('error', error));
    }
    
    render() {
        console.log("render() method");
        console.log(this.state.list);

        if(!this.state.loaded) return ( <div> Loading</div>)

        return (
            <div>
                <table>
    
                <tr>
                    <th>Name</th>
                    <th>Tag</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                
                {this.state.list.map(x => {
                    return (
                        <tr>
                            <td>{x.naziv}</td>
                            <td>{x.tag}</td>
                            <td><Link to={"fa/edit/"+x.id}>Edit</Link></td>
                            <td><Link onClick={e => this.brisi(x.id)}>Delete</Link></td>
                        </tr>
                    )
                })}
    
                </table>
            </div>
        )
    }

}

export default FATable;