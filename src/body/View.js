import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import Thumbnail from "./Thumbnail";

const View = () => {
    const Wrapper = styled.div`
        display: inline-block;
        width: 80%;
        height: 100%;
        overflow-y: scroll;
    `
    
    const Table = styled.div`
        width: 100%;
        height: 100%;
    `

    const dirStore = useSelector(state => state.dirReducer);
    const [thumbnails, setThumbnails] = useState([]);
    const [lastDir, setLastDir] = useState("");

    useEffect(() => {
        axios.get(`/api/getFilesName?message=${dirStore}`)
        .then((response) => {
            const fileInfos = response.data;
            for(let i = 0; i < fileInfos.length; i++){
                if(fileInfos[i][1] === null && fileInfos[i][0].indexOf('.') === -1){
                    fileInfos.unshift(fileInfos.splice(i, 1)[0]);
                }
            }
            if(dirStore !== ""){
                const goBack = ["back", "back"];
                fileInfos.unshift(goBack);
            }
            const thumbnailList = fileInfos.map((fileInfo) => (<Thumbnail dirPath = {dirStore} fileInfo = {fileInfo}/>));
            setThumbnails(thumbnailList);
            setLastDir(dirStore);
        }).catch((error) => {
            console.log(error);
        });
    },[dirStore]);

    return(
        <Wrapper>
            <Table>
                {lastDir === dirStore ?
                thumbnails :
                null}
            </Table>
        </Wrapper>
    );
}

export default View;