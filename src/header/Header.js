import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDir } from '../redux/actions';

const Header = (props) => {
    const history = useHistory();

    const dispatch = useDispatch();

    const path = useSelector(state => state.dirReducer);

    const Wrapper = styled.div`
    `

    const Top = styled.div`
        height: 50px;
        text-align: center;
        padding-top: 10px;
    `

    const Logo = styled.div`
        display:inline-block;
        font-size: 30px;
        margin-left: 120px;
        font-weight: 500;
        cursor: pointer;
    `

    const Button = styled.button`
        cursor: pointer;
        margin-right: 20px;
        float: right;
        width: 100px;
        height: 40px;
        font-size: 20px;
        background-color: #E9F9EE;
        border: 1px solid grey;
    `

    const Work = styled.div`
        display: flex;
        height: 50px;
        padding: 0 20px 0 20px;
    `

    // const Go = styled.button`
    //     display: inline-block;
    //     width: 40px;
    //     height: 40px;
    //     font-size: 25px;
    //     margin-right: 20px;
    //     font-weight: 900;
    //     line-height: 10px;
    //     background-color: #E9F9EE;
    //     border: 1px solid grey;
    // `

    const Path = styled.div`
        padding-left: 20px;
        display: inline-block;
        width: calc(100% - 20px);
        height: 40px;
        background-color: #FFF;
        border: 1px solid grey;
        line-height: 40px;
    `

    // useHistory 사용하여 logout하면 세션 없애고 Login으로 이동시킴
    const logout = () => {
        if(window.confirm("로그아웃 하시겠습니까?") === true){
            sessionStorage.removeItem("isAuthorized");
            history.push("/login");
        }
    };

    // const go = (direction) => {
    //     if(direction === "forward"){
    //         console.log("뒤로 가기");
    //     }else{
    //         console.log("앞으로 가기");
    //     }
    // }

    const home = () => {
        dispatch(setDir(""));
        history.push('/');
    }

    return(
        <Wrapper>
            <Top>
                <Logo onClick = {home}>📁File Viewer</Logo>
                <Button onClick = {() => logout()}>Logout</Button>
            </Top>
            <Work>
                {/* <Go onClick = {() => go("back")}>←</Go>
                <Go onClick = {() => go("forward")}>→</Go> */}
                <Path>{path !== '' ?'📁' + path : '📚resources'}</Path>
            </Work>
        </Wrapper>
    );
}

export default Header;