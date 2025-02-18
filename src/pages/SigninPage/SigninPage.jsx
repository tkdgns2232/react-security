import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, setAccessToken } from '../../api/config/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';



/**
 * 로그인 요구사항
 * 각 필드가 공백인지만 체크(공백이면 아래 오류 메세지로 출력)
 * 로그인 버튼 클릭시 /api/auth/signin 요청 
 * -> 응답받은 accessToken을 localstorage에 AccessToken이라는 키값으로 저장 
 * Index페이지로 이동
 * 계정이 없으신가요? 회원가입
 * 
 * 리엑트
상태관리

usestate(초기값): // 초기값에는 숫자 문자열 배열 객체 

리턴 데이터는 배열로 받는다 
ex [ 현재 상태 값, setter 함수]

const [ value, setValue ] = useState(10);
setValue(20); 

태그의 집합 = 함수 / 대문자 시작
props 객체 {} 비구조 할당 가능

렌더링하는 경우
1.최초 렌더링 <- 마운트 
2.상태 변화
3.자식 관점 -> 부모 렌더링
4.지역 상태                        전역 상태 종류(Recoil,React-query)
 */
function SigninPage(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [ signinInput, setSigninInput ] = useState({
        username: "",
        password: "",
    });

    const [ errors, setErrors ] = useState({
        username: "",
        password: "",
    });

    const [ isSigninError, setSigninError ] = useState(false);

    const handleInputOnBlur = (e) => {
        const { name, value } = e.target;
        setErrors(prev => ({
            ...prev,
            [name]: !(value.trim()) ? `${name}을 입력하세요.` : "",
        }));
    }

    const handleSigninInputOnChange = (e) => {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value,
        });
    }

    const handleSigninButtonOnClick = async () => {
        if(Object.entries(errors).filter(entry => !!entry[1]) > 0) {
            return;
        }

        try {
            const response = await api.post("/api/auth/signin", signinInput);
            const accessToken = response.data.data;
            setAccessToken(accessToken);
            queryClient.invalidateQueries({queryKey: ["userQuery"]});
            navigate("/");
            // window.location.href = "/";
        } catch(error) {
            setSigninError(true);
        }
    }

    return (
        <Box mt={10}>
            <Container maxWidth={"xs"}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' textAlign={'center'}>로그인</Typography>
                        <Box display={"flex"} flexDirection={'column'} gap={2}>
                            <TextField type='text' label="username" name='username' 
                                onChange={handleSigninInputOnChange} value={signinInput.username}
                                onBlur={handleInputOnBlur}
                                error={!!errors.username}
                                helperText={errors.username} />
                            <TextField type='password' label="password" name='password' 
                                onChange={handleSigninInputOnChange} value={signinInput.password}
                                onBlur={handleInputOnBlur}
                                error={!!errors.password}
                                helperText={errors.password} />
                            {
                                isSigninError && 
                                <Typography variant='body2' textAlign={'center'} color='red'>
                                    사용자 정보를 다시 확인하세요.
                                </Typography>
                            }
                            
                            <Button variant='contained' onClick={handleSigninButtonOnClick}>로그인</Button>
                        </Box>
                        <Typography variant='h6' textAlign={'center'}>
                            계정이 없으신가요? <Link to={"/auth/signup"}>회원가입</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default SigninPage;