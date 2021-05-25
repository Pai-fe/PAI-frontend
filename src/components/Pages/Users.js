//import React from 'react';
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import './Users.css';
import {push} from "connected-react-router";

function Users() {
    /*
    * dummy kod
    * */

 const [allUsers, setAllUsers] = useState([]);

     useEffect(() => {
          var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImVrcnNtYW5vdmkxQGV0Zi51bnNhLmJhIiwidWxvZ2EiOiJBZG1pbiJ9LCJpYXQiOjE2MjE4ODQ5NTksImV4cCI6MTYyMTk3MTM1OX0.G2BukwV6c-3daMf3m863WnBl8EINeCkwd6Ilw47ufq8"

     axios.get('https://si-projekat2.herokuapp.com/user/all', {
       headers: {
         'Authorization': `Bearer ${token}`
       }
     })
     .then((res) => {
       console.log(res.data);
       setAllUsers(res.data);

     })
     .catch((error) => {
       console.error(error)
     })
        }, [])


    return(




        <div class='users'>

         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

            <h1>Users</h1>

            <a href="/adduser" class="border-shadow">
            <span class="text-gradient">Kreiraj korisnika<i class="fas fa-user"></i></span>
            </a>


            <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                <th>Email</th>
                                <th>Uloga</th>
                                <th>Akcija</th>
                                </tr>
                            </thead>
                            {allUsers.map(user =>
                                              <tbody>
                                                <tr key={user.userId}>
                                                    <td>{user.email}</td>
                                                    <td>{user.uloga}</td>
                                                    <td>
                                                    <a href="#" class="btn update">
                                                    <span class="text-gradient"><i class="fas fa-pencil-alt"></i></span>
                                                    </a>
                                                    <a class="btn delete">
                                                    <span class="text-gradient"><i class="fas fa-times"></i></span>
                                                    </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            )}


                            </table>
        </div>
    )
}

export default Users;
