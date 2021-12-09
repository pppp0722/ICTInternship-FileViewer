import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setDir } from "../../redux/actions";

const DirectoryBg = (props) => {
    const currentDirPath = useSelector(state => state.dirReducer);
    const dispatch = useDispatch();

    const clickDirBg = () => {
        dispatch(setDir(props.dirPath));
    }

    return (
        <Wrapper onClick = {clickDirBg} dirPath = {props.dirPath} currentDirPath = {currentDirPath}>
        </Wrapper>
    );
}

export default DirectoryBg;

const Wrapper = styled.div`
    width: 239px;
    height: 23px;
    background-color: ${props => props.dirPath === props.currentDirPath ? "#B0C0DD" : "#FFF"};
`