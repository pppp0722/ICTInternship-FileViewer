import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import UserData from "./UserData.json";
import axios from 'axios';

import { useHistory } from 'react-router-dom';

const Login = () => {
     const Container = styled.div`
        display: flex;
        justify-content: center;

    `;

    const Wrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #BFEDCC;
        width: 1200px;
        height: 600px;
    `;
    
    const Inner = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #B6C9BB;
        width: 800px;
        height: 400px;
    `

    const Context = styled.div`
        justify-content: center;
        align-items: center;
    `

    const Logo = styled.div`
        padding: 15px 0 15px 0;
        font-size: 46px;
        font-weight: 500;
    `

    const DivInput = styled.div`
        padding: 15px 0 15px 0;
    `

    const Text = styled.div`
        display: inline-block;
        width: 50px;
        height: 30px;
        font-size: 20px;
        font-weight: 500;
    `

    const InputId = styled.input`
        display: inline-block;
        width: 240px;
        height: 30px;
        font-size: 18px;
    `;

    const InputPw = styled.input`
        display: inline-block;
        width: 240px;
        height: 30px;
        font-size: 18px;
    `;

    const Button = styled.button`
        padding: 15px 0 15px 0;
        display: block;
        width: 300px;
        height: 50px;
        font-size: 20px;
        font-weight: 500;
    `;

    // id, pw 두 개를 입력 받으므로 쌍으로 useState 만들어줌
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    // true면 ID 입력 포커스, false면 PW 입력 포커스
    const [focus, setFocus] = useState(true);

    // input form에서 문자 바뀌면 useState 바꿔줌
    const handleId = (e) =>{
        if(!focus) setFocus(true);
        setId(e.target.value);
    }

    const handlePw = (e) =>{
        if(focus) setFocus(false);
        setPw(e.target.value);
    }

    // useHistory를 사용하여 특정 라우트로 보낼 수 있음
    const history = useHistory();

    const success = (strArray) => {
        if(id === strArray[0] && pw === strArray[1]){
            sessionStorage.setItem("isAuthorized","true");
            history.push("/");
            alert("로그인 성공!");
        }else{
            alert("로그인 실패!");
        }
    };

    // id와 pw가 계정과 일치하면 권한 세션 주고 본문으로 이동 일치하지 않으면 실패
    const submit = () =>{
        axios.get("/api/login")
        .then((result) => {
            let res = result.data
            let strArray = res.split(',');

            success(strArray);
        }).catch((error) => {
            console.log("can't access");
        });
    };

    // Enter 키 입력 시 submit
    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            submit();
        }
    };

    return(
        <Container>
            <Wrapper>
                <Inner>
                    <Context>
                        <Logo>📁File Viewer</Logo>
                        <DivInput>
                            <Text>ID</Text>
                            {focus ? <InputId autoFocus type = "text" name = "id" placeholder = "ID" value = {id} onChange = {handleId} onKeyPress = {handleKeyPress}/>
                            : <InputId type = "text" name = "id" placeholder = "ID" value = {id} onChange = {handleId} onKeyPress = {handleKeyPress}/>}
                        </DivInput>
                        <DivInput>
                            <Text>PW</Text>
                            {focus ? <InputPw type = "password" name = "pw" placeholder = "PW" value = {pw} onChange = {handlePw} onKeyPress = {handleKeyPress}/>
                            : <InputPw autoFocus type = "password" name = "pw" placeholder = "PW" value = {pw} onChange = {handlePw} onKeyPress = {handleKeyPress}/>}
                        </DivInput>
                        <Button onClick = {() => submit()}>Login</Button>
                    </Context>
                </Inner>
            </Wrapper>
        </Container>
    );
}

export default Login;