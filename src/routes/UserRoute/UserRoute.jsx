import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';

function UserRoute(props) {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isLogin = !!queryClient.getQueryData(["userQuery"]);
    
    useEffect (() => {
        if(!isLogin) {
            alert("잘못된 접근입니다.");
            navigate("/auth/signin"); // 로그인이 안됐으면 로그인 페이지로 전달
            return;
        }
    },[]); // 빈[]이므로 한번만 실행 


    return (
        <>
            {
                isLogin &&
                <Routes>
                    <Route path='/profile' element={<ProfilePage/>} />
                </Routes>
            }
        </>
    );
}

export default UserRoute;