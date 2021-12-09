import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

const Login = () => {
    const [id, setId] = useState();
    const [pw, setPw] = useState();

    // 현재 focus 중인 input (타이핑할 때마다 focus 사라져서 추가)
    const [focus, setFocus] = useState("id");

    const history = useHistory();

    // id 입력 시 id input focus, pw 입력 시 pw input focus & 입력 값 state에 저장
    const handleId = (e) =>{
        if(focus !== "id") setFocus("id");
        setId(e.target.value);
    }

    const handlePw = (e) =>{
        if(focus !== "pw") setFocus("pw");
        setPw(e.target.value);
    }

    // id & pw 일치 시 본문으로 이동
    const attemptLogin = async () =>{
        const formData = new FormData();
        formData.append("id", id);
        formData.append("pw", pw);
        axios.post('/api/login', formData)
        .then((response) => {
            if(response.status === 200){
                if(response.data === "match"){
                    sessionStorage.setItem("isAuthorized","true");
                    history.push("/");
                    alert("로그인 성공!");
                }else if(response.data === "mismatch"){
                    alert("ID, PW가 일치하지 않습니다.");
                }
            }else{
                alert("오류가 발생하였습니다.");
            }
        }).catch((error) => {
            alert("오류가 발생하였습니다.");
        });
    };

    // enter 입력 시 submit
    const handleKeyPress = (e) => {
        if(e.key === "Enter"){
            attemptLogin();
        }
    };

    return(
        <Wrapper>
            <Inner>
                <Context>
                    <Logo>📁File Viewer</Logo>
                    <Text>ID</Text>
                    <InputId autoFocus = {focus === "id" ? true : false}  type = "text" name = "id" placeholder = "ID" value = {id} onChange = {handleId} onKeyPress = {handleKeyPress}/>
                    <Text>PW</Text>
                    <InputPw autoFocus = {focus === 'pw' ? true : false} type = "password" name = "pw" placeholder = "PW" value = {pw} onChange = {handlePw} onKeyPress = {handleKeyPress}/>
                    <Button onClick = {attemptLogin}>Login</Button>
                </Context>
            </Inner>
        </Wrapper>
    );
}

export default Login;

const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #BFEDCC;
    width: 1280px;
    height: 720px;
`;
    
const Inner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #B6C9BB;
    width: 853px;
    height: 480px;
`

const Context = styled.div`
    width: 320px;
`

const Logo = styled.div`
    margin-bottom: 30px;
    font-size: 50px;
`

const Text = styled.div`
    margin-bottom: 30px;
    width: 50px;
    height: 30px;
    display: inline-block;
    font-size: 25px;
    font-weight: 500;
`

const InputId = styled.input`
    display: inline-block;
    float: right;
    width: 240px;
    height: 30px;
    font-size: 20px;
`;

const InputPw = styled.input`
    display: inline-block;
    float: right;
    width: 240px;
    height: 30px;
    font-size: 20px;
`;

const Button = styled.button`
    display: block;
    width: 320px;
    height: 60px;
    font-size: 20px;
`;