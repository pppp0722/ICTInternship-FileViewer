import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setDir } from "../../redux/actions";
import DirectoryBg from "./DirectoryBg";

const Directory = (props) => {
    const dispatch = useDispatch();

    const dirName = props.dirPaths[0].replace(props.prePath + '/', "");
    const [isOpend, setIsOpend] = useState(false);
    const [childDirs, setChildDirs] = useState();

    const unFoldDir = () => {
        if(isOpend){
            setIsOpend(false);
            return;
        }
  
        // 아래 알고리즘을 설명하자면, Side.js에 있는 주석과 같이
        // 받아온 디렉토리 정보는 {0: "", 1: "a", 2: "a/b", 3: "a/b/c", 4: "a/c", 5: "b", 6: "b/c"}와 같이 정렬되어 있음
        // 따라서 위와 같은 배열의 경우 [["a", "a/b", "a/b/c", "a/c"], ["b", "b/c"]]와 같이 root 이하 디렉토리를 서브 트리 느낌으로 묶어줌
        // 펼치기 버튼을 누르면 위와 같이 묶은 배열들을 props로 넘겨주면서 Directory들을 생성하는 것
        const dirPaths = props.dirPaths;
        let subDirPaths = []; // 자신보다 depth 하나 낮은 디렉토리들을 root로 하는 디렉토리 이름 배열들
        let i = 1;
        while (i < dirPaths.length){
            let subDirPath = []; // 자신보다 depth 하나 낮은 디렉토리들을 root로 하는 디렉토리 정보 배열
            subDirPath.push(dirPaths[i]);

            let skip = 1;
            for (let j = i + 1; j < dirPaths.length; j++){ // 현재 디렉토리보다 depth 하나 낮은 디렉토리를 root로 하는 디렉토리 정보 배열인 subDirPath를 만듬
                if (dirPaths[j].startsWith(dirPaths[i]) && dirPaths[j].substr(dirPaths[i].length).includes('/')){ // root와 같은 이름으로 시작하면서 root보다 '/'가 더 존재하면 root 이하 디렉토리
                    subDirPath.push(dirPaths[j]);
                    skip++;
                } else{
                    break;
                }
            }

            subDirPaths.push(subDirPath); // 만들어놓은 subDirPath를 모아 subDirPaths를 만듬
            i += skip; // 넣은 디렉토리 이름은 skip
        }

        // 만든 depth 하나 낮은 디렉토리들 root로 한 배열들로 Directory 생성
        const childDirectories = subDirPaths.map((subDirPath) => (<Directory dirPaths = {subDirPath} prePath = {dirPaths[0]} depth = {props.depth + 1}/>));
        setChildDirs(childDirectories);
        setIsOpend(true);
    }

    const clickDirName = () => {
        dispatch(setDir(props.dirPaths[0]));
    }

    return (
        <Container>
            <Wrapper>
                <Row>
                <Left onClick = {unFoldDir} depth = {props.depth} length = {props.dirPaths.length}>
                    <Unfold length = {props.dirPaths.length}>></Unfold>
                </Left>
                {dirName === "" ? 
                <DirName onClick = {clickDirName}>
                    📚resources
                </DirName> :
                <DirName onClick = {clickDirName}>
                    📁{dirName}
                </DirName>
                }
                </Row>
                <DirectoryBg dirPath = {props.dirPaths[0]}/>
            </Wrapper>
            {isOpend ? childDirs : null}
        </Container>
    );
}

export default Directory;

const Container = styled.div`
`

const Wrapper = styled.div`
`

const Row = styled.div`
    cursor: pointer;
    width: 239px;
    height: 23px;
    &:hover{
        background-color: #DDEEFF;
    }
    position: absolute;
`

const Left = styled.div`
        display: inline-block;
        width: 15px;
        margin-left: calc(5px + ${props => props.depth * 10}px);

        &:hover{
            color: ${props => props.length === 1 ? "#FFF" : "blue"};
        }
    `

const Unfold = styled.div`
        cursor: pointer;
        display: ${props => props.length > 1 ? "inline-block" : "none"};
        font-weight: bold;
    `

const DirName = styled.div`
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
`