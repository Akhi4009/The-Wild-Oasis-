import React, { useEffect } from 'react'
import styled from 'styled-components';
import Spinner from "./Spinner";
import { useUser } from '../features/authentication/useUser'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    // 1. Load the authenticated user
    const { isLoading, isAuthenticated} = useUser();
    
    
    // 2. if there is No authenticated user, redirect to the login page
    useEffect(()=>{
        if(!isAuthenticated && !isLoading) navigate("/login")
    },[isAuthenticated, isLoading,navigate]) 

    // 3. While Loading, show a Spinner

    if(isLoading) return (
        <FullPage>
        <Spinner/>
        </FullPage>
        )
    // 4. if there is a user, render the app
    return children
}

export default ProtectedRoute

const FullPage = styled.div`
height: 100vh;
background-color: var(--color-grey-50);
display: flex;
justify-content: center;
align-items: center;
`