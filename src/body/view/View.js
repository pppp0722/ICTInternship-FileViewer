import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import Thumbnail from "./Thumbnail";

const View = () => {
    const currentDirPath = useSelector(state => state.dirReducer);
    const [dirs, setDirs] = useState([]); // 디렉토리 리스트
    const [thumbnails, setThumbnails] = useState([]); // 파일 리스트
    const [preDir, setPreDir] = useState(""); // 다른 디렉토리 이동 시 자연스럽게 이동하기 위한 state
    const [added, setAdded] = useState([]); // 프론트에서 디렉토리 or 파일 추가 시 사용하는 state
    const addInfo = ["add", "add"];
    const backInfo = ["back", "back"];


    useEffect(() => {
        axios.get(`/api/getFilesName?message=${currentDirPath}`) // 현재 디렉토리에 있는 파일들 가져옴
        .then((response) => {
            let fileInfos = response.data;
            let dirInfos = []

            for(let i = fileInfos.length - 1; i >= 0; i--){ // 디렉토리 파일인 경우 빼서 dir에 저장
                if(fileInfos[i][1] === null && fileInfos[i][0].indexOf('.') === -1){
                    dirInfos.unshift(fileInfos.splice(i, 1)[0]);
                }
            }

            setDirs(dirInfos);
            setThumbnails(fileInfos);
            setPreDir(currentDirPath);
        }).catch((error) => {
            alert("오류가 발생하였습니다.");
        });
    },[currentDirPath]);

    useEffect(() => {
        if(added.length > 0){ // 추가한 파일이 있으면
            if(added[0][0].indexOf('.') === -1 && added[0][1] === null){ // 디렉토리 추가 시
                let preDirs = dirs;
                let i = 0;

                while(i < preDirs.length){
                    if(added[0][0].toLowerCase() > preDirs[i][0].toLowerCase()) i++;
                    else break;
                }

                preDirs.splice(i, 0, added[0]);
                setDirs(preDirs); // 기존 dirs에 알파벳 순 위치에 넣어 줌
            }else{ // 파일 추가 시
                let preThumbnails = thumbnails;
                let i = 0;
                for(let j = 0; j < added.length; j++){
                    while(i < preThumbnails.length){
                        if(added[j][0].toLowerCase() > preThumbnails[i][0].toLowerCase()) i++;
                        else break;
                    }
                    preThumbnails.splice(i, 0, added[j]);
                }
                setThumbnails(preThumbnails); // 추가 된 파일 모두 기존 thumbnails에 알파벳 순 위치에 넣어 줌
            }

            setAdded([]); // 추가 했으니, added 초기화
        }
    },[added]);

    // Thumbnail 중 add는 4개, 나머지는 2개 props 가짐
    // dirPath: Thumbnail이 위치한 디렉토리 주소
    // fileInfo: {0: fileName, 1: fileType}
    // added, setAdded: 디렉토리, 파일 추가를 위한 props
    return(
        <Wrapper>
            <Inner>
                <Thumbnail dirPath = {currentDirPath} fileInfo = {addInfo} added = {added} setAdded = {setAdded}/>
                {currentDirPath !== "" ?
                <Thumbnail dirPath = {currentDirPath} fileInfo = {backInfo}/> : null}
                {preDir === currentDirPath ? 
                dirs.map((dirInfo) => (<Thumbnail dirPath = {currentDirPath} fileInfo = {dirInfo}/>)) : null}
                {preDir === currentDirPath ? 
                thumbnails.map((fileInfo) => (<Thumbnail dirPath = {currentDirPath} fileInfo = {fileInfo}/>)) : null}
            </Inner>
        </Wrapper>
    );
}
 
export default View;

const Wrapper = styled.div`
    display: inline-block;
    width: 80%;
    height: 100%;
    overflow-y: scroll;
`

const Inner = styled.div`
    padding: 14px 0 14px 14px;
`