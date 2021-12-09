import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import Thumbnail from "./Thumbnail";

const View = () => {
    const currentDirPath = useSelector(state => state.dirReducer);
    const [dirs, setDirs] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);
    const [preDir, setPreDir] = useState("");
    const [added, setAdded] = useState([]);
    const addInfo = ["add", "add"];
    const backInfo = ["back", "back"];


    useEffect(() => {
        axios.get(`/api/getFilesName?message=${currentDirPath}`)
        .then((response) => {
            let fileInfos = response.data;
            let dirInfos = []

            for(let i = fileInfos.length - 1; i >= 0; i--){ // 디렉토리 파일인 경우 앞으로 땡기기
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

        if(added.length > 0){
            if(added[0][0].indexOf('.') === -1 && added[0][1] === null){
                let preDirs = dirs;
                let i = 0;

                while(i < preDirs.length){
                    if(added[0][0].toLowerCase() > preDirs[i][0].toLowerCase()) i++;
                    else break;
                }

                preDirs.splice(i, 0, added[0]);
                setDirs(preDirs);
            }else{
                let preThumbnails = thumbnails;
                let i = 0;
                for(let j = 0; j < added.length; j++){
                    while(i < preThumbnails.length){
                        if(added[j][0].toLowerCase() > preThumbnails[i][0].toLowerCase()) i++;
                        else break;
                    }
                    preThumbnails.splice(i, 0, added[j]);
                }
                console.log(preThumbnails);
                setThumbnails(preThumbnails);
            }

            setAdded([]);
        }
    },[added]);

    return(
        <Wrapper>
            <Thumbnail dirPath = {currentDirPath} fileInfo = {addInfo} added = {added} setAdded = {setAdded}/>
            {currentDirPath !== "" ?
            <Thumbnail dirPath = {currentDirPath} fileInfo = {backInfo}/> : null}
            {preDir === currentDirPath ? 
            dirs.map((dirInfo) => (<Thumbnail dirPath = {currentDirPath} fileInfo = {dirInfo}/>)) : null}
            {preDir === currentDirPath ? 
            thumbnails.map((fileInfo) => (<Thumbnail dirPath = {currentDirPath} fileInfo = {fileInfo}/>)) : null}
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