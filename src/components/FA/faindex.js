import React, { useState } from 'react';
import FATable from './fatable';
import {Link} from "react-router-dom";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6ImVrcnNtYW5vdmkxQGV0Zi51bnNhLmJhIiwidWxvZ2EiOiJBZG1pbiJ9LCJpYXQiOjE2MjE4ODQ5NTksImV4cCI6MTYyMTk3MTM1OX0.G2BukwV6c-3daMf3m863WnBl8EINeCkwd6Ilw47ufq8';


class FAIndex extends React.Component{
    
    render() {
        return (
            <div>
                <Link to="fa/create" className="btn btn-primary">Create new FA Definition</Link>
                <FATable/>
            </div>
        )
    }

}

export default FAIndex;