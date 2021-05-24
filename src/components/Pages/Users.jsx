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
                    <h1>Users List View</h1>
                    {users.map(user => (
                        <div key={user?.email} style={{ width: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <p style={{ marginRight: '30px' }}>Email:</p>
                                <p style={{ marginRight: '30px' }}>{user?.email}</p>
                                <p style={{ marginRight: '30px' }}>Role:</p>
                                <p style={{ marginRight: '30px' }}>{user?.uloga} </p>
                                {currentUser?.uloga === "Admin" && (<InputComponent 
                                    type='button'
                                    onClick={() => {
                                        setEditUser(user);
                                        setScreen(screens[1]);
                                    }}
                                    value='EDIT USER'
                                />)}
                                {currentUser?.uloga === "Admin" && currentUser?.email !== user?.email && (<InputComponent 
                                    type='button'
                                    onClick={() =>onDelete(user?.email)}
                                    value='DELETE USER'
                                />)}
                            </div>
                        </div>
                    ))}
                    {currentUser?.uloga === "Admin" && (<InputComponent 
                        type='button'
                        onClick={() => history.push(routes.CREATE_USER)}
                        value='CREATE NEW USER'
                    />)}
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
