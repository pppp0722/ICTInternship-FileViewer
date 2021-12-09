import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setDir } from "../../redux/actions";
import DirectoryBg from "./DirectoryBg";

const Directory = (props) => {
    const dispatch = useDispatch();

    console.log(props.prePath);

    const dirName = props.dirPaths[0].replace(props.prePath + '/', "");

    const [isOpend, setIsOpend] = useState(false);

    const [childDirs, setChildDirs] = useState();

    const unFoldDir = () => {
        if(isOpend){
            setIsOpend(false);
            return;
        }

        const tree = props.dirPaths;
        let subTrees = [];
        let i = 1;

        while (i < tree.length){
            let subTree = [];
            subTree.push(tree[i]);

            let skip = 1;
            for (let j = i + 1; j < tree.length; j++){
                if (tree[j].startsWith(tree[i]) && tree[j].substr(tree[i].length).includes('/')){
                    subTree.push(tree[j]);
                    skip++;
                } else{
                    break;
                }
            }

            subTrees.push(subTree);
            i = i + skip;
        }

        const childDirectories = subTrees.map((subTree) => (<Directory dirPaths = {subTree} prePath = {tree[0]} depth = {props.depth + 1}/>));
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