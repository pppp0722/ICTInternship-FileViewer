import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const Header = (props) => {
    let menu = props.menu;
    const [current, setCurrent] = useState("home");

    const Wrapper = styled.div`
        background-color: #BFEDCC;
        height: 100px;
        width: 1200px;
    `
    const Top = styled.div`
        padding-top: 5px;
        width: 1200px;
        height: 50px;
        text-align: center;
    `

    const Logo = styled.div`
        cursor: pointer;
        display:inline-block;
        font-size: 30px;
        margin-left: 105px;
        font-weight: 500;
    `

    const Button = styled.button`
        cursor: pointer;
        margin-right: 5px;
        float: right;
        width: 100px;
        height: 40px;
        font-size: 20px;
    `

    const Bottom = styled.div`
        width: 1200px;
        height: 50px;
        text-align: center;
    `

    const MenuButton = styled.div`
        margin: 0 1px 0 1px;
        cursor: pointer;
        width: 130.5px;
        height: 40px;
        font-size: 13px;
        font-weight: 500;
        display: inline-block;
        line-height: 40px;

        background-color: ${props => props.name === menu ? "#E9F9EE" : "#B6C9BB"};

        &:hover{
            background-color: ${props => props.name === menu ? "#E9F9EE" : "#A5B8A7"};
        };

        &:active{
            background-color: ${props => props.name === menu ? "#E9F9EE" : "#C7DACC"};
        }
    `

    const history = useHistory();

    const logout = () => {
        setCurrent("home");
        props.setMenu("home");
        sessionStorage.removeItem("isAuthorized");
        history.push("/login");
    };

    const toHome = () =>{
        setCurrent("home");
        props.setMenu("home");
    }

    const menuButtonClick = (name) => {
        setCurrent(name);
        props.setMenu(name);
    };

    return(
        <Wrapper>
            <Top>
                <Logo onClick = {toHome}>📁File Viewer</Logo>
                <Button onClick = {logout}>Logout</Button>
            </Top>
            <Bottom>
                <MenuButton name = "home" onClick = {() => menuButtonClick("home")}>Home</MenuButton>
                <MenuButton name = "chromakey" onClick = {() => menuButtonClick("chromakey")}>크로마키 소스</MenuButton>
                <MenuButton name = "overlay" onClick = {() => menuButtonClick("overlay")}>오버레이 소스</MenuButton>
                <MenuButton name = "animation" onClick = {() => menuButtonClick("animation")}>애니메이션 소스</MenuButton>
                <MenuButton name = "meme" onClick = {() => menuButtonClick("meme")}>움짤, 짤모음</MenuButton>
                <MenuButton name = "transition_motion" onClick = {() => menuButtonClick("transition_motion")}>전환효과, 모션그래픽</MenuButton>
                <MenuButton name = "bgm" onClick = {() => menuButtonClick("bgm")}>효과음, 브금</MenuButton>
                <MenuButton name = "shockwave_inkmat" onClick = {() => menuButtonClick("shockwave_inkmat")}>쇼크웨이브, 잉크매트</MenuButton>
                <MenuButton name = "mr" onClick = {() => menuButtonClick("mr")}>MR 소스</MenuButton>
            </Bottom>
        </Wrapper>
    );
}

export default Header;