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

    useEffect(() => {
        axios.get(`/api/getFilesName?message=${dirStore}`)
        .then((response) => {
            const fileInfos = response.data; 
            const thumbnailList = fileInfos.map((fileInfo) => (<Thumbnail dirPath = {dirStore} fileInfo = {fileInfo}/>));
            setThumbnails(thumbnailList);
        }).catch((error) => {
            console.log(error);
        });
    },[dirStore]);

    return(
        <Wrapper>
            <Table>
                {thumbnails}
            </Table>
        </Wrapper>
    );
}

export default View;