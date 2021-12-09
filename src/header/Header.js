import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDir } from '../redux/actions';

const Header = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentDirPath = useSelector(state => state.dirReducer);

    // logout 시 session 삭제 후 '/login'으로 push
    const logout = () => {
        if(window.confirm("로그아웃 하시겠습니까?") === true){
            sessionStorage.removeItem("isAuthorized");
            history.push("/login");
        }
    };

    // logo 클릭 시 디렉토리 초기화 후 '/'로 다시 push
    const home = () => {
        dispatch(setDir(""));
        history.push('/');
    }

    return(
        <Wrapper>
            <Logo onClick = {home}>📁File Viewer</Logo>
            <Button onClick = {() => logout()}>Logout</Button>
            <Path>{currentDirPath !== '' ?'📁resources/' + currentDirPath : '📚resources'}</Path>
        </Wrapper>
    );
}

export default Header;

const Wrapper = styled.div`
`

const Logo = styled.div`
    height: 40px;
    display:inline-block;
    font-size: 30px;
    cursor: pointer;
    margin-left: calc(50% - 100px);
    margin-bottom: 10px;
`

const Button = styled.button`
    cursor: pointer;
    float: right;
    width: 100px;
    height: 40px;
    font-size: 20px;
    background-color: #E9F9EE;
    border: 1px solid grey;

    &:hover{
        background-color: #D8E8DD
    }
`

const Path = styled.div`
    padding-left: 20px;
    display: inline-block;
    width: calc(100% - 22px);
    height: 40px;
    background-color: #FFF;
    border: 1px solid grey;
    line-height: 40px;
    overflow: hidden;
    margin-bottom: 10px;
`