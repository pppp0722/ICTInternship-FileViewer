import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setDir } from "../../redux/actions";

const DirectoryBg = (props) => {
    // useSelector 사용 시 렌더링을 하게 되어 Directory에서 사용 시 펼치기 했던 것이 닫아지는 문제가 발생하여 DirectoryBg를 따로 만들었음
    const currentDirPath = useSelector(state => state.dirReducer);
    const dispatch = useDispatch();

    // 클릭 시 해당 디렉토리로 redux state 변경
    const clickDirBg = () => {
        dispatch(setDir(props.dirPath));
    }

    return (
        <Wrapper onClick = {clickDirBg} dirPath = {props.dirPath} currentDirPath = {currentDirPath}>
        </Wrapper>
    );
}

export default DirectoryBg;

// 현재 디렉토리 path와 같으면 배경 색상 다르게 해줌
const Wrapper = styled.div`
    width: 239px;
    height: 23px;
    background-color: ${props => props.dirPath === props.currentDirPath ? "#B0C0DD" : "#FFF"};
`