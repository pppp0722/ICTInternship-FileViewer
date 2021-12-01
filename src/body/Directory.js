import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setDir } from "../redux/actions";
import DirectoryBackground from "./DirectoryBackground";

const Directory = (props) => {
    const Container = styled.div`
    `

    const Wrapper = styled.div`
    `

    const Row = styled.div`
        position: absolute;
    `

    const Left = styled.div`
        display: inline-block;
        width: 15px;
        margin-left: ${props.depth * 10}px;

        &:hover{
            color: ${props.dirPaths.length === 1 ? "#FFF" : "blue"};
        }
    `
    
    const Unfold = styled.div`
        cursor: pointer;
        display: ${props.dirPaths.length > 1 ? "inline-block" : "none"};
        font-weight: bold;
    `

    const DirName = styled.div`
        cursor: pointer;
        display: inline-block;
    `

    const dispatch = useDispatch();

    const dirName = props.dirPaths[0].replace(props.prePath + '\\', "");

    const [isOpend, setIsOpend] = useState(false);

    const [childDirs, setChildDirs] = useState();
    
    if(dirName === "overlay") console.log(isOpend);

    const unFoldDir = () => {
        if(isOpend){
            setIsOpend(false);
            return;
        }

        const dirPathsArray = props.dirPaths;
        let dirPaths = [];

        let i = 1;

        while (i < dirPathsArray.length){
            let dirs = [];
            dirs.push(dirPathsArray[i]);

            let j = 1;
            for (let k = i + 1; k < dirPathsArray.length; k++){
                if (dirPathsArray[k].startsWith(dirPathsArray[i]) && dirPathsArray[k].substr(dirPathsArray[i].length).includes('\\')){
                    dirs.push(dirPathsArray[k]);
                    j++;
                } else{
                    break;
                }
            }

            dirPaths.push(dirs);
            i = i + j;
        }

        const childs = dirPaths.map((dirPath) => (<Directory dirPaths = {dirPath} prePath = {dirPathsArray[0]} depth = {props.depth + 1}/>));
        setChildDirs(childs);
        setIsOpend(true);
    }

    const clickDirName = () => {
        dispatch(setDir(props.dirPaths[0]));
    }

    return (
        <Container>
            <Wrapper>
                <Row>
                <Left onClick = {unFoldDir}>
                    <Unfold>></Unfold>
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
                <DirectoryBackground dirPath = {props.dirPaths[0]}/>
            </Wrapper>
            {isOpend ? childDirs : null}
        </Container>
    );
}

export default Directory;