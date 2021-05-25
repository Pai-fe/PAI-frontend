import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

//Store
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../redux/actions/usersActions';

//Request
import { axiosHelperCall } from '../../helpers/axios.helper';
import { CONFIG } from '../../helpers/config';
import InputComponent from '../Inputs/InputComponent';

//Screen
import EditUser from './EditUser';
import { routes } from '../AppRouter/RoutesList';

import './Users.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const screens = [
    "listView",
    "editView"
]
const Users = () => {
    const currentUser = useSelector(state => state?.userInfo?.user);
    const users = useSelector(state => state?.users?.list);
    const dispatch = useDispatch();
    const history = useHistory();

    const [editUser, setEditUser] = useState(null);
    const [screen, setScreen] = useState(screens[0]);
    
    const onDelete = async(email) => {
        try{
            const { data, status } = await axiosHelperCall('DELETE', `${CONFIG.APP_URL}/user/delete`, {
                email: email
            }, {});
            onLoad();
        } catch(e) {
            console.log('TAG-ERROR','FAILED REQUEST AT Users.jsx');
        }
    }

    const onLoad = async() => {
        try{
            const { data, status } = await axiosHelperCall('GET', `${CONFIG.APP_URL}/user/all`, {}, {});
            if(status !== 200) throw new Error();
            dispatch(setUsers(data))
        } catch(e){
            console.log('TAG-ERROR','FAILED REQUEST AT Users.jsx');
        }
    }

    const onEditUser = () => {
        onLoad();
        setTimeout(() => {
            setScreen(screens[0]);
        }, 500)
    }

    useEffect(()=>{
        onLoad();
    }, []);

    return(
        <div className='user'>
            {screen === screens[0] && (
                <>
                    {/* <h1>Users List View</h1> */}
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Role</th>
                            {currentUser?.uloga === "Admin" && (<th>Edit</th>)}
                            {currentUser?.uloga === "Admin" && (<th>Delete</th>)}
                            </tr>
                        </thead>
                        <tbody>
                        {users.map(user => 
                            <tr key={user.id}>
                            <td>{user?.id}</td>
                            <td>{user?.email}</td>
                            <td>{user?.uloga}</td>
                            {currentUser?.uloga === "Admin" && (<td><button 
                                className='btn btn-link'
                                onClick={() => {
                                    setEditUser(user);
                                    setScreen(screens[1]);
                                }}
                            ><FaEdit/></button></td>)}
                            {currentUser?.uloga === "Admin" && currentUser?.email !== user?.email && (<td><button 
                                className='btn btn-link'
                                onClick={() =>onDelete(user?.email)}
                            ><FaTrash/></button></td>)}
                        </tr>
                        )}
                        </tbody>
                    </table>
                    {currentUser?.uloga === "Admin" && (<button 
                        className='btn btn-success'
                        onClick={() => history.push(routes.CREATE_USER)}
                    ><FaPlus/>CREATE NEW USER</button>)}
                </>
            )}
            {screen === screens[1] && (
                <>
                    <EditUser
                        user={editUser}
                        onClick={onEditUser}
                    />
                </>
            )}
        </div>
    )
}

export default Users;
