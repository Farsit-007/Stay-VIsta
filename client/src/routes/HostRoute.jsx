import React from 'react';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const HostRoute = ({children}) => {
    const[role,isLoading] = useRole()
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    if(role === 'host') return children
    return <Navigate to='/dashboard'></Navigate>
};

export default HostRoute;