import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const Header = (props) => {
    const history = useHistory();

    const Wrapper = styled.div`
        height: 50px;
        text-align: center;
        padding-top: 10px;
    `

    const Logo = styled.div`
        display:inline-block;
        font-size: 30px;
        margin-left: 120px;
        font-weight: 500;
    `

    const Button = styled.button`
        cursor: pointer;
        margin-right: 20px;
        float: right;
        width: 100px;
        height: 40px;
        font-size: 20px;
        background-color: #E9F9EE;
        border: 1px solid #000;
    `

    // useHistory 사용하여 logout하면 세션 없애고 Login으로 이동시킴
    const logout = () => {
        if(window.confirm("로그아웃 하시겠습니까?") === true){
            sessionStorage.removeItem("isAuthorized");
            history.push("/login");
        }
    };

    return(
        <Wrapper>
            <Logo>📁File Viewer</Logo>
            <Button onClick = {() => logout()}>Logout</Button>
        </Wrapper>
    );
}

export default Header;