//import React from 'react';
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";

function Users() {
    /*
    * dummy kod
    * */

 const [allUsers, setAllUsers] = useState([]);

     useEffect(() => {
           var myHeaders = new Headers();
           myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImVrcnNtYW5vdmkxQGV0Zi51bnNhLmJhIiwidWxvZ2EiOiJBZG1pbiJ9LCJpYXQiOjE2MjE4ODQ5NTksImV4cCI6MTYyMTk3MTM1OX0.G2BukwV6c-3daMf3m863WnBl8EINeCkwd6Ilw47ufq8");
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


           var requestOptions = {
             method: 'GET',
             headers: myHeaders,
             redirect: 'follow'
           };

 fetch("https://si-projekat2.herokuapp.com/user/all", requestOptions)
             .then(response => response.text())
             .then(result => {console.log(result); })
             .catch(error => console.log('error', error));

        }, [])


    return(
        <div className='user'>
            <h1>Users</h1>
            <table>
                            <thead>
                                <tr>
                                <th id="table-header">Email</th>
                                <th id="table-header">Uloga</th>
                                </tr>
                            </thead>
                            {allUsers.map(user =>
                                              <tbody>
                                                <tr key={user.userId}>
                                                    <th>{user.email}</th>
                                                    <th>{user.uloga}</th>
                                                </tr>
                                            </tbody>
                                            )}


                            </table>
        </div>
    )
}

export default Users;
