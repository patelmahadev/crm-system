import React from 'react';
import { Outlet } from 'react-router';

const User = () =>{
    return(
        <>
            <Outlet />
            <h1>User Page</h1>
        </>
    )
}
export default User;