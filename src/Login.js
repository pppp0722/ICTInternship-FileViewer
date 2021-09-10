import React, {useState} from 'react';
import styled from 'styled-components';

const Login = () => {
    const Wrapper = styled.div`
        display: inline-block;
        background-color: #BFEDCC;
        width: 1200px;
        height: 600px;
    `;
    
    const Inner = styled.div`
        margin: 100px 0 0 0;
        display: inline-block;
        background-color: #B6C9BB;
        width: 800px;
        height: 400px;
    `

    const DivInput = styled.div`
        margin: 130px 0 0 225px;
        width: 300px;
        height: 130px;
    `

    const Text = styled.div`
        display: inline-block;
        width: 50px;
        height: 30px;
        font-size: 20px;
    `

    const Input = styled.input`
        margin 0 0 20px 0;
        width: 230px;
        height: 30px;
        font-size: 18px;
    `;

    const Button = styled.button`
        width: 90px;
        height: 30px
    `;

    const [inputs, setInputs] = useState({
        id: "",
        pw: ""
    });

    const {id, pw} = inputs;

    const onChange = (e) =>{
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const submit = () =>{

    };

    return(
        <Wrapper>
            <Inner>
                <DivInput>
                    <Text>ID</Text>
                    <Input name = "id" placeholder = "ID" value = {id} onChange = {onChange}/>
                    <Text>PW</Text>
                    <Input name = "pw" placeholder = "PW" value = {pw} onChange = {onChange}/>
                </DivInput>
                <Button onClick = {submit}>Login</Button>
            </Inner>
        </Wrapper>
    );
}

export default Login;