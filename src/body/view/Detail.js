import axios from 'axios';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import DownloadPng from "../../images/download.png";

const Detail = (props) => {
    const [backgroundColor , setBackgroundColor] = useState("grey");
    const zoomArray = [0.1, 0.5, 0.8, 1, 1.2, 1.5, 2, 3, 5, 10, 20, 50, 100]
    const [zoomLevel, setZoomLevel] = useState(3);
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [url, setUrl] = useState();

    useEffect(()=> {
        if(props.fileInfo[1].startsWith('image')){
            const img = new Image;
            img.src = props.image;

            let width = img.width;
            let height = img.height;

            if(width > 1150 || height > 650){
                if(width/1150 > height/650){
                    height *= (1150/width);
                    width = 1150; 
                }
                else{
                    width *= (650/height);
                    height = 650;
                }
            }

            setWidth(width);
            setHeight(height);
        }else{
            axios.get(`/api/getsource?message=${props.dirPath}/${props.fileInfo[0]}`, {responseType: 'arraybuffer'})
            .then((response) => {
                const blob = new Blob(
                    [response.data],
                    {type: response.headers['content-type']}
                );
                setUrl(URL.createObjectURL(blob));

            }).catch((error) => {
                console.log(error);
            });

        }

        return () => {
            if(!props.fileInfo[1].startsWith('image')){
                URL.revokeObjectURL(url);
            }
        };
    },[]);

    // zoom
    const zoomControl = (name) => {
        let fixedZoomLevel = name === "1" ? 3 : name === "+" ? zoomLevel + 1 : zoomLevel - 1;
        if(zoomLevel >= 0 && zoomLevel <= 13){
            if(width * zoomArray[fixedZoomLevel] <= 1150 && height * zoomArray[fixedZoomLevel] <= 650){
                setZoomLevel(fixedZoomLevel);
            }
        }
    }

    // download
    const download = () =>{
        // 받아온 blob url, 파일 이름으로 다운로드 구현
        const name = props.fileInfo[0];
        let downloadUrl;

        if(props.fileInfo[1].startsWith('image')){
            downloadUrl = props.image;
        }else{
            downloadUrl = url;
        }
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
    }

    // delete
    const deleteFile = () =>{
        if(window.confirm("정말 삭제하시겠습니까?") === true){
            axios.get(`/api/deleteFile?message=${props.dirPath}/${props.fileInfo[0]}`)
            .then((response) => {
                if(response.data === "success"){
                    alert("삭제 완료!");
                    props.setDisplay("none");
                    props.setDetail(false);
                    props.image ? URL.revokeObjectURL(props.image) : URL.revokeObjectURL(url); // blob url 반환
                }else{
                    alert("오류가 발생하였습니다.");
                }
            }).catch((error) => {
                alert("오류가 발생하였습니다.");
            });
        }
    }

    // close
    const close = () => {
        props.setDetail(false);
    }

    return(
        <Wrapper bgColor = {backgroundColor}>
            <Top>
                {props.fileInfo[1].startsWith('audio') ?
                <Text> 🔊{props.fileInfo[0]} </Text> : null}
                {props.fileInfo[1].startsWith('image') ? <Left>
                <ZoomButton style = {{fontSize: "30px"}} onClick = {() => zoomControl("-")}>-</ZoomButton>
                <ZoomButton style = {{fontSize: "25px"}} onClick = {() => zoomControl("1")}>x{zoomArray[zoomLevel]}</ZoomButton>
                <ZoomButton style = {{fontSize: "30px"}} onClick = {() => zoomControl("+")}>+</ZoomButton> </Left> : null}

                {props.fileInfo[1].startsWith('image') ? <Mid>
                <ColorButton style = {{backgroundColor: "grey"}} onClick = {() => setBackgroundColor("grey")}></ColorButton>
                <ColorButton style = {{backgroundColor: "white"}} onClick = {() => setBackgroundColor("white")}></ColorButton>
                <ColorButton style = {{backgroundColor: "black"}} onClick = {() => setBackgroundColor("black")}></ColorButton> </Mid> : null}

                <Right>
                <DeleteButton onClick = {deleteFile}>🗑</DeleteButton>
                <DownloadButton style = {{backgroundImage: `url(${DownloadPng})`}} onClick = {download}></DownloadButton>
                <CloseButton onClick = {close}>X</CloseButton>
                </Right>
            </Top>
            <Context>
                <Inner>
                    {props.fileInfo[1].startsWith('image') ?
                    <Img src = {props.image} width = {width * zoomArray[zoomLevel]} height = {height * zoomArray[zoomLevel]}/> :
                    props.fileInfo[1].startsWith('video') ?
                    <Video src = {url} controls/> :
                    props.fileInfo[1].startsWith('audio') ?
                    <Audio controls src = {url}/> :
                    <FileName>📄{props.fileInfo[0]}</FileName>}
                    {/* <Video src = {props.fileInfo[0]} controls/> */}
                </Inner>
            </Context>
        </Wrapper>
    );
}

export default Detail;

const Wrapper = styled.div`
        cursor: default;
        z-index: 99;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: ${props => props.bgColor === "grey" ? "rgba(0,0,0,0.5)" : props.bgColor === "white" ? "#FFF" : "#000"};
    `

    const Top = styled.div`
        height: 50px;
        text-align: center;
    `

    const Left = styled.div`
        display: flex;
        float: left;
        height: 50px;
        width: 240px;
    `

    const Mid = styled.div`
        display: inline-block;
        height: 50px;
        width: 240px;
    `

    const Right = styled.div`
        display: flex;
        float: right;
        height: 50px;
        width: 240px;
    `

    const ZoomButton = styled.button`
        width: 80px;
        height: 50px;
        cursor: pointer;
        border-style: outset;

        &:hover{
            background-color: #E0E0E0;
        }
    `

    const ColorButton = styled.button`
        width: 80px;
        height: 50px;
        font-size: 30px;
        cursor: pointer;
        border-style: outset;
    `

    const DownloadButton = styled.button`
        width: 80px;
        height: 50px;
        font-size: 30px;
        cursor: pointer;
        border-style: outset;

        &:hover{
            background-color: #E0E0E0;
        }
    `

    const CloseButton = styled.button`
        width: 80px;
        height: 50px;
        font-size: 30px;
        font-weight: 600;
        cursor: pointer;
        border-style: outset;

        &:hover{
            background-color: #E0E0E0;
        }
    `

    const DeleteButton = styled.button`
        width: 80px;
        height: 50px;
        font-size: 30px;
        font-weight: 600;
        cursor: pointer;
        border-style: outset;

        &:hover{
            background-color: #E0E0E0;
        }
    `

    const Context = styled.div`
        height: 94%;
        width: 100%;
        display: table;
    `

    const Inner = styled.div`
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    `
    const Img = styled.img`
        max-width: 1150px;
        max-height: 650px;
    `

    const Video = styled.video`
        max-width: 1150px;
        max-height: 650px;
    `

    const Audio = styled.audio`
        width: 600px;
    `

    const Text = styled.div`
        font-size : 18px;
        height: 50px;
        line-height: 50px;
        margin-left: 240px;
        display: inline-block;
        background-color: #3EF8FF;
    `

    const FileName = styled.div`
        font-size : 30px;
        display: inline-block;
        background-color: #3EF8FF;
    `