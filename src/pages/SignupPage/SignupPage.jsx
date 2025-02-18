import {Box, Button, Card, CardContent, Container, TextField, Typography}  from '@mui/material/';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/config/axiosConfig';


function SignupPage(props) {

    const navigate = useNavigate();

    const [signupInput, setSignUpInput] = useState({
        username: "",
        password: "",
        name: "",
        email: ""
    });

    const [ errors, setErrors ] = useState({
        username: "",
        password: "",
        name: "",
        email: ""
    });

    const handleSignupInputOnChange = (e) => {
        setSignUpInput({
            ...signupInput,
            [e.target.name]: e.target.value,
        });
    }

    const handleInputOnBlur = (e) => {
        const { name, value } = e.target;
        let message = "";
        if(name === "username" && !(/^[a-zA-Z0-9_-]{4,16}$/.test(value))) {
            message = "올바른 사용자 이름을 입력하세요."
        }
        if(name === "password" && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?]).{8,}$/.test(value))) {
            message = "영어 대소문자, 숫자, 특수문자를 하나 이상 포함하며 8자로 이상으로 작성하세요.";
        }
        if(name === "name" && !(/^[가-힣]{2,}$/.test(value))) {
            message = "한글 이름만 가능합니다."
        }
        if(name === "email" && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value))) {
            message = "올바른 이메일을 입력하세요."
        }
        

        setErrors({
            ...errors,
            [name]: message
        });
        
    }

    const handleSignupButtonOnClick = async () => {
        if(Object.entries(errors).filter(entry => !!entry[1]).length > 0) { // Object.entries는 객체의 [key, value] 쌍을 배열로 반환한다.
            return;
        } 
        try{
            await api.post("/api/auth/signup", signupInput);
            alert("회원가입 완료.");
            navigate("/auth/signin");
        } catch(error) {
            setErrors({
                username: error.response.data.username,
                password: "", // 초기화
                name: "", // 초기화
                email: "" // 초기화 
            });
        }
    }

    // const handleSignupButtonOnClick = async () => {
    //    try{
    //         const response = await api.post("/api/auth/signup", signupInput);
    //         console.log(response.data);
    //    }catch(error) {
    //         console.error(error.response.data.data);
    //         let newError = {};
    //         const responseErrors = error.response.data.data;
    //     for(let e of responseErrors){
    //         const errorEntry = Object.entries(e)[0];
    //         newError = {
    //             ...errors,
    //             [errorEntry[0]]: errorEntry[1],
    //         };
    //     }
    //     setErrors({
    //         username: "",
    //         password: "",
    //         name: "",
    //         email: "",
    //         ...newError
    //     });

    // }
        
    // }

    console.log(errors);

    return (
        <Box mt={10}>
            <Container maxWidth={"xs"}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' textAlign={'center'}>회원가입</Typography>
                        <Box display={"flex"} flexDirection={'column'} gap={2}>
                            <TextField type='text' label="username" name='username' 
                            onChange={handleSignupInputOnChange} value={signupInput.username}
                            onBlur={handleInputOnBlur}
                            error={!!errors.username}
                            helperText={errors.username}/>
                            <TextField type='password' label="password" name='password' 
                            onChange={handleSignupInputOnChange} value={signupInput.password}
                            onBlur={handleInputOnBlur}
                            error={!!errors.password}
                            helperText={errors.password}/>
                            <TextField type='text' label="name" name='name' 
                            onChange={handleSignupInputOnChange} value={signupInput.name}
                            onBlur={handleInputOnBlur}
                            error={!!errors.name}
                            helperText={errors.name}/>
                            <TextField type='email' label="email" name='email' 
                            onChange={handleSignupInputOnChange} value={signupInput.email}
                            onBlur={handleInputOnBlur}
                            error={!!errors.email}
                            helperText={errors.email}/>
                            <Button variant='contained' onClick={handleSignupButtonOnClick}>가입하기</Button>
                        </Box>
                        <Typography variant='h6' textAlign={'center'}>
                            이미 계정이 있나요? <Link to={"/auth/signin"}>로그인</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}


export default SignupPage;