import React, {useState} from 'react';
import styled from 'styled-components';
import UserData from "./UserData.json";

import { useHistory } from 'react-router-dom';

const Login = () => {
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
        font-size: 50px;
    `

    const DivInput = styled.div`
        padding: 15px 0 15px 0;
    `

    const Text = styled.div`
        display: inline-block;
        width: 50px;
        height: 30px;
        font-size: 20px;
    `

    const Input = styled.input`
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
    `;

    // id, pw 두 개를 입력 받으므로 쌍으로 useState 만들어줌
    const [inputs, setInputs] = useState({
        id: "",
        pw: ""
    });

    const {id, pw} = inputs;

    // input form에서 문자 바뀌면 useState 바꿔줌
    const onChange = (e) =>{
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    // useHistory를 사용하여 특정 라우트로 보낼 수 있음
    const history = useHistory();

    const submit = () =>{
        if(inputs.id === UserData.id && inputs.pw === UserData.pw){
            sessionStorage.setItem("isAuthorized","true");
            alert("로그인 성공");
            history.push("/home");
        }else{
            alert("로그인 실패");
        }
    };

    return(
        <Wrapper>
            <Inner>
                <Context>
                    <Logo>File Viewer</Logo>
                    <DivInput>
                        <Text>ID</Text>
                        <Input name = "id" placeholder = "ID" value = {id} onChange = {onChange}/>
                    </DivInput>
                    <DivInput>
                        <Text>PW</Text>
                        <Input name = "pw" placeholder = "PW" value = {pw} onChange = {onChange}/>
                    </DivInput>
                    <Button onClick = {submit} onClick = {submit}>Login</Button>
                </Context>
            </Inner>
        </Wrapper>
    );
}

export default Login;