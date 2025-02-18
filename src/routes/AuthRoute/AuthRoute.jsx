import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SigninPage from '../../pages/SigninPage/SigninPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import { useQueryClient } from '@tanstack/react-query';

function AuthRoute(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    console.log(queryClient.getQueryState(["userQuery"]));
    console.log(queryClient.getQueryData(["userQuery"])); // 로그인이 됐는지 안됐는지 확인 가능
    const isLogin = !!queryClient.getQueryData(["userQuery"]);
    
    useEffect (() => {
        if(isLogin) {
            navigate("/");
        }
    },[]); // 빈[]이므로 한번만 실행 

    

    return (
        <>
            {
                !isLogin &&
                <Routes>
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            }
        </>
        
    );
}

export default AuthRoute;